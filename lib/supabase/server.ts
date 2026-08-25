import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

/**
 * Client Supabase pour Server Components, Server Actions et Route Handlers.
 * Un client neuf par rendu — jamais partagé entre deux requêtes.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Écriture impossible depuis un Server Component : c'est le middleware
          // qui rafraîchit la session, donc on peut ignorer sans risque.
        }
      },
    },
  });
}

/** L'utilisateur connecté, ou null. Vérifié auprès du serveur d'auth. */
export async function getUser() {
  const { isSupabaseConfigured } = await import('./config');
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
