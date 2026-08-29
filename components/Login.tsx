import Link from 'next/link';

/**
 * Le bouton de connexion, à gauche de l'appel à l'action.
 *
 * Même carcasse que `Cta`, même glissement au survol : seule la peau change.
 * Il est en fantôme — pas d'aplat, un liseré d'encre — pour que l'aplat plein
 * reste unique dans le cadre et ferme la ligne.
 */
export default function Login() {
  return (
    <Link className="btn --fantome w-inline-block" href="/connexion">
      <div className="btn-inner">
        <div className="btn-text text-youth">login</div>
      </div>
    </Link>
  );
}
