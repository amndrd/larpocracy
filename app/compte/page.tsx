import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Badge from '@/components/Badge';
import Container from '@/components/Container';
import { Button } from '@/components/Button';
import { ProgressBar, ProgressRing } from '@/components/Progress';
import { IconFleche } from '@/components/icons';
import { signOut } from '@/app/auth/actions';
import { domains, getCards, stats } from '@/lib/content';
import { getProgress } from '@/lib/progress';
import { domainVars } from '@/lib/theme';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export const metadata: Metadata = { title: 'Mon compte' };

export default async function ComptePage() {
  if (!isSupabaseConfigured) redirect('/connexion');

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/connexion?suite=/compte');

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, plan')
    .eq('id', user.id)
    .maybeSingle();

  const progress = await getProgress();
  const readIds = new Set(progress.map((p) => p.card_id));
  const quizzed = progress.filter((p) => p.quiz_total != null);
  const quizCorrect = quizzed.reduce((a, p) => a + (p.quiz_correct ?? 0), 0);
  const quizTotal = quizzed.reduce((a, p) => a + (p.quiz_total ?? 0), 0);
  const entames = domains.filter((d) => getCards(d.id).some((c) => readIds.has(c.id))).length;

  const name = profile?.display_name || user.email?.split('@')[0] || 'vous';
  const plan = profile?.plan ?? 'free';

  return (
    <Container className="py-12 sm:py-16">
      {/* En-tête de compte */}
      <header className="card animate-fade-up flex flex-wrap items-center gap-5 p-6 sm:p-8">
        <span
          aria-hidden
          className="display grid size-16 shrink-0 place-items-center rounded-full bg-accent text-[1.75rem] text-white"
        >
          {name[0]?.toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="display text-[clamp(1.75rem,4vw,2.5rem)]">{name}</h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.875rem] text-ink-3">
            <span className="truncate">{user.email}</span>
            <Badge ton={plan === 'pro' ? 'or' : 'neutre'}>
              {plan === 'pro' ? 'Pro' : 'Libre'}
            </Badge>
          </p>
        </div>
        <form action={signOut}>
          <Button type="submit" variante="secondaire" taille="sm">
            Se déconnecter
          </Button>
        </form>
      </header>

      {/* Les trois compteurs */}
      <div className="card mt-4 grid gap-8 p-8 sm:grid-cols-3">
        <ProgressRing value={readIds.size} total={stats.cards} label={`${readIds.size} / ${stats.cards} fiches lues`} />
        <ProgressRing
          value={quizCorrect}
          total={quizTotal}
          label={quizTotal ? `${quizCorrect} / ${quizTotal} réponses justes` : 'Aucun test passé'}
        />
        <ProgressRing
          value={entames}
          total={stats.openDomains}
          label={`${entames} / ${stats.openDomains} domaines entamés`}
        />
      </div>

      {/* Détail par domaine */}
      <h2 className="display mt-12 text-[1.625rem]">Par domaine</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {domains.map((d, i) => {
          const cards = getCards(d.id);
          const read = cards.filter((c) => readIds.has(c.id)).length;
          const rows = progress.filter((p) => p.domain_id === d.id && p.quiz_total != null);
          const ok = rows.reduce((a, p) => a + (p.quiz_correct ?? 0), 0);
          const tot = rows.reduce((a, p) => a + (p.quiz_total ?? 0), 0);

          return (
            <Link
              key={d.id}
              href={`/d/${d.id}`}
              style={{ ...domainVars(d.id), animationDelay: `${Math.min(i, 9) * 40}ms` }}
              className="card card-lift group animate-fade-up p-5 hover:card-lift-on"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[0.9375rem] font-semibold text-ink transition-colors group-hover:text-[var(--dom)]">
                  {d.title}
                </h3>
                <IconFleche className="mt-0.5 size-4 shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              <p className="mt-1 text-[0.75rem] text-ink-3">
                {cards.length ? `${read} / ${cards.length} fiches lues` : `${d.topics} sujets à venir`}
                {tot > 0 && ` · ${ok} / ${tot} au test`}
              </p>

              <ProgressBar value={read} total={cards.length} className="mt-4" />
            </Link>
          );
        })}
      </div>

      <p className="mt-10 text-[0.875rem] text-ink-3">
        Votre progression est enregistrée sur votre compte, et n&apos;est visible que par vous.
      </p>
    </Container>
  );
}
