import { clsx } from '@/lib/clsx';

/** Barre de progression fine, teintée par le domaine courant. */
export function ProgressBar({
  value,
  total,
  className,
}: {
  value: number;
  total: number;
  className?: string;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div
      className={clsx('h-1.5 w-full overflow-hidden rounded-full bg-canvas-2', className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-[var(--dom,var(--color-accent))] transition-[width] duration-700 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Anneau de progression pour les compteurs du compte. */
export function ProgressRing({
  value,
  total,
  size = 108,
  label,
}: {
  value: number;
  total: number;
  size?: number;
  label: string;
}) {
  const pct = total > 0 ? Math.min(1, value / total) : 0;
  const r = size / 2 - 7;
  const circ = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth="7"
            className="stroke-canvas-2"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            className="stroke-accent transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="display text-[1.5rem] leading-none">{Math.round(pct * 100)}%</span>
        </div>
      </div>
      <span className="eyebrow text-center">{label}</span>
    </div>
  );
}
