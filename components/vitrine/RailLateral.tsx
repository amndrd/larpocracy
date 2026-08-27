'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconCartes,
  IconEclair,
  IconLire,
  IconRecherche,
  IconTest,
  IconTrophee,
} from '@/components/icons';
import { clsx } from '@/lib/clsx';

/**
 * Le rail vertical du registre : une colonne de plaques arrondies collée au
 * bord gauche, à mi-hauteur de l'écran. C'est la pièce qui donne à la page
 * son cadre — sans elle, la bannière flotte au milieu de rien.
 *
 * Il double la barre du haut plutôt que de la remplacer : les onglets nommés
 * restent la navigation qui compte, le rail est un raccourci.
 */
const PLAQUES = [
  { href: '/app', label: 'Contenu', icon: IconLire },
  { href: '/features', label: 'La méthode', icon: IconCartes },
  { href: '/pricing', label: 'Formules', icon: IconTest },
  { href: '/about', label: 'La maison', icon: IconTrophee },
  { href: '/news', label: 'Journal', icon: IconEclair },
  { href: '/app/recherche', label: 'Rechercher', icon: IconRecherche },
];

export default function RailLateral() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Raccourcis"
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 flex-col gap-2.5 xl:flex"
    >
      {PLAQUES.map(({ href, label, icon: Icon }) => {
        const actif = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            title={label}
            aria-label={label}
            aria-current={actif ? 'page' : undefined}
            className={clsx(
              'group grid size-13 place-items-center rounded-2xl transition-colors duration-[400ms] ease-[var(--ease-fora)]',
              actif ? 'bg-ink text-canvas' : 'bg-veil text-ink-3 hover:bg-veil-2 hover:text-ink',
            )}
          >
            <Icon className="size-5" />
          </Link>
        );
      })}
    </nav>
  );
}
