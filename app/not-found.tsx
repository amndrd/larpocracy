import Link from 'next/link';
import GrilleFond from '@/components/GrilleFond';
import Header from '@/components/Header';
import PointCurseur from '@/components/PointCurseur';

/**
 * La page servie à toute adresse qui n'existe pas (#039).
 *
 * Elle n'est pas un ornement : les six entrées de la barre et les deux
 * boutons du coin mènent aujourd'hui à des pages qui n'existent pas encore.
 * Un visiteur qui clique tombe donc ici — c'est, en l'état, la deuxième page
 * la plus visitée du site. Sans ce fichier, Next sert son propre écran :
 * fond blanc, Helvetica, « This page could not be found ».
 *
 * Elle reprend le cadre du site — la grille de fond, l'en-tête, le point qui
 * suit le curseur — mais **pas le rideau d'intro**, et c'est délibéré : le
 * rideau attend la liasse du hero, qui n'est pas ici. Il ne se lèverait donc
 * qu'au bout de son plafond de deux secondes, sur une page qui n'a rien à
 * faire attendre.
 *
 * Le titre de l'onglet reste « LarpLvl » : `not-found.tsx` n'accepte pas
 * d'export `metadata` — seul `global-not-found.tsx`, encore expérimental, le
 * permet. Sans conséquence pour le référencement : Next pose lui-même
 * `noindex` sur toute réponse 404.
 */
export default function Introuvable() {
  return (
    <>
      <GrilleFond />
      <PointCurseur />
      <Header />

      <main className="introuvable">
        <p className="introuvable_code text-youth">404</p>

        <h1 className="introuvable_titre">
          Cette page
          <br />
          n’existe pas encore
        </h1>

        <p className="introuvable_texte">
          Le site s’écrit. Ce qui manque ici viendra ; le reste est à l’accueil.
        </p>

        <Link className="introuvable_retour text-youth" href="/">
          revenir à l’accueil
        </Link>
      </main>
    </>
  );
}
