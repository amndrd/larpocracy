'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { ProgressRow } from '@/lib/types';

/** Colonnes lues partout. Isolé pour n'avoir qu'un endroit à corriger. */
const COLONNES =
  'domain_id, card_id, read_at, quiz_correct, quiz_total, cards_known, cards_total';

async function utilisateur() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? { supabase, user } : null;
}

/**
 * Marque le jour courant comme actif. C'est ce qui alimente la série.
 * Silencieux si la table n'existe pas encore : l'ajout du schéma est
 * facultatif tant qu'il n'a pas été rejoué dans Supabase.
 */
async function marquerJour(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const jour = new Date().toISOString().slice(0, 10);
  await supabase
    .from('activity_days')
    .upsert({ user_id: userId, day: jour }, { onConflict: 'user_id,day' });
}

/** Toute la progression de l'utilisateur courant. Liste vide s'il n'est pas connecté. */
export async function getProgress(): Promise<ProgressRow[]> {
  const ctx = await utilisateur();
  if (!ctx) return [];

  const { data } = await ctx.supabase
    .from('card_progress')
    .select(COLONNES)
    .eq('user_id', ctx.user.id);

  return (data as ProgressRow[] | null) ?? [];
}

/** Les jours d'activité, du plus ancien au plus récent. */
export async function getActivityDays(): Promise<string[]> {
  const ctx = await utilisateur();
  if (!ctx) return [];

  const { data, error } = await ctx.supabase
    .from('activity_days')
    .select('day')
    .eq('user_id', ctx.user.id)
    .order('day', { ascending: true });

  // Table absente : la série vaut zéro, le reste du site fonctionne.
  if (error) return [];
  return (data ?? []).map((r) => r.day as string);
}

/** Marque une fiche comme lue. Sans effet si personne n'est connecté. */
export async function markRead(domainId: string, cardId: string): Promise<void> {
  const ctx = await utilisateur();
  if (!ctx) return;

  // onConflict sur la clé primaire (user_id, card_id) : relire une fiche
  // rafraîchit la date sans créer de doublon, et ne touche pas au score.
  await ctx.supabase
    .from('card_progress')
    .upsert(
      {
        user_id: ctx.user.id,
        domain_id: domainId,
        card_id: cardId,
        read_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,card_id' },
    );

  await marquerJour(ctx.supabase, ctx.user.id);
}

/** Enregistre un score de quiz — on ne conserve que le meilleur. */
export async function saveQuizScore(
  domainId: string,
  cardId: string,
  correct: number,
  total: number,
): Promise<void> {
  const ctx = await utilisateur();
  if (!ctx) return;

  const { data: existing } = await ctx.supabase
    .from('card_progress')
    .select('quiz_correct')
    .eq('user_id', ctx.user.id)
    .eq('card_id', cardId)
    .maybeSingle();

  await marquerJour(ctx.supabase, ctx.user.id);
  if (existing?.quiz_correct != null && existing.quiz_correct >= correct) return;

  await ctx.supabase.from('card_progress').upsert(
    {
      user_id: ctx.user.id,
      domain_id: domainId,
      card_id: cardId,
      quiz_correct: correct,
      quiz_total: total,
    },
    { onConflict: 'user_id,card_id' },
  );
}

/**
 * Enregistre un passage du mode Cartes — là aussi, seul le meilleur compte.
 * Rejouer un paquet ne peut donc jamais faire baisser le score.
 */
export async function saveCardsScore(
  domainId: string,
  cardId: string,
  known: number,
  total: number,
): Promise<void> {
  const ctx = await utilisateur();
  if (!ctx) return;

  const { data: existing } = await ctx.supabase
    .from('card_progress')
    .select('cards_known')
    .eq('user_id', ctx.user.id)
    .eq('card_id', cardId)
    .maybeSingle();

  await marquerJour(ctx.supabase, ctx.user.id);
  if (existing?.cards_known != null && existing.cards_known >= known) return;

  await ctx.supabase.from('card_progress').upsert(
    {
      user_id: ctx.user.id,
      domain_id: domainId,
      card_id: cardId,
      cards_known: known,
      cards_total: total,
    },
    { onConflict: 'user_id,card_id' },
  );
}
