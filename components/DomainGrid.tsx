import Link from 'next/link';
import { getCards } from '@/lib/content';
import type { Domain } from '@/lib/types';

export default function DomainGrid({ list }: { list: Domain[] }) {
  return (
    <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {list.map((d) => {
        const count = getCards(d.id).length;
        return (
          <Link
            key={d.id}
            href={`/d/${d.id}`}
            className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-2"
          >
            <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-3">
              {String(d.n).padStart(2, '0')}
            </span>
            <h3 className="display mt-3 text-[1.5rem] transition-colors group-hover:text-accent">
              {d.title}
            </h3>
            <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-2">
              {d.blurb}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-rule-soft pt-3 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-3">
              <span>{d.topics} sujets</span>
              <span className={count ? 'text-accent' : ''}>
                {count ? `${count} fiche${count > 1 ? 's' : ''}` : 'à venir'}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
