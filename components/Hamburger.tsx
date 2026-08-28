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
      <div className="menu_toggle_icon">
        <div className="menu_toggle_line" />
        <div className="menu_toggle_line" />
      </div>
    </button>
  );
}
