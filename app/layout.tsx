import type { Metadata } from 'next';
import { Instrument_Serif, Inter_Tight } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// Inter Tight plutôt qu'Inter : le resserrement est ce qui donne à l'interface
// sa densité — c'est la police de Toko, et elle tient à côté du serif.
const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Larpocracy — L'art de tenir la salle",
    template: '%s · Larpocracy',
  },
  description:
    "La culture générale appliquée du business, du luxe et du pouvoir. Les codes, le vocabulaire et les références pour tenir une conversation avec n'importe qui.",
  metadataBase: new URL('https://larpocracy.vercel.app'),
  openGraph: {
    title: 'Larpocracy',
    description: "L'art de tenir la salle.",
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
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
