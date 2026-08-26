import { clsx } from '@/lib/clsx';

/** Le monogramme : trois barres qui montent — le niveau qu'on gagne. */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx('flex shrink-0 items-center gap-2.5', className)}>
      <span className="grid size-7 place-items-center rounded-lg bg-ink">
        <svg viewBox="0 0 24 24" aria-hidden className="size-4 text-canvas">
          <rect x="3.5" y="14" width="4.5" height="6.5" rx="1.4" fill="currentColor" />
          <rect x="9.75" y="9.5" width="4.5" height="11" rx="1.4" fill="currentColor" opacity="0.72" />
          <rect x="16" y="4" width="4.5" height="16.5" rx="1.4" fill="currentColor" opacity="0.45" />
        </svg>
      </span>
      <span className="display text-[1.25rem] leading-none tracking-tight text-ink">LarpLvl</span>
    </span>
  );
}
