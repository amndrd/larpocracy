/**
 * Le bouton hamburger de la barre du haut. Il ne paraît que sous 768 px, où
 * il remplace le bouton Menu : ses deux traits se croisent à l'ouverture.
 */
export default function Hamburger({
  ouvert,
  bascule,
}: {
  ouvert: boolean;
  bascule: () => void;
}) {
  return (
    <button
      type="button"
      className="menu_toggle"
      aria-expanded={ouvert}
      aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
      onClick={bascule}
    >
      <span className="menu_toggle_icon">
        <span className="menu_toggle_line" />
        <span className="menu_toggle_line" />
      </span>
    </button>
  );
}
