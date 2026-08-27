import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Le châssis de la vitrine : barre pleine largeur, pied de page, tout en
 * statique. La classe `vitrine` est ce qui fait passer ce sous-arbre au jour
 * — elle redéfinit les jetons de couleur pour elle seule, et l'application
 * reste la nuit de l'autre côté de la connexion.
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
      {/* La barre est en `fixed`, donc hors du flux : sans ce dégagement,
          le premier titre passerait dessous. */}
      <main id="contenu" className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
