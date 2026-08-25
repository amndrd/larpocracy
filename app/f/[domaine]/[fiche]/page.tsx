import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Panel from '@/components/Panel';
import Quiz from '@/components/Quiz';
import { LEVELS, allCards, getCard, getDomain, getNeighbours } from '@/lib/content';
import { Paragraphs, rich } from '@/lib/mdlite';

type Props = { params: Promise<{ domaine: string; fiche: string }> };

export function generateStaticParams() {
  return allCards().map(({ domain, card }) => ({ domaine: domain.id, fiche: card.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domaine, fiche } = await params;
  const c = getCard(domaine, fiche);
  if (!c) return {};
  return { title: c.title, description: c.summary };
}

export default async function FichePage({ params }: Props) {
  const { domaine, fiche } = await params;
  const d = getDomain(domaine);
  const c = getCard(domaine, fiche);
  if (!d || !c) notFound();

  const { prev, next } = getNeighbours(domaine, fiche);

  return (
    <Container narrow className="py-16">
      <nav className="eyebrow">
        <Link href="/domaines" className="transition-colors hover:text-accent">
          Domaines
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/d/${d.id}`} className="transition-colors hover:text-accent">
          {d.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{LEVELS[c.level]}</span>
      </nav>

      <header className="mt-8">
        <h1 className="display text-[clamp(2rem,4.5vw,3.25rem)]">{c.title}</h1>
        <p className="mt-6 border-l-2 border-accent pl-5 text-[1.125rem] italic leading-relaxed text-ink-2">
          {rich(c.summary)}
        </p>
        <p className="eyebrow mt-6">
          {LEVELS[c.level]} · {c.minutes ?? 5} minutes de lecture
        </p>
      </header>

      <article className="prose-larp mt-4">
        {c.sections.map((s, i) => (
          <section key={i} className="mt-12 border-t border-rule pt-8">
            <h2 className="display mb-4 text-[1.625rem] text-ink">{s.h}</h2>
            <Paragraphs body={s.body} />
          </section>
        ))}
      </article>

      {c.terms && c.terms.length > 0 && (
        <Panel label="Lexique">
          <dl className="space-y-5">
            {c.terms.map((t) => (
              <div key={t.t} className="grid gap-1 sm:grid-cols-[minmax(9rem,1fr)_2.4fr] sm:gap-6">
                <dt className="text-[0.9375rem] font-semibold text-ink">
                  {t.t}
                  {t.en && (
                    <span className="block text-[0.75rem] font-normal italic text-ink-3">
                      {t.en}
                    </span>
                  )}
                </dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink-2">{rich(t.d)}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      )}

      {c.names && c.names.length > 0 && (
        <Panel label="Noms & prononciation">
          <ul className="space-y-5">
            {c.names.map((n) => (
              <li key={n.n} className="grid gap-1 sm:grid-cols-[minmax(9rem,1fr)_2.4fr] sm:gap-6">
                <span>
                  <span className="text-[0.9375rem] font-semibold text-ink">{n.n}</span>
                  <span className="mt-0.5 block font-mono text-[0.75rem] text-accent">
                    « {n.say} »
                  </span>
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-ink-2">{rich(n.d)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {(c.sayThis?.length || c.notThis?.length) && (
        <Panel label="Dis ça · Pas ça" className="!p-0">
          <div className="grid gap-px bg-rule sm:grid-cols-2">
            <div className="bg-paper p-6">
              <h3 className="eyebrow text-yes">Dis ça</h3>
              <ul className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
                {(c.sayThis ?? []).map((s, i) => (
                  <li key={i}>{rich(s)}</li>
                ))}
              </ul>
            </div>
            <div className="bg-paper p-6">
              <h3 className="eyebrow text-no">Pas ça</h3>
              <ul className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
                {(c.notThis ?? []).map((s, i) => (
                  <li key={i}>{rich(s)}</li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
      )}

      {c.quiz && c.quiz.length > 0 && (
        <Panel label="Vérification">
          <Quiz items={c.quiz} />
        </Panel>
      )}

      <nav className="mt-16 flex flex-wrap justify-between gap-4 border-t border-rule pt-8">
        {prev ? (
          <Link href={`/f/${d.id}/${prev.id}`} className="group max-w-[20rem]">
            <span className="eyebrow">Précédent</span>
            <span className="display mt-1 block text-[1.125rem] transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/f/${d.id}/${next.id}`} className="group max-w-[20rem] sm:text-right">
            <span className="eyebrow">Suivant</span>
            <span className="display mt-1 block text-[1.125rem] transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link href={`/d/${d.id}`} className="group max-w-[20rem] sm:text-right">
            <span className="eyebrow">Retour</span>
            <span className="display mt-1 block text-[1.125rem] transition-colors group-hover:text-accent">
              {d.title}
            </span>
          </Link>
        )}
      </nav>
    </Container>
  );
}
