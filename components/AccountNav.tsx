'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    // Réserve la place pour éviter que la barre ne saute au chargement.
    return <span className="h-8 w-20" aria-hidden />;
  }

  if (email) {
    return (
      <Link
        href="/compte"
        className="border border-rule px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
      >
        Mon compte
      </Link>
    );
  }

  return (
    <Link
      href="/connexion"
      className="border border-ink px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
    >
      Entrer
    </Link>
  );
}
