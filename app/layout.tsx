import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "LarpLvl — L'art de tenir la salle",
    template: '%s · LarpLvl',
  },
  description:
    "La culture générale appliquée du business, du luxe et du pouvoir. Les codes, le vocabulaire et les références pour tenir une conversation avec n'importe qui.",
  metadataBase: new URL('https://larpocracy.vercel.app'),
  openGraph: {
    title: 'LarpLvl',
    description: "L'art de tenir la salle.",
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={sans.variable}>
      <head>
        {/* Sans JavaScript, rien ne révélerait les blocs animés au défilement. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
