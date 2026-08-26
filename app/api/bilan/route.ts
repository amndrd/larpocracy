import { NextResponse } from 'next/server';
import { bilan } from '@/lib/stats';
import { getActivityDays, getProgress } from '@/lib/progress';

/**
 * Les compteurs affichés dans l'en-tête.
 * Route dynamique : elle lit la session dans les cookies. Surtout ne pas
 * y ajouter `dynamic = 'force-static'` (voir les pièges du projet).
 */
export async function GET() {
  const [progress, jours] = await Promise.all([getProgress(), getActivityDays()]);
  const b = bilan(progress, jours);
  return NextResponse.json(
    { xp: b.xp, serie: b.serie, rang: b.rang.actuel.nom, fiches: b.fiches },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
