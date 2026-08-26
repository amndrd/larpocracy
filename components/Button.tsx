import Link from 'next/link';
import { clsx } from '@/lib/clsx';

type Variante = 'primaire' | 'secondaire' | 'fantome' | 'clair';
type Taille = 'sm' | 'md' | 'lg';

const BASE =
  'pressable inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold ' +
  'disabled:pointer-events-none disabled:opacity-45';

/* L'arête basse pleine se comprime au clic : le bouton a une épaisseur. */
const VARIANTES: Record<Variante, string> = {
  primaire:
    'bg-accent text-white shadow-[0_3px_0_var(--color-accent-2)] hover:bg-[#cf4257] ' +
    'active:translate-y-[3px] active:shadow-none',
  secondaire:
    'bg-surface-2 text-ink border border-line shadow-[0_3px_0_var(--color-canvas-2)] ' +
    'hover:border-ink/25 hover:bg-surface-3 active:translate-y-[3px] active:shadow-none',
  clair:
    'bg-ink text-canvas shadow-[0_3px_0_#8f8880] hover:bg-white ' +
    'active:translate-y-[3px] active:shadow-none',
  fantome: 'text-ink-2 hover:bg-surface-2 hover:text-ink',
};

const TAILLES: Record<Taille, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-[0.875rem]',
  lg: 'h-13 px-7 text-[0.9375rem]',
};

export function buttonClasses(variante: Variante = 'primaire', taille: Taille = 'md', extra?: string) {
  return clsx(BASE, VARIANTES[variante], TAILLES[taille], extra);
}

export function Button({
  variante = 'primaire',
  taille = 'md',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante; taille?: Taille }) {
  return <button className={buttonClasses(variante, taille, className)} {...props} />;
}

export function ButtonLink({
  variante = 'primaire',
  taille = 'md',
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variante?: Variante; taille?: Taille }) {
  return <Link className={buttonClasses(variante, taille, className)} {...props} />;
}
