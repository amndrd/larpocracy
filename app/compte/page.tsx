import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Container from '@/components/Container';
import { signOut } from '@/app/auth/actions';
import { domains, getCards, stats } from '@/lib/content';
import { getProgress } from '@/lib/progress';
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

  const name = profile?.display_name || user.email?.split('@')[0] || 'vous';
  const plan = profile?.plan ?? 'free';

  return (
    <Container className="py-16">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-10">
        <div>
          <p className="eyebrow">Mon compte</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.5vw,3rem)]">{name}</h1>
          <p className="mt-2 text-[0.875rem] text-ink-3">
            {user.email} · formule{' '}
            <span className="text-ink">{plan === 'pro' ? 'Pro' : 'Libre'}</span>
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="border border-rule px-4 py-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
          >
            Se déconnecter
          </button>
        </form>
      </header>

      <div className="mt-10 flex flex-wrap gap-12">
        <Stat n={`${readIds.size} / ${stats.cards}`} l="Fiches lues" />
        <Stat n={quizTotal ? `${quizCorrect} / ${quizTotal}` : '—'} l="Réponses justes" />
        <Stat
          n={`${domains.filter((d) => getCards(d.id).some((c) => readIds.has(c.id))).length} / ${stats.openDomains}`}
          l="Domaines entamés"
        />
      </div>

      <h2 className="display mt-16 text-[1.75rem]">Par domaine</h2>
      <table className="mt-6 w-full border-collapse text-[0.875rem]">
        <thead>
          <tr className="border-b border-rule">
            <th className="eyebrow py-3 text-left font-normal">Domaine</th>
            <th className="eyebrow py-3 text-right font-normal">Lues</th>
            <th className="eyebrow py-3 text-right font-normal">Quiz</th>
            <th className="eyebrow py-3 text-right font-normal">Sujets</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((d) => {
            const cards = getCards(d.id);
            const read = cards.filter((c) => readIds.has(c.id)).length;
            const rows = progress.filter(
              (p) => p.domain_id === d.id && p.quiz_total != null,
            );
            const ok = rows.reduce((a, p) => a + (p.quiz_correct ?? 0), 0);
            const tot = rows.reduce((a, p) => a + (p.quiz_total ?? 0), 0);
            return (
              <tr key={d.id} className="border-b border-rule-soft">
                <td className="py-3">
                  <Link href={`/d/${d.id}`} className="transition-colors hover:text-accent">
                    {d.title}
                  </Link>
                </td>
                <td className="py-3 text-right font-mono text-[0.8125rem] text-ink-2">
                  {cards.length ? `${read} / ${cards.length}` : '—'}
                </td>
                <td className="py-3 text-right font-mono text-[0.8125rem] text-ink-2">
                  {tot ? `${ok} / ${tot}` : '—'}
                </td>
                <td className="py-3 text-right font-mono text-[0.8125rem] text-ink-3">
                  {d.topics}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-10 text-[0.875rem] text-ink-3">
        Votre progression est enregistrée sur votre compte, et n&apos;est visible que par
        vous.
      </p>
    </Container>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="display text-[2.25rem] leading-none">{n}</div>
      <div className="eyebrow mt-2">{l}</div>
    </div>
  );
}
