/**
 * Identité chromatique des domaines.
 *
 * Les couleurs vivent ici et non dans `content/domains.json` : le contenu
 * décrit le sujet, la présentation reste dans le code. Chaque domaine expose
 * ses couleurs par variables CSS (`--dom`, `--dom-tint`), ce qui évite de
 * générer quatorze jeux de classes que Tailwind ne pourrait pas voir.
 */
export type DomainTheme = {
  /** Teinte pleine : badges, filets, dégradé sur la photo. */
  hue: string;
  /** Fond très clair dérivé de la teinte. */
  tint: string;
};

const THEMES: Record<string, DomainTheme> = {
  'cave-table':   { hue: '#8e2b3f', tint: '#fbf1f3' },
  vestiaire:      { hue: '#26406b', tint: '#eff2f8' },
  horlogerie:     { hue: '#8a6a2f', tint: '#faf5ea' },
  machines:       { hue: '#3f4c58', tint: '#f1f3f6' },
  lieux:          { hue: '#245c4a', tint: '#edf6f2' },
  business:       { hue: '#155e6b', tint: '#ecf6f8' },
  pouvoir:        { hue: '#5a2c63', tint: '#f7f0f9' },
  art:            { hue: '#a44a2a', tint: '#fdf3ee' },
  culture:        { hue: '#3b3f8f', tint: '#f0f1fb' },
  codes:          { hue: '#5c6330', tint: '#f5f7ea' },
  conversation:   { hue: '#a03a5d', tint: '#fdf0f4' },
  monde:          { hue: '#1d5b8f', tint: '#eef4fa' },
  sport:          { hue: '#3f6b2c', tint: '#f1f7ec' },
  'meta-larp':    { hue: '#463049', tint: '#f5f1f6' },
};

const DEFAUT: DomainTheme = { hue: '#98283a', tint: '#fdf2f3' };

export function themeOf(domainId: string): DomainTheme {
  return THEMES[domainId] ?? DEFAUT;
}

/** Variables CSS à poser sur un conteneur pour teinter tout ce qu'il contient. */
export function domainVars(domainId: string): React.CSSProperties {
  const t = themeOf(domainId);
  return { '--dom': t.hue, '--dom-tint': t.tint } as React.CSSProperties;
}
