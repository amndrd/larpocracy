import { IconChevron } from './icons';

/**
 * Repliage natif : `<details>` fait le travail sans une ligne de JavaScript,
 * reste accessible au clavier, et fonctionne avant l'hydratation.
 */
export default function Faq({ items }: { items: { q: string; r: string }[] }) {
  return (
    <div className="divide-y divide-line-soft border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-[1.0625rem] font-medium tracking-[-0.02em] text-ink [&::-webkit-details-marker]:hidden">
            {it.q}
            <IconChevron className="size-4 shrink-0 rotate-90 text-ink-3 transition-transform duration-[400ms] ease-[var(--ease-fora)] group-open:-rotate-90" />
          </summary>
          <p className="max-w-[62ch] pr-8 pb-6 text-[0.9375rem] leading-relaxed text-ink-3">{it.r}</p>
        </details>
      ))}
    </div>
  );
}
