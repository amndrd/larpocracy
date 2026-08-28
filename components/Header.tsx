'use client';

import { useEffect, useState } from 'react';
import Hamburger from './Hamburger';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import Nav from './Nav';

/**
 * L'en-tête.
 *
 * Il ne coiffe pas la page, il la recouvre : `position: fixed`, pleine
 * hauteur, transparent aux clics. Chacune de ses quatre régions se place
 * seule dans un coin du cadre, et seules elles reprennent les clics.
 *
 * Il tient le seul état du site — le menu mobile, ouvert ou fermé. Cet état
 * ne descend pas dans les composants : il est posé en classe sur le corps de
 * page, parce que c'est de là que le CSS commande à la fois la barre, le
 * voile et le hamburger, qui ne sont pas frères dans le balisage.
 */
export default function Header() {
  const [ouvert, setOuvert] = useState(false);
  const bascule = () => setOuvert((o) => !o);

  useEffect(() => {
    document.body.classList.toggle('--showMenu', ouvert);
    return () => document.body.classList.remove('--showMenu');
  }, [ouvert]);

  // Échap referme, comme partout ailleurs.
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuvert(false);
    };
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [ouvert]);

  return (
    <header className="header">
      <div className="header_inner">
        {/* En haut à gauche sur grand écran, en tête de barre sur mobile. */}
        <div className="header_mobile">
          <Logo />
          <Hamburger ouvert={ouvert} bascule={bascule} />
        </div>

        {/* À mi-hauteur à gauche : la navigation, et le bouton qui l'appelle. */}
        <div className="nav_group">
          <Nav />
          <MenuToggle ouvert={ouvert} bascule={bascule} />
        </div>

        {/* En haut à droite : l'appel à l'action. */}
        <div className="header_btns" />
      </div>

      {/* Le voile dépoli, derrière la barre ouverte. */}
      <div
        className="nav_overlay"
        aria-hidden="true"
        onClick={() => setOuvert(false)}
      />
    </header>
  );
}
