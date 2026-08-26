import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Badge from '@/components/Badge';
import Container from '@/components/Container';
import Panel from '@/components/Panel';
import Quiz from '@/components/Quiz';
import StudyModes from '@/components/StudyModes';
import TrackRead from '@/components/TrackRead';
import { IconChevron, IconNon, IconOui } from '@/components/icons';
import { markRead, saveQuizScore } from '@/lib/progress';
import {
  LEVELS,
  allCards,
  deckOf,
  getCard,
  getDomain,
  getNeighbours,
} from '@/lib/content';
import { Paragraphs, rich } from '@/lib/mdlite';
import { domainVars } from '@/lib/theme';

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
  const deck = deckOf(c);

  return (
    <div style={domainVars(d.id)}>
      <Container narrow className="py-8 sm:py-10">
        <TrackRead domainId={d.id} cardId={c.id} onRead={markRead} />

        <nav className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-ink-3">
          <Link href="/domaines" className="transition-colors hover:text-accent">
            Domaines
          </Link>
          <IconChevron className="size-3.5" />
          <Link href={`/d/${d.id}`} className="transition-colors hover:text-accent">
            {d.title}
          </Link>
        </nav>

        <header className="card animate-fade-up mt-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge ton="domaine">{LEVELS[c.level]}</Badge>
            <Badge ton="neutre">{c.minutes ?? 5} min</Badge>
          </div>
          <h1 className="headline mt-4 text-[clamp(2rem,4.5vw,3rem)]">{c.title}</h1>
          <p className="mt-5 border-l-[3px] border-[var(--dom)] pl-5 text-[1.0625rem] italic leading-relaxed text-ink-2">
            {rich(c.summary)}
          </p>
        </header>

        <div className="mt-4">
          <StudyModes
            domainId={d.id}
            cardId={c.id}
            sections={c.sections.length}
            cartes={deck.length}
            questions={c.quiz?.length ?? 0}
          />
        </div>

        <article id="lecture" className="prose-larp mt-10 scroll-mt-24">
          {c.sections.map((s, i) => (
            <section key={i} className="card mt-4 p-6 sm:p-8">
              <h2 className="display mb-4 text-[1.5rem] text-ink">{s.h}</h2>
              <Paragraphs body={s.body} />
            </section>
          ))}
        </article>

        {c.terms && c.terms.length > 0 && (
          <Panel label="Lexique">
            <dl className="divide-y divide-line-soft">
              {c.terms.map((t) => (
                <div
                  key={t.t}
                  className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[minmax(9rem,1fr)_2.4fr] sm:gap-6"
                >
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
            <ul className="divide-y divide-line-soft">
              {c.names.map((n) => (
                <li
                  key={n.n}
                  className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[minmax(9rem,1fr)_2.4fr] sm:gap-6"
                >
                  <span>
                    <span className="text-[0.9375rem] font-semibold text-ink">{n.n}</span>
                    <span className="mt-1 block w-fit rounded-full bg-accent-3 px-2.5 py-0.5 font-mono text-[0.75rem] text-accent-ink">
                      {n.say}
                    </span>
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink-2">{rich(n.d)}</span>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {(c.sayThis?.length || c.notThis?.length) && (
          <Panel label="Dis ça · Pas ça" bodyClassName="!p-0">
            <div className="grid sm:grid-cols-2">
              <div className="border-b border-line-soft sm:border-b-0 sm:border-r">
                <h3 className="flex items-center gap-2 bg-yes-2 px-5 py-2.5 text-[0.8125rem] font-semibold text-yes">
                  <IconOui className="size-4" />
                  Dis ça
                </h3>
                <ul className="space-y-4 p-5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {(c.sayThis ?? []).map((s, i) => (
                    <li key={i}>{rich(s)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 bg-no-2 px-5 py-2.5 text-[0.8125rem] font-semibold text-no">
                  <IconNon className="size-4" />
                  Pas ça
                </h3>
                <ul className="space-y-4 p-5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {(c.notThis ?? []).map((s, i) => (
                    <li key={i}>{rich(s)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        )}

        {c.quiz && c.quiz.length > 0 && (
          <Panel id="test" label="Test" bodyClassName="!p-0 sm:!p-0">
            <div className="p-5 sm:p-6">
              <Quiz items={c.quiz} domainId={d.id} cardId={c.id} onComplete={saveQuizScore} />
            </div>
          </Panel>
        )}

        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`/f/${d.id}/${prev.id}`} className="card card-lift group p-5 hover:card-lift-on">
              <span className="eyebrow">Précédent</span>
              <span className="display mt-1.5 block text-[1.125rem] transition-colors group-hover:text-[var(--dom)]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/f/${d.id}/${next.id}`}
              className="card card-lift group p-5 hover:card-lift-on sm:text-right"
            >
              <span className="eyebrow">Suivant</span>
              <span className="display mt-1.5 block text-[1.125rem] transition-colors group-hover:text-[var(--dom)]">
                {next.title}
              </span>
            </Link>
          ) : (
            <Link
              href={`/d/${d.id}`}
              className="card card-lift group p-5 hover:card-lift-on sm:text-right"
            >
              <span className="eyebrow">Retour</span>
              <span className="display mt-1.5 block text-[1.125rem] transition-colors group-hover:text-[var(--dom)]">
                {d.title}
              </span>
            </Link>
          )}
        </nav>
      </Container>
    </div>
  );
}
