import Link from 'next/link';

/**
 * Le mot-logo. Empilé sur deux lignes en haut à gauche du cadre ; sur mobile,
 * il repasse en une seule ligne, en tête de la barre.
 */
export default function Logo() {
  return (
    <Link aria-label="LarpLvl, accueil" className="ba_logo" href="/">
      <span className="ba_logo_word ba_logo_word_top">Larp</span>
      <span className="ba_logo_word">Lvl</span>
    </Link>
  );
}
