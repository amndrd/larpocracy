import Link from 'next/link';
import { clsx } from '@/lib/clsx';

type Variante = 'primaire' | 'secondaire' | 'fantome' | 'clair';
type Taille = 'sm' | 'md' | 'lg';

const BASE =
  'pressable inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold ' +
  'disabled:pointer-events-none disabled:opacity-45';

/* L'arête basse pleine se comprime au clic : le bouton a une épaisseur. */
const VARIANTES: Record<Variante, string> = {
  // Le bouton principal est clair sur fond noir : c'est le seul aplat plein
  // du système, ce qui le rend impossible à manquer.
  primaire: 'bg-ink text-canvas hover:opacity-88 active:scale-[0.98]',
  secondaire:
    'bg-veil text-ink ring-1 ring-line ring-inset hover:bg-veil-2 active:scale-[0.98]',
  clair: 'bg-canvas text-ink hover:bg-surface-3 active:scale-[0.98]',
  fantome: 'text-ink-3 hover:text-ink',
};

const TAILLES: Record<Taille, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-[0.875rem]',
  lg: 'h-13 px-7 text-[0.9375rem]',
};

export function buttonClasses(
  variante: Variante = 'primaire',
  taille: Taille = 'md',
  // Accepte le faux pour permettre `condition && 'classe'` à l'appel.
  extra?: string | false | null,
) {
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
