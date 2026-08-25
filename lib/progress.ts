'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export type ProgressRow = {
  domain_id: string;
  card_id: string;
  read_at: string;
  quiz_correct: number | null;
  quiz_total: number | null;
};

/** Toute la progression de l'utilisateur courant. Liste vide s'il n'est pas connecté. */
export async function getProgress(): Promise<ProgressRow[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('card_progress')
    .select('domain_id, card_id, read_at, quiz_correct, quiz_total')
    .eq('user_id', user.id);

  return data ?? [];
}

/** Marque une fiche comme lue. Sans effet si personne n'est connecté. */
export async function markRead(domainId: string, cardId: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // onConflict sur la clé primaire (user_id, card_id) : relire une fiche
  // rafraîchit la date sans créer de doublon, et ne touche pas au score.
  await supabase
    .from('card_progress')
    .upsert(
      { user_id: user.id, domain_id: domainId, card_id: cardId, read_at: new Date().toISOString() },
      { onConflict: 'user_id,card_id' },
    );
}

/** Enregistre un score de quiz — on ne conserve que le meilleur. */
export async function saveQuizScore(
  domainId: string,
  cardId: string,
  correct: number,
  total: number,
): Promise<void> {
  if (!isSupabaseConfigured) return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: existing } = await supabase
    .from('card_progress')
    .select('quiz_correct')
    .eq('user_id', user.id)
    .eq('card_id', cardId)
    .maybeSingle();

  if (existing?.quiz_correct != null && existing.quiz_correct >= correct) return;

  await supabase.from('card_progress').upsert(
    {
      user_id: user.id,
      domain_id: domainId,
      card_id: cardId,
      quiz_correct: correct,
      quiz_total: total,
    },
    { onConflict: 'user_id,card_id' },
  );
}
