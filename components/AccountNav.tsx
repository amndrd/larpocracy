'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buttonClasses } from './Button';
import { createClient } from '@/lib/supabase/browser';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Volontairement côté client : si le header lisait les cookies côté serveur,
 * toutes les pages du site basculeraient en rendu dynamique et perdraient
 * leur prérendu statique.
 */
export default function AccountNav() {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const pathname = usePathname();

  // Relu à chaque navigation, et pas seulement au montage : connexion et
  // déconnexion passent par des Server Actions, donc le client navigateur
  // n'émet aucun événement. Sans cette relecture, le lien resterait sur
  // « Entrer » après une connexion jusqu'au prochain rechargement complet.
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

  if (!ready) {
    // Réserve la place pour éviter que la barre ne saute au chargement.
    return <span className="h-9 w-24" aria-hidden />;
  }

  if (email) {
    return (
      <Link href="/compte" aria-label="Mon compte" className={buttonClasses('secondaire', 'sm')}>
        <span
          aria-hidden
          className="grid size-5 place-items-center rounded-full bg-accent text-[0.625rem] font-bold text-white"
        >
          {email[0]?.toUpperCase()}
        </span>
        <span className="hidden sm:inline">Mon compte</span>
      </Link>
    );
  }

  return (
    <Link href="/connexion" className={buttonClasses('primaire', 'sm')}>
      Entrer
    </Link>
  );
}
