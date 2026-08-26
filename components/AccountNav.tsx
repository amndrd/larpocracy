'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buttonClasses } from './Button';
import { IconEclair, IconFlamme } from './icons';
import { clsx } from '@/lib/clsx';
import { createClient } from '@/lib/supabase/browser';
import { isSupabaseConfigured } from '@/lib/supabase/config';

type Bilan = { xp: number; serie: number; rang: string };

/**
 * Volontairement côté client : si le header lisait les cookies côté serveur,
 * toutes les pages du site basculeraient en rendu dynamique et perdraient
 * leur prérendu statique. Les compteurs suivent le même chemin — ils
 * arrivent par /api/bilan une fois la session connue.
 */
export default function AccountNav({ pleineLargeur = false }: { pleineLargeur?: boolean }) {
  const [email, setEmail] = useState<string | null>(null);
  const [bilan, setBilan] = useState<Bilan | null>(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const pathname = usePathname();

  // Relu à chaque navigation, et pas seulement au montage : connexion et
  // déconnexion passent par des Server Actions, donc le client navigateur
  // n'émet aucun événement. Sans cette relecture, le lien resterait sur
  // « Connexion » après une connexion jusqu'au prochain rechargement complet.
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    let monte = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!monte) return;
      setEmail(data.session?.user.email ?? null);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
      setReady(true);
    });
    return () => {
      monte = false;
      sub.subscription.unsubscribe();
    };
  }, [pathname]);

  // Les compteurs se rafraîchissent à chaque navigation : lire une fiche ou
  // finir un test doit se voir tout de suite dans la barre.
  useEffect(() => {
    // Rien à charger sans session. On ne remet pas non plus le bilan à zéro :
    // la branche déconnectée ne l'affiche pas, et le remettre depuis un effet
    // provoquerait un rendu inutile.
    if (!email) return;
    const ctrl = new AbortController();
    fetch('/api/bilan', { signal: ctrl.signal, cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Bilan | null) => d && setBilan(d))
      .catch(() => {
        /* les compteurs ne sont pas critiques */
      });
    return () => ctrl.abort();
  }, [email, pathname]);

  if (!ready) {
    // Réserve la place pour éviter que la barre ne saute au chargement.
    return <span className={pleineLargeur ? 'block h-11' : 'block h-9 w-40'} aria-hidden />;
  }

  if (email) {
    return (
      <div className={clsx('flex items-center gap-2', pleineLargeur && 'flex-col items-stretch')}>
        {bilan && !pleineLargeur && (
          <>
            <span
              title={`${bilan.xp} points · rang ${bilan.rang}`}
              className="hidden items-center gap-1.5 rounded-full bg-accent-3 px-3 py-1.5 text-[0.8125rem] font-semibold text-accent-ink lg:inline-flex"
            >
              <IconEclair className="size-3.5" />
              <span className="tabular-nums">{bilan.xp.toLocaleString('fr-FR')}</span>
            </span>
            <span
              title={`Série de ${bilan.serie} jour${bilan.serie > 1 ? 's' : ''}`}
              className={clsx(
                'hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold xl:inline-flex',
                bilan.serie > 0 ? 'bg-gold-2 text-gold' : 'bg-canvas-2 text-ink-3',
              )}
            >
              <IconFlamme className="size-3.5" />
              <span className="tabular-nums">{bilan.serie}</span>
            </span>
          </>
        )}
        <Link
          href="/compte"
          className={buttonClasses('secondaire', pleineLargeur ? 'md' : 'sm', pleineLargeur && 'w-full')}
        >
          <span
            aria-hidden
            className="grid size-5 place-items-center rounded-full bg-accent text-[0.625rem] font-bold text-white"
          >
            {email[0]?.toUpperCase()}
          </span>
          Mon compte
        </Link>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-center gap-1.5', pleineLargeur && 'flex-col items-stretch gap-2')}>
      <Link
        href="/connexion"
        className={buttonClasses('fantome', pleineLargeur ? 'md' : 'sm', pleineLargeur && 'w-full')}
      >
        Connexion
      </Link>
      <Link
        href="/inscription"
        className={buttonClasses('primaire', pleineLargeur ? 'md' : 'sm', pleineLargeur && 'w-full')}
      >
        S&apos;inscrire
      </Link>
    </div>
  );
}
