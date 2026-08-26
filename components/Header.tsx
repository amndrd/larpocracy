'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AccountNav from './AccountNav';
import Logo from './Logo';
import SearchBox from './SearchBox';
import { IconRecherche } from './icons';
import { clsx } from '@/lib/clsx';

const LIENS = [
  { href: '/app', label: 'Contenu' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/news', label: 'News' },
];

/**
 * Barre flottante, détachée du bord haut. Le verre dépoli est posé par les
 * utilitaires Tailwind : déclarer `backdrop-filter` dans un `@utility` reste
 * sans effet en v4 (voir les pièges du projet).
 */
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [cherche, setCherche] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
      <div className="mx-auto w-full max-w-[76rem]">
        <div className="flex h-14 items-center gap-2 rounded-full bg-white/[0.05] px-3 shadow-md backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10 ring-inset sm:h-15 sm:px-4">
          <Link href="/" aria-label="LarpLvl, accueil" className="rounded-full px-1.5 py-1">
            <Logo />
          </Link>

          {cherche ? (
            <div className="flex flex-1 items-center gap-2">
              <SearchBox autoFocus onNavigate={() => setCherche(false)} />
              <button
                type="button"
                onClick={() => setCherche(false)}
                className="shrink-0 rounded-full px-3 py-2 text-[0.8125rem] font-medium text-ink-3 transition-colors duration-[400ms] ease-[var(--ease-fora)] hover:text-ink"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              {/* Les liens sont centrés dans la barre, comme sur le modèle. */}
              <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 xl:flex">
                {LIENS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={pathname === l.href ? 'page' : undefined}
                    className={clsx(
                      'rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-[400ms] ease-[var(--ease-fora)]',
                      pathname === l.href ? 'text-ink' : 'text-ink-3 hover:text-ink',
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
                  className="grid size-9 place-items-center rounded-full text-ink-3 transition-colors duration-[400ms] ease-[var(--ease-fora)] hover:text-ink"
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
                  className="grid size-9 place-items-center rounded-full text-ink-3 transition-colors hover:text-ink xl:hidden"
                >
                  <Burger ouvert={menu} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Panneau mobile. Un clic n'importe où le referme : cela couvre aussi
            les liens de compte, qu'on ne peut pas équiper un par un. */}
        {menu && (
          <div
            onClick={() => setMenu(false)}
            className="animate-pop mt-2 rounded-2xl bg-[#0d0d0d]/95 p-2 shadow-xl ring-1 ring-white/10 ring-inset backdrop-blur-xl xl:hidden"
          >
            {LIENS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl px-4 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white/5"
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
