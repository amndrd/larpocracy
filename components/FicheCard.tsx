import Link from 'next/link';
import Badge from './Badge';
import { IconCartes, IconFleche, IconLire, IconTest } from './icons';
import { LEVELS, cardStats, deckOf } from '@/lib/content';
import type { Card } from '@/lib/types';

/**
 * Vignette de fiche. Elle annonce ce qu'il y a à faire dedans — lire,
 * réviser, se tester — plutôt que de se contenter d'un titre.
 */
export default function FicheCard({
  card,
  domainId,
  index = 0,
}: {
  card: Card;
  domainId: string;
  index?: number;
}) {
  const s = cardStats(card);
  const cartes = deckOf(card).length;

  return (
    <Link
      href={`/f/${domainId}/${card.id}`}
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
      className="card card-lift group animate-fade-up relative flex flex-col overflow-hidden p-5 hover:card-lift-on sm:p-6"
    >
      {/* Filet vertical à la teinte du domaine : le repère de famille. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-[var(--dom)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-center gap-2">
        <Badge ton="domaine">{LEVELS[card.level]}</Badge>
        <span className="text-[0.75rem] text-ink-3">{card.minutes ?? 5} min</span>
      </div>

      <h3 className="display mt-3 text-[1.375rem] transition-colors duration-300 group-hover:text-[var(--dom)]">
        {card.title}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-[0.875rem] leading-relaxed text-ink-2">
        {card.summary}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-line-soft pt-4">
        <div className="flex items-center gap-4 text-[0.75rem] text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <IconLire className="size-4" />
            {card.sections.length}
          </span>
          {cartes > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <IconCartes className="size-4" />
              {cartes}
            </span>
          )}
          {s.quiz > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <IconTest className="size-4" />
              {s.quiz}
            </span>
          )}
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-canvas-2 text-ink-3 transition-all duration-300 group-hover:bg-[var(--dom)] group-hover:text-white">
          <IconFleche className="size-4" />
        </span>
      </div>
    </Link>
  );
}
