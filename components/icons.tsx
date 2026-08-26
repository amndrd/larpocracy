/**
 * Pictogrammes au trait, dessinés à la main plutôt qu'importés :
 * une bibliothèque d'icônes pèserait plus lourd que les huit tracés utilisés.
 */
type P = { className?: string };
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const IconLire = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 6.5C10.5 5.2 8.6 4.6 6 4.6H4v13h2c2.6 0 4.5.6 6 1.9 1.5-1.3 3.4-1.9 6-1.9h2v-13h-2c-2.6 0-4.5.6-6 1.9Z" />
    <path d="M12 6.5v13" />
  </svg>
);

export const IconCartes = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="7" width="14" height="12" rx="2.5" />
    <path d="M7.5 4.5h10A3 3 0 0 1 20.5 7.5v9" />
  </svg>
);

export const IconTest = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2" />
  </svg>
);

export const IconRecherche = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const IconFleche = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const IconChevron = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const IconMelanger = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3.5 6.5h3.2c1.5 0 2.4.7 3.3 2l3 4.5c.9 1.3 1.8 2 3.3 2h3.2M3.5 17.5h3.2c1.5 0 2.4-.7 3.3-2M14.2 8.5c.9-1.3 1.8-2 3.3-2h3M17 3.8l3.5 2.7L17 9.2M17 14.8l3.5 2.7L17 20.2" />
  </svg>
);

export const IconRetourner = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M20 11a8 8 0 1 0-.6 4" />
    <path d="M20.5 5.5V11h-5.5" />
  </svg>
);

export const IconOui = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconNon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
  </svg>
);

export const IconEclair = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M13.5 3 5.5 13.2h5.2L10.2 21l8.3-10.4h-5.3L13.5 3Z" />
  </svg>
);

export const IconFlamme = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21c3.6 0 6-2.4 6-5.6 0-3.9-3.4-5.8-3.9-9.9-1.9 1-3 2.6-3.2 4.6-1-.6-1.6-1.6-1.8-2.7C7.3 8.9 6 11.4 6 14.2 6 18 8.4 21 12 21Z" />
  </svg>
);

export const IconTrophee = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7.5 4h9v4.2a4.5 4.5 0 0 1-9 0V4Z" />
    <path d="M7.5 5.5H5A2.5 2.5 0 0 0 5 10.5h.8M16.5 5.5H19a2.5 2.5 0 0 1 0 5h-.8M10 12.6V16m4-3.4V16M8 20h8M10 16h4" />
  </svg>
);

export const IconCadenas = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
    <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
  </svg>
);
