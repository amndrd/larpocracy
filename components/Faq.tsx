import { IconChevron } from './icons';

/**
 * Repliage natif : `<details>` fait le travail sans une ligne de JavaScript,
 * reste accessible au clavier, et fonctionne avant l'hydratation.
 */
export default function Faq({ items }: { items: { q: string; r: string }[] }) {
  return (
    <div className="divide-y divide-line-soft overflow-hidden rounded-md bg-white/[0.03] ring-1 ring-white/[0.06] ring-inset">
      {items.map((it) => (
        <details key={it.q} className="group px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[0.9375rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
            {it.q}
            <IconChevron className="size-4 shrink-0 rotate-90 text-ink-3 transition-transform duration-[400ms] ease-[var(--ease-fora)] group-open:-rotate-90" />
          </summary>
          <p className="pb-5 pr-8 text-[0.9375rem] leading-relaxed text-ink-3">{it.r}</p>
        </details>
      ))}
    </div>
  );
}
