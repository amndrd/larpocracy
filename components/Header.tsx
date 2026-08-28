/**
 * L'en-tête.
 *
 * Il ne coiffe pas la page, il la recouvre : `position: fixed`, pleine
 * hauteur, transparent aux clics. Chacune de ses quatre régions se place
 * seule dans un coin du cadre, et seules elles reprennent les clics.
 */
export default function Header() {
  return (
    <header className="header">
      <div className="header_inner">
        {/* En haut à gauche sur grand écran, en tête de barre sur mobile. */}
        <div className="header_mobile" />

        {/* En haut à droite : l'appel à l'action. */}
        <div className="header_btns" />
      </div>
    </header>
  );
}
