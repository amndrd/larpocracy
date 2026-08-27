import { clsx } from '@/lib/clsx';

/**
 * Le mot-logo. Plus de monogramme : le nom seul, très serré, comme le font
 * les studios — la marque est le mot, pas un pictogramme à côté.
 *
 * Le modèle compose son enseigne en PP Neue Montreal, une grotesque sous
 * licence commerciale : on ne peut ni l'embarquer ni la redistribuer ici.
 * Inter Tight, déjà chargée par le layout, en est la voisine la plus proche
 * dans le libre ; c'est l'interlettrage négatif qui fait l'essentiel du
 * caractère, et il est reproduit tel quel.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'block shrink-0 text-[1.375rem] leading-none font-medium tracking-[-0.055em] text-ink select-none',
        className,
      )}
    >
      LarpLvl
      {/* Le point d'accent : la seule couleur de l'enseigne. */}
      <span className="text-accent">.</span>
    </span>
  );
}
