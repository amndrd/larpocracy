'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AccountNav from './AccountNav';
import Logo from './Logo';
import { clsx } from '@/lib/clsx';

const LIENS = [
  { href: '/app', label: 'Contenu' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact us' },
];

/**
 * La barre du registre d'agence : pleine largeur, posée à même le héros,
 * sans fond ni filet — jusqu'à ce qu'on défile. Là seulement elle prend son
 * papier et sa ligne de séparation. C'est ce basculement, et non un cadre
 * permanent, qui donne l'impression que la page glisse sous la barre.
 */
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [pose, setPose] = useState(false);
  const pathname = usePathname();

  // Un seuil bas : la barre doit se poser dès les premiers pixels, sinon
  // le titre du héros la traverse avant qu'elle n'ait réagi.
  useEffect(() => {
    const surDefilement = () => setPose(window.scrollY > 12);
    surDefilement();
    window.addEventListener('scroll', surDefilement, { passive: true });
    return () => window.removeEventListener('scroll', surDefilement);
  }, []);

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[600ms] ease-[var(--ease-fora)]',
        pose || menu
          ? 'border-b border-line bg-canvas/85 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[92rem] items-center gap-8 px-5 sm:h-20 sm:px-7 lg:px-10">
        <Link href="/" aria-label="LarpLvl, accueil" className="-m-1 shrink-0 p-1">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
              className={clsx(
                'rounded-full px-3 py-2 text-[0.875rem] font-medium tracking-[-0.01em] transition-colors duration-[400ms] ease-[var(--ease-fora)]',
                pathname === l.href ? 'text-ink' : 'text-ink-3 hover:text-ink',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Login et Get started, dans cet ordre : le second est le seul
            aplat plein de la barre, et il ferme la ligne. */}
        <div className="ml-auto hidden shrink-0 md:block">
          <AccountNav />
        </div>

        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-expanded={menu}
          aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="ml-auto grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-veil lg:hidden"
        >
          <Burger ouvert={menu} />
        </button>
      </div>

      {/* Le menu court : les liens en grand. Un clic n'importe où le referme,
          ce qui couvre aussi les boutons de compte — et évite de fermer depuis
          un effet, qui déclencherait un rendu en cascade à chaque navigation. */}
      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="animate-slide-in border-t border-line bg-canvas px-5 pt-4 pb-8 sm:px-7 lg:hidden"
        >
          <nav className="flex flex-col">
            {LIENS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mega border-b border-line-soft py-4 text-[1.75rem] text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-7">
            <AccountNav pleineLargeur />
          </div>
        </div>
      )}
    </header>
  );
}

/** Deux traits qui se croisent : pas d'icône importée pour si peu. */
function Burger({ ouvert }: { ouvert: boolean }) {
  return (
    <span aria-hidden className="relative block h-3.5 w-5">
      <span
        className={clsx(
          'absolute left-0 h-[1.6px] w-full rounded-full bg-current transition-transform duration-300 ease-[var(--ease-fora)]',
          ouvert ? 'top-1.5 rotate-45' : 'top-0.5',
        )}
      />
      <span
        className={clsx(
          'absolute left-0 h-[1.6px] w-full rounded-full bg-current transition-transform duration-300 ease-[var(--ease-fora)]',
          ouvert ? 'top-1.5 -rotate-45' : 'top-[0.65rem]',
        )}
      />
    </span>
  );
}
