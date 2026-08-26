import { clsx } from '@/lib/clsx';

type Ton = 'neutre' | 'domaine' | 'or' | 'oui' | 'non';

const TONS: Record<Ton, string> = {
  neutre: 'bg-canvas-2 text-ink-2',
  domaine: 'bg-[var(--dom-tint)] text-[var(--dom)]',
  or: 'bg-gold-2 text-gold',
  oui: 'bg-yes-2 text-yes',
  non: 'bg-no-2 text-no',
};

/** Pastille de métadonnée : niveau, durée, nombre de cartes. */
export default function Badge({
  ton = 'neutre',
  className,
  children,
}: {
  ton?: Ton;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold',
        TONS[ton],
        className,
      )}
    >
      {children}
    </span>
  );
}
