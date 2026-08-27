import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Defilement from '@/components/vitrine/Defilement';
import HeureLocale from '@/components/vitrine/HeureLocale';
import RailLateral from '@/components/vitrine/RailLateral';

/**
 * Le châssis de la vitrine : papier crème, barre du haut, rail de raccourcis
 * à gauche, indicateur de défilement à droite, heure locale en bas. Tout est
 * en statique.
 *
 * La classe `vitrine` est ce qui fait passer ce sous-arbre au jour — elle
 * redéfinit les jetons de couleur pour elle seule, et l'application reste la
 * nuit de l'autre côté de la connexion.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="vitrine flex min-h-screen flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Aller au contenu
      </a>

      <Header />
      <RailLateral />
      <Defilement />

      {/* La barre et le rail sont en `position: fixed`, donc hors du flux :
          sans ces dégagements, les titres passeraient dessous et le premier
          mot de chaque ligne se retrouverait sous les plaques. */}
      <main id="contenu" className="flex-1 pt-20 sm:pt-24 xl:px-24">
        {children}
      </main>

      {/* L'heure ne s'affiche qu'en grand écran : en dessous, le rail est
          masqué et elle n'aurait plus le cadre qui lui donne son sens. */}
      <div className="pointer-events-none fixed right-6 bottom-5 z-40 hidden lg:block">
        <HeureLocale />
      </div>

      <Footer />
    </div>
  );
}
