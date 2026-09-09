import type { Metadata, Viewport } from 'next';
import { pp, youth, editorial } from './fonts';
import './globals.css';

/**
 * Ce que le site dit de lui-même — dans l'onglet, dans un résultat de
 * recherche, et dans l'aperçu d'un lien partagé (#040).
 *
 * Le titre est un gabarit : les pages à venir n'auront qu'à donner le leur,
 * le nom du site s'y ajoutera. La page d'accueil, elle, garde la baseline.
 *
 * Il n'y a **ni `metadataBase` ni image d'aperçu**, et c'est délibéré : le
 * site n'a pas encore d'adresse — le déploiement Vercel attend. Une image
 * d'ouverture demande une URL absolue ; l'inventer maintenant ferait un lien
 * mort dans chaque aperçu. À reprendre le jour du déploiement.
 */
export const metadata: Metadata = {
  title: {
    default: 'LarpLvl — L’art de tenir la salle',
    template: '%s — LarpLvl',
  },
  description:
    'Les codes, le vocabulaire et les références des milieux du business, du luxe et du pouvoir — pour tenir une conversation crédible avec n’importe qui.',
  applicationName: 'LarpLvl',
  openGraph: {
    type: 'website',
    siteName: 'LarpLvl',
    locale: 'fr_FR',
    title: 'LarpLvl — L’art de tenir la salle',
    description:
      'Les codes, le vocabulaire et les références des milieux du business, du luxe et du pouvoir.',
  },
};

/**
 * Le papier déborde de la page : `theme-color` le donne à la barre du
 * navigateur sur mobile, qui sans lui pose son blanc ou son noir contre le
 * crème. Et `color-scheme: light` dit au navigateur de ne pas inverser de
 * lui-même une page qui n'a pas de mode sombre — le site n'a que deux
 * couleurs, et elles sont dans un sens.
 */
export const viewport: Viewport = {
  themeColor: '#fbf9ef',
  colorScheme: 'light',
};

/**
 * La coquille du site : les trois polices, et les classes du corps de page.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${pp.variable} ${youth.variable} ${editorial.variable}`}>
      <body className="bg-bg font-body text-base antialiased">{children}</body>
    </html>
  );
}
