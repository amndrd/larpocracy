/** Concaténation conditionnelle de classes. Évite une dépendance pour trois lignes. */
export function clsx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}
