import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Badge from '@/components/Badge';
import Container from '@/components/Container';
import { Button } from '@/components/Button';
import { Distinctions, RankCard } from '@/components/GameStats';
import { ProgressBar } from '@/components/Progress';
import { IconCartes, IconFlamme, IconFleche, IconLire, IconTest } from '@/components/icons';
import { signOut } from '@/app/auth/actions';
import { domains, getCards } from '@/lib/content';
import { getActivityDays, getProgress } from '@/lib/progress';
import { bilan } from '@/lib/stats';
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

  const [{ data: profile }, progress, jours] = await Promise.all([
    supabase.from('profiles').select('display_name, plan').eq('id', user.id).maybeSingle(),
    getProgress(),
    getActivityDays(),
  ]);

  const b = bilan(progress, jours);
  const name = profile?.display_name || user.email?.split('@')[0] || 'vous';
  const plan = profile?.plan ?? 'free';

  const compteurs = [
    {
      icon: <IconLire className="size-4" />,
      valeur: `${b.fiches}`,
      sur: `/ ${b.fichesTotal}`,
      label: 'fiches lues',
    },
    {
      icon: <IconCartes className="size-4" />,
      valeur: `${b.cartes}`,
      sur: b.cartesTotal ? `/ ${b.cartesTotal}` : '',
      label: 'cartes acquises',
    },
    {
      icon: <IconTest className="size-4" />,
      valeur: `${b.reponses}`,
      sur: b.reponsesTotal ? `/ ${b.reponsesTotal}` : '',
      label: 'réponses justes',
    },
    {
      icon: <IconFlamme className="size-4" />,
      valeur: `${b.serie}`,
      sur: '',
      label: b.serie > 1 ? 'jours d’affilée' : 'jour d’affilée',
    },
  ];

  return (
    <Container className="py-10 sm:py-14">
      {/* En-tête de compte */}
      <header className="card animate-fade-up flex flex-wrap items-center gap-5 p-6 sm:p-8">
        <span
          aria-hidden
          className="display grid size-16 shrink-0 place-items-center rounded-full bg-accent text-[1.75rem] text-white"
        >
          {name[0]?.toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="headline text-[clamp(1.75rem,4vw,2.5rem)]">{name}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.875rem] text-ink-3">
            <span className="truncate">{user.email}</span>
            <Badge ton={plan === 'pro' ? 'or' : 'neutre'}>{plan === 'pro' ? 'Pro' : 'Libre'}</Badge>
          </p>
        </div>
        <form action={signOut}>
          <Button type="submit" variante="secondaire" taille="sm">
            Se déconnecter
          </Button>
        </form>
      </header>

      {/* Rang et compteurs */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <RankCard b={b} />
        <div className="grid grid-cols-2 gap-4">
          {compteurs.map((c, i) => (
            <div
              key={c.label}
              style={{ animationDelay: `${i * 55}ms` }}
              className="card animate-fade-up flex flex-col justify-between p-5"
            >
              <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-ink-2">
                {c.icon}
              </span>
              <p className="mt-5">
                <span className="display animate-count text-[2rem] leading-none tabular-nums">
                  {c.valeur}
                </span>
                {c.sur && (
                  <span className="ml-1.5 text-[0.875rem] tabular-nums text-ink-3">{c.sur}</span>
                )}
              </p>
              <p className="eyebrow mt-1.5">{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Distinctions */}
      <h2 className="headline mt-12 text-[1.75rem]">Distinctions</h2>
      <p className="mt-2 text-[0.9375rem] text-ink-2">
        {b.distinctions.filter((d) => d.obtenue).length} sur {b.distinctions.length} obtenues.
      </p>
      <div className="mt-5">
        <Distinctions b={b} />
      </div>

      {/* Détail par domaine */}
      <h2 className="headline mt-12 text-[1.75rem]">Par domaine</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {domains.map((d, i) => {
          const cards = getCards(d.id);
          const read = cards.filter((c) => b.lues.has(c.id)).length;
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
                {cards.length
                  ? `${read} / ${cards.length} fiches lues`
                  : `${d.topics} sujets à venir`}
                {tot > 0 && ` · ${ok} / ${tot} au test`}
              </p>

              <ProgressBar value={read} total={cards.length} className="mt-4" />
            </Link>
          );
        })}
      </div>

      <p className="mt-10 text-[0.875rem] text-ink-3">
        Votre progression est enregistrée sur votre compte, et n&apos;est visible que par vous.
        Les points ne s&apos;achètent pas et ne se donnent pas : ils ne viennent que de fiches
        lues, de cartes sues et de réponses justes.
      </p>
    </Container>
  );
}
