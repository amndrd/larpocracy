import Link from 'next/link';

/**
 * Le bouton d'appel à l'action, en haut à droite du cadre.
 *
 * Il n'a qu'une ligne de texte : la seconde, celle qui apparaît au survol,
 * est son ombre portée. C'est ce qui permet au glissement de ne rien
 * dupliquer dans le balisage.
 *
 * Les deux enveloppes sont des `div` et non des `span`, comme dans la
 * maquette : la pastille est en `inline-block`, un contenu en ligne n'y
 * prendrait pas la garde du bouton en hauteur.
 */
export default function Cta() {
  return (
    <Link className="btn w-inline-block" href="/inscription">
      <div className="btn-inner">
        <div className="btn-text text-youth">get started</div>
      </div>
    </Link>
  );
}
