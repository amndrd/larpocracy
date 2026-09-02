/**
 * Le papier millimétré du fond, repris de moneyincheck.org (#033).
 *
 * Tout le dessin est dans `globals.css` : ici, un seul `div`, posé une fois
 * pour toute la page. Il est fixe, il ne reçoit pas le pointeur, et il passe
 * derrière le contenu — la page défile, la grille ne bouge pas.
 */
export default function GrilleFond() {
  return <div className="grille grille_fond" aria-hidden="true" />;
}
