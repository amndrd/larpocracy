import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { Plan } from './plans';

export type Session = {
  /** Vrai quand les clés Supabase manquent : tout est ouvert, rien n'est gardé. */
  demo: boolean;
  email: string | null;
  nom: string;
  plan: Plan;
};

/**
 * Qui consulte, et avec quelle formule. Lu par les pages de l'application,
 * jamais par la vitrine — la vitrine doit rester prérendue.
 */
export async function getSession(): Promise<Session> {
  if (!isSupabaseConfigured) {
    return { demo: true, email: null, nom: 'Invité', plan: 'pro' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { demo: false, email: null, nom: '', plan: 'free' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, plan')
    .eq('id', user.id)
    .maybeSingle();

  return {
    demo: false,
    email: user.email ?? null,
    nom: profile?.display_name || user.email?.split('@')[0] || 'vous',
    plan: (profile?.plan as Plan) ?? 'free',
  };
}
