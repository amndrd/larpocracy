import { redirect } from 'next/navigation';
import AppShell, { type EntreeDomaine, type ResumeCompte } from '@/components/app/AppShell';
import { domains, getCards } from '@/lib/content';
import { getActivityDays, getProgress } from '@/lib/progress';
import { bilan } from '@/lib/stats';
import { themeOf } from '@/lib/theme';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * L'application exige une session. Les pages qu'elle contient sont donc
 * rendues à la demande, et non prérendues : c'est voulu, puisqu'un contenu
 * verrouillé ne doit jamais partir dans le HTML d'un visiteur qui n'y a pas
 * droit. Seule la vitrine reste statique.
 */
export const dynamic = 'force-dynamic';

/** Sans clés Supabase, on ouvre tout et on l'annonce — sinon le site serait mort. */
const DEMO: ResumeCompte = {
  email: '',
  nom: 'Invité',
  plan: 'pro',
  xp: 0,
  serie: 0,
  rang: 'Invité',
  part: 0,
  suivant: 'Habitué',
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let compte = DEMO;
  const demo = !isSupabaseConfigured;

  if (!demo) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect('/connexion?suite=/app');

    const [{ data: profile }, progress, jours] = await Promise.all([
      supabase.from('profiles').select('display_name, plan').eq('id', user.id).maybeSingle(),
      getProgress(),
      getActivityDays(),
    ]);

    const b = bilan(progress, jours);
    compte = {
      email: user.email ?? '',
      nom: profile?.display_name || user.email?.split('@')[0] || 'vous',
      plan: (profile?.plan as 'free' | 'pro') ?? 'free',
      xp: b.xp,
      serie: b.serie,
      rang: b.rang.actuel.nom,
      part: b.rang.part,
      suivant: b.rang.suivant?.nom ?? null,
    };
  }

  const lues = demo ? new Set<string>() : new Set((await getProgress()).map((p) => p.card_id));

  const entrees: EntreeDomaine[] = domains.map((d) => {
    const cards = getCards(d.id);
    return {
      id: d.id,
      title: d.title,
      n: d.n,
      total: cards.length,
      lues: cards.filter((c) => lues.has(c.id)).length,
      hue: themeOf(d.id).hue,
    };
  });

  return (
    <AppShell domaines={entrees} compte={compte} demo={demo}>
      {children}
    </AppShell>
  );
}
