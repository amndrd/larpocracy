import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LarpLvl',
  description: "L'art de tenir la salle.",
};

/**
 * La coquille du site. Elle ne porte encore rien : le design repart de zéro,
 * et cette page blanche est le point de départ.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
