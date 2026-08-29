import Link from 'next/link';

/**
 * Le lien de connexion, à gauche de l'appel à l'action.
 *
 * Pas de pastille, pas de glissement : le texte nu. C'est ce qui laisse à
 * l'appel la seule forme pleine du coin. Il porte tout de même
 * `pointer-events` dans la feuille de style — l'en-tête est transparent aux
 * clics, seules ses régions les reprennent.
 */
export default function Login() {
  return (
    <Link className="header_login text-youth" href="/connexion">
      login
    </Link>
  );
}
