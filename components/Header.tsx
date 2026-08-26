'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AccountNav from './AccountNav';
import SearchBox from './SearchBox';
import { IconRecherche } from './icons';
import { clsx } from '@/lib/clsx';

const LIENS = [
  { href: '/domaines', label: 'Contenu' },
  { href: '/tarifs', label: 'Tarifs' },
];

/**
 * Barre flottante, détachée du bord haut : elle survole la page au lieu de la
 * coiffer. Le verre dépoli (flou + saturation) est ce qui la rattache au
 * registre Apple ; sans la saturation, le flou seul rend gris et terne.
 */
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [cherche, setCherche] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
      <div className="mx-auto w-full max-w-[74rem]">
        <div className="glass-edge flex h-14 items-center gap-2 rounded-full bg-white/72 px-3 shadow-lg backdrop-blur-xl backdrop-saturate-150 sm:h-15 sm:px-4">
          <Link
            href="/"
            className="flex shrink-0 items-baseline gap-2.5 rounded-full px-2 py-1"
            aria-label="Larpocracy, accueil"
          >
            <span className="display text-[1.3rem] leading-none tracking-tight">Larpocracy</span>
            <span className="hidden text-[0.6875rem] italic text-ink-3 xl:inline">
              l&apos;art de tenir la salle
            </span>
          </Link>

          {/* Le champ de recherche prend toute la barre quand il s'ouvre. */}
          {cherche ? (
            <div className="flex flex-1 items-center gap-2">
              <SearchBox autoFocus onNavigate={() => setCherche(false)} />
              <button
                type="button"
                onClick={() => setCherche(false)}
                className="shrink-0 rounded-full px-3 py-2 text-[0.8125rem] font-medium text-ink-2 transition-colors hover:bg-canvas-2 hover:text-ink"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              <nav className="ml-2 hidden items-center gap-1 md:flex">
                {LIENS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={pathname === l.href ? 'page' : undefined}
                    className={clsx(
                      'rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors',
                      pathname === l.href
                        ? 'bg-canvas-2 text-ink'
                        : 'text-ink-2 hover:bg-canvas-2 hover:text-ink',
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className="ml-auto flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCherche(true)}
                  aria-label="Rechercher"
                  className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-canvas-2 hover:text-ink"
                >
                  <IconRecherche className="size-4" />
                </button>

                <span className="hidden md:block">
                  <AccountNav />
                </span>

                <button
                  type="button"
                  onClick={() => setMenu((v) => !v)}
                  aria-expanded={menu}
                  aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
                  className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-canvas-2 hover:text-ink md:hidden"
                >
                  <Burger ouvert={menu} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Panneau mobile */}
        {menu && (
          // Un clic n'importe où dans le panneau le referme : cela couvre aussi
          // les liens de compte, qu'on ne peut pas équiper un par un.
          <div
            onClick={() => setMenu(false)}
            className="glass-edge animate-pop mt-2 rounded-2xl bg-white/95 p-2 shadow-xl backdrop-blur-xl backdrop-saturate-150 md:hidden"
          >
            {LIENS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl px-4 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-canvas-2"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-line-soft px-2 pt-3 pb-1">
              <AccountNav pleineLargeur />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/** Deux traits qui se croisent : pas d'icône importée pour si peu. */
function Burger({ ouvert }: { ouvert: boolean }) {
  return (
    <span aria-hidden className="relative block h-3.5 w-4">
      <span
        className={clsx(
          'absolute left-0 h-[1.6px] w-full rounded-full bg-current transition-transform duration-300',
          ouvert ? 'top-1.5 rotate-45' : 'top-0.5',
        )}
      />
      <span
        className={clsx(
          'absolute left-0 h-[1.6px] w-full rounded-full bg-current transition-transform duration-300',
          ouvert ? 'top-1.5 -rotate-45' : 'top-[0.65rem]',
        )}
      />
    </span>
  );
}
