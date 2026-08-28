/**
 * Le bouton Menu, en bas à gauche du cadre, sur grand écran.
 *
 * Les trois points pivotent d'un quart de tour à l'ouverture : c'est le seul
 * signe d'état, porté par `aria-expanded`, que le CSS lit directement.
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
      Menu
      <span aria-hidden="true" className="nav_menu_toggle_dots">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
