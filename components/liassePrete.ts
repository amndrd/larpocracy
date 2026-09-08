/**
 * L'attente de la liasse, en promesse.
 *
 * Le rideau d'intro ne se lève pas sur un trou au milieu du titre : il attend
 * que la liasse ait peint sa première image, comme il attendait naguère que
 * le rouleau soit décodé (#037). Mais un canvas n'a pas de `decode()`, et il
 * n'y a rien à interroger dans le document — d'où ce rendez-vous.
 *
 * Une promesse de module plutôt qu'une `ref` passée à travers la page : le
 * rideau et le hero sont frères, sans rien à partager par ailleurs, et la
 * raison qui valait pour le rouleau vaut encore ici.
 *
 * Elle ne se résout qu'une fois — les appels suivants ne font rien — et il
 * se peut qu'elle ne se résolve jamais : pas de WebGL, pas de liasse, ou pas
 * de hero du tout. Le plafond du rideau est là pour ça.
 */

let tenir: () => void;

/** Tenue à la première image peinte, ou quand on renonce à la peindre. */
export const liassePrête = new Promise<void>((résoudre) => {
  tenir = résoudre;
});

/** À appeler d'un côté comme de l'autre : la promesse ne se tient qu'une fois. */
export function signalerLiasse() {
  tenir();
}
