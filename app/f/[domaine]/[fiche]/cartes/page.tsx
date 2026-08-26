import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Flashcards from '@/components/Flashcards';
import StudyModes from '@/components/StudyModes';
import { IconChevron } from '@/components/icons';
import { allCards, deckOf, getCard, getDomain } from '@/lib/content';
import { saveCardsScore } from '@/lib/progress';
import { domainVars } from '@/lib/theme';

type Props = { params: Promise<{ domaine: string; fiche: string }> };

/** Seules les fiches qui ont un lexique ou des noms propres ont un paquet. */
export function generateStaticParams() {
  return allCards()
    .filter(({ card }) => deckOf(card).length > 0)
    .map(({ domain, card }) => ({ domaine: domain.id, fiche: card.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domaine, fiche } = await params;
  const c = getCard(domaine, fiche);
  if (!c) return {};
  return { title: `Cartes · ${c.title}`, description: `Réviser le vocabulaire de « ${c.title} ».` };
}

export default async function CartesPage({ params }: Props) {
  const { domaine, fiche } = await params;
  const d = getDomain(domaine);
  const c = getCard(domaine, fiche);
  if (!d || !c) notFound();

  const deck = deckOf(c);
  if (deck.length === 0) notFound();

  return (
    <div style={domainVars(d.id)}>
      <Container narrow className="py-8 sm:py-10">
        <nav className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-ink-3">
          <Link href={`/d/${d.id}`} className="transition-colors hover:text-accent">
            {d.title}
          </Link>
          <IconChevron className="size-3.5" />
          <Link href={`/f/${d.id}/${c.id}`} className="transition-colors hover:text-accent">
            {c.title}
          </Link>
        </nav>

        <header className="mt-4">
          <p className="eyebrow">Mode cartes</p>
          <h1 className="headline mt-2 text-[clamp(1.875rem,4vw,2.75rem)]">{c.title}</h1>
        </header>

        <div className="mt-5">
          <StudyModes
            domainId={d.id}
            cardId={c.id}
            sections={c.sections.length}
            cartes={deck.length}
            questions={c.quiz?.length ?? 0}
            actif="cartes"
          />
        </div>

        <div className="mt-8">
          <Flashcards
            deck={deck}
            retour={`/f/${d.id}/${c.id}`}
            domainId={d.id}
            cardId={c.id}
            onFinish={saveCardsScore}
          />
        </div>
      </Container>
    </div>
  );
}
