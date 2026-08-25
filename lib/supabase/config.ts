/**
 * L'authentification ne s'active que si les deux variables sont présentes.
 * Tant qu'elles manquent, le site fonctionne normalement en accès libre —
 * aucune page ne doit planter à cause d'une configuration absente.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
