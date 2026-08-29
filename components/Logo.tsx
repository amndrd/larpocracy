import Link from 'next/link';

/**
 * Le mot-logo, d'un seul tenant. La maquette l'empilait sur deux lignes ;
 * il tient désormais sur une, en haut à gauche du cadre comme en tête de la
 * barre mobile — plus rien ne distingue les deux cas.
 */
export default function Logo() {
  return (
    <Link aria-label="LarpLvl, accueil" className="ba_logo" href="/">
      <span className="ba_logo_word">LarpLvl</span>
    </Link>
  );
}
