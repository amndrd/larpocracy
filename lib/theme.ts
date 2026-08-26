/**
 * Identité chromatique des domaines.
 *
 * Les couleurs vivent ici et non dans `content/domains.json` : le contenu
 * décrit le sujet, la présentation reste dans le code. Chaque domaine expose
 * ses couleurs par variables CSS (`--dom`, `--dom-tint`), ce qui évite de
 * générer quatorze jeux de classes que Tailwind ne pourrait pas voir.
 *
 * Les teintes sont calées pour un fond sombre : claires et un peu
 * désaturées, sinon elles vibrent sur le noir.
 */
export type DomainTheme = {
  /** Teinte pleine : titres de domaine, filets, barres, halo. */
  hue: string;
  /** Fond teinté sombre, dérivé de la teinte. */
  tint: string;
};

const THEMES: Record<string, DomainTheme> = {
  'cave-table':   { hue: '#d4576b', tint: '#2a1519' },
  vestiaire:      { hue: '#6b8ec9', tint: '#161c2a' },
  horlogerie:     { hue: '#d0a35c', tint: '#2a2116' },
  machines:       { hue: '#8fa3b5', tint: '#1c2126' },
  lieux:          { hue: '#57b391', tint: '#12261f' },
  business:       { hue: '#4fa8bd', tint: '#12242a' },
  pouvoir:        { hue: '#b07cc4', tint: '#241a2a' },
  art:            { hue: '#e08355', tint: '#2d1c14' },
  culture:        { hue: '#8b8fe0', tint: '#1c1d2e' },
  codes:          { hue: '#a8b46a', tint: '#22261a' },
  conversation:   { hue: '#dd7396', tint: '#2c1720' },
  monde:          { hue: '#5a9fd6', tint: '#14212c' },
  sport:          { hue: '#86bd63', tint: '#1a2616' },
  'meta-larp':    { hue: '#c4b5a8', tint: '#262019' },
};

const DEFAUT: DomainTheme = { hue: '#c0384a', tint: '#2b1518' };

export function themeOf(domainId: string): DomainTheme {
  return THEMES[domainId] ?? DEFAUT;
}

/** Variables CSS à poser sur un conteneur pour teinter tout ce qu'il contient. */
export function domainVars(domainId: string): React.CSSProperties {
  const t = themeOf(domainId);
  return { '--dom': t.hue, '--dom-tint': t.tint } as React.CSSProperties;
}
