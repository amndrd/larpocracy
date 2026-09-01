import type { Metadata } from 'next';
import { pp, youth, editorial } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'LarpLvl',
  description: "L'art de tenir la salle.",
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
