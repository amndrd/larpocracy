/**
 * Le bandeau défilant du registre : une bande de mots qui traverse la page
 * sans fin, entre deux sections.
 *
 * La liste est écrite deux fois et l'animation ne parcourt que la moitié de
 * la largeur : à la fin de la course, la copie occupe exactement la position
 * de départ de l'original, et le raccord est invisible. Le doublon est donc
 * structurel, pas décoratif — il est masqué aux lecteurs d'écran.
 *
 * Aucun JavaScript : c'est une seule règle CSS (`ruban`), que le réglage
 * « animations réduites » du système arrête net plutôt que d'accélérer.
 */
export default function Ruban({ mots }: { mots: string[] }) {
  if (mots.length === 0) return null;

  return (
    <div className="overflow-hidden border-y border-line py-6 select-none">
      <div className="ruban">
        {[0, 1].map((copie) => (
          <ul
            key={copie}
            aria-hidden={copie === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {mots.map((m) => (
              <li
                key={m}
                className="mega flex items-center gap-8 px-8 text-[clamp(1.25rem,2.2vw,1.75rem)] whitespace-nowrap text-ink-3"
              >
                {m}
                <span aria-hidden className="text-accent">
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
