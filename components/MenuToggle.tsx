/**
 * Le bouton Menu, en bas à gauche du cadre, sur grand écran.
 *
 * Deux signes d'état, tirés du même `aria-expanded` : le mot bascule de
 * « Menu » à « Close », et les trois points pivotent d'un quart de tour —
 * ceux-là par le CSS, qui lit l'attribut directement.
 *
 * Le mot n'est pas doublé dans le balisage : le bouton garde son
 * `min-width`, ancré à gauche, donc « Close », plus long d'une lettre,
 * s'étend vers la droite sans rien déplacer.
 */
export default function MenuToggle({
  ouvert,
  bascule,
}: {
  ouvert: boolean;
  bascule: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={ouvert}
      onClick={bascule}
      className="nav_menu_toggle text-youth"
    >
      {ouvert ? 'Close' : 'Menu'}
      <span aria-hidden="true" className="nav_menu_toggle_dots">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
