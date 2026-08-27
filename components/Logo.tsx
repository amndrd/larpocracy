import { clsx } from '@/lib/clsx';

/**
 * Le mot-logo, empilé sur deux lignes et serré au maximum — la composition
 * que le registre donne à ses enseignes : un bloc compact plutôt qu'une
 * ligne, ce qui lui donne du poids dans un coin de page.
 *
 * Le monogramme a disparu avec la refonte #026 : la marque est le mot.
 */
export default function Logo({
  className,
  ligne = false,
}: {
  className?: string;
  /** Sur une seule ligne, pour les emplacements où la hauteur manque. */
  ligne?: boolean;
}) {
  return (
    <span
      className={clsx(
        'mega block shrink-0 text-ink select-none',
        ligne ? 'text-[1.375rem]' : 'text-[1.25rem] leading-[0.86]',
        className,
      )}
    >
      Larp{ligne ? '' : <br />}Lvl
      <span className="text-accent">.</span>
    </span>
  );
}
