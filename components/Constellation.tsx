/**
 * Le motif de fond de l'accueil.
 *
 * Toko pose un globe filaire avec des nœuds reliés : deux langues qui se
 * parlent. L'équivalent ici n'est pas un globe mais un **réseau** — c'est
 * la promesse du site : une porte s'ouvre sur une conversation, et chaque
 * sujet tenu est une porte de plus. Les étiquettes sont les exemples du
 * manifeste, pas du décor.
 */

/** `cote` place l'étiquette à gauche du nœud quand la droite manquerait de place. */
// Tous les nœuds tiennent dans la moitié droite : la colonne de texte
// occupe la gauche de la bannière et rien ne doit venir s'y superposer.
const NOEUDS = [
  { x: 566, y: 300, label: 'Barolo', cote: 'droite' },
  { x: 690, y: 168, label: 'LBO', cote: 'droite' },
  { x: 792, y: 394, label: 'Royal Oak', cote: 'gauche' },
  { x: 900, y: 236, label: 'Rothko', cote: 'gauche' },
] as const;

const LARGEUR = (l: string) => l.length * 7.6 + 24;

export default function Constellation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 560"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Arcs filaires : la grille qui donne la profondeur */}
      <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.11">
        <ellipse cx="730" cy="300" rx="330" ry="330" />
        <ellipse cx="730" cy="300" rx="229" ry="330" />
        <ellipse cx="730" cy="300" rx="119" ry="330" />
        <ellipse cx="730" cy="300" rx="330" ry="119" />
        <ellipse cx="730" cy="300" rx="330" ry="229" />
        <line x1="400" y1="300" x2="1060" y2="300" />
      </g>

      {/* Le chemin qui relie les sujets : une conversation qui circule */}
      <path
        d="M566 300 C 612 224, 650 168, 690 168 S 752 352, 792 394 S 872 278, 900 236"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 7"
        opacity="0.30"
      />

      {NOEUDS.map((n, i) => {
        const w = LARGEUR(n.label);
        const dx = n.cote === 'droite' ? 14 : -(w + 14);
        return (
          <g key={n.label} opacity="0">
            <circle cx={n.x} cy={n.y} r="15" fill="var(--color-accent)" opacity="0.16" />
            <circle cx={n.x} cy={n.y} r="5" fill="var(--color-accent)" />
            <g transform={`translate(${n.x + dx} ${n.y - 28})`}>
              <rect
                width={w}
                height="25"
                rx="12.5"
                fill="var(--color-surface)"
                stroke="var(--color-line)"
              />
              <text
                x={w / 2}
                y="16.5"
                textAnchor="middle"
                fill="var(--color-ink-2)"
                fontSize="12"
                fontFamily="var(--font-sans)"
              >
                {n.label}
              </text>
            </g>
            {/* Les nœuds s'allument l'un après l'autre, comme une phrase qui se construit */}
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.6s"
              begin={`${0.35 + i * 0.22}s`}
              fill="freeze"
            />
          </g>
        );
      })}
    </svg>
  );
}
