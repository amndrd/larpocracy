'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/Logo';
import SearchBox from '@/components/SearchBox';
import { ButtonLink } from '@/components/Button';
import { IconCadenas, IconEclair, IconFlamme, IconFleche, IconLire, IconTrophee } from '@/components/icons';
import { clsx } from '@/lib/clsx';

export type EntreeDomaine = {
  id: string;
  title: string;
  n: number;
  total: number;
  lues: number;
  hue: string;
};

export type ResumeCompte = {
  email: string;
  nom: string;
  plan: 'free' | 'pro';
  xp: number;
  serie: number;
  rang: string;
  part: number;
  suivant: string | null;
};

/**
 * Le châssis de l'application : barre latérale fixe, sans rien du marketing.
 * C'est ce contraste avec la vitrine qui fait comprendre qu'on est entré.
 */
export default function AppShell({
  domaines,
  compte,
  demo,
  children,
}: {
  domaines: EntreeDomaine[];
  compte: ResumeCompte;
  /** Comptes non configurés : on ouvre tout et on le dit. */
  demo?: boolean;
  children: React.ReactNode;
}) {
  const [tiroir, setTiroir] = useState(false);
  const pathname = usePathname();

  const barre = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/app" className="px-1.5 py-1">
        <Logo />
      </Link>

      <SearchBox />

      <nav className="flex flex-col gap-0.5">
        <LienLateral href="/app" actif={pathname === '/app'} icone={<IconLire className="size-4" />}>
          Tableau de bord
        </LienLateral>
        <LienLateral
          href="/app/compte"
          actif={pathname.startsWith('/app/compte')}
          icone={<IconTrophee className="size-4" />}
        >
          Mon compte
        </LienLateral>
      </nav>

      {domaines.length > 0 && (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <p className="px-3 pb-2 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-4">
            Contenu
          </p>
          <ul className="flex flex-col gap-0.5">
            {domaines.map((d) => {
              const actif = pathname.startsWith(`/app/d/${d.id}`);
              return (
                <li key={d.id}>
                  <Link
                    href={`/app/d/${d.id}`}
                    style={{ ['--dom' as string]: d.hue }}
                    className={clsx(
                      'block rounded-lg px-3 py-2 transition-colors duration-[400ms] ease-[var(--ease-fora)]',
                      actif ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]',
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={clsx(
                          'truncate text-[0.8125rem]',
                          actif ? 'text-ink' : 'text-ink-3',
                        )}
                      >
                        {d.title}
                      </span>
                      <span className="shrink-0 text-[0.6875rem] tabular-nums text-ink-4">
                        {d.total > 0 ? `${d.lues}/${d.total}` : '—'}
                      </span>
                    </span>
                    {d.total > 0 && (
                      <span className="mt-1.5 block h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-[var(--dom)] transition-[width] duration-700"
                          style={{ width: `${Math.round((d.lues / d.total) * 100)}%` }}
                        />
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Pied : le rang, puis l'appel à débloquer si la formule est libre. */}
      <div className="mt-auto space-y-3">
        <div className="rounded-xl bg-white/[0.04] p-3.5">
          <p className="flex items-center justify-between gap-2 text-[0.75rem]">
            <span className="flex items-center gap-1.5 text-ink-2">
              <IconEclair className="size-3.5" />
              <span className="tabular-nums">{compte.xp.toLocaleString('fr-FR')}</span> pts
            </span>
            <span
              className={clsx(
                'flex items-center gap-1',
                compte.serie > 0 ? 'text-gold' : 'text-ink-4',
              )}
            >
              <IconFlamme className="size-3.5" />
              <span className="tabular-nums">{compte.serie}</span>
            </span>
          </p>
          <span className="mt-2.5 block h-1 w-full overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-ink/70 transition-[width] duration-700"
              style={{ width: `${Math.round(compte.part * 100)}%` }}
            />
          </span>
          <p className="mt-2 text-[0.6875rem] text-ink-4">
            {compte.rang}
            {compte.suivant && ` · ${compte.suivant} ensuite`}
          </p>
        </div>

        {compte.plan === 'free' && !demo && (
          <ButtonLink href="/pricing" taille="sm" className="w-full">
            <IconCadenas className="size-3.5" />
            Tout débloquer
          </ButtonLink>
        )}

        {demo && (
          <p className="rounded-xl bg-white/[0.04] p-3 text-[0.6875rem] leading-relaxed text-ink-4">
            Comptes non configurés : tout est ouvert et rien n&apos;est enregistré.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:pl-[17rem]">
      {/* Barre latérale fixe */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[17rem] border-r border-line bg-canvas lg:block">
        {barre}
      </aside>

      {/* Barre supérieure mobile */}
      <div className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-line bg-canvas/85 px-4 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => setTiroir(true)}
          aria-label="Ouvrir le menu"
          className="grid size-9 shrink-0 place-items-center rounded-full text-ink-3 hover:text-ink"
        >
          <span aria-hidden className="relative block h-3.5 w-4">
            <span className="absolute left-0 top-0.5 h-[1.6px] w-full rounded-full bg-current" />
            <span className="absolute left-0 top-[0.65rem] h-[1.6px] w-full rounded-full bg-current" />
          </span>
        </button>
        <Link href="/app" className="min-w-0">
          <Logo />
        </Link>
        {compte.plan === 'free' && !demo && (
          <ButtonLink href="/pricing" taille="sm" className="ml-auto shrink-0">
            Débloquer
          </ButtonLink>
        )}
      </div>

      {/* Tiroir mobile */}
      {tiroir && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setTiroir(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div
            onClick={() => setTiroir(false)}
            className="animate-pop absolute inset-y-0 left-0 w-[17rem] border-r border-line bg-canvas"
          >
            {barre}
          </div>
        </div>
      )}

      <main id="contenu" className="min-w-0">
        {children}
      </main>
    </div>
  );
}

function LienLateral({
  href,
  actif,
  icone,
  children,
}: {
  href: string;
  actif: boolean;
  icone: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={actif ? 'page' : undefined}
      className={clsx(
        'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.875rem] transition-colors duration-[400ms] ease-[var(--ease-fora)]',
        actif ? 'bg-white/[0.07] text-ink' : 'text-ink-3 hover:bg-white/[0.04] hover:text-ink',
      )}
    >
      {icone}
      {children}
      {actif && <IconFleche className="ml-auto size-3.5 opacity-40" />}
    </Link>
  );
}
