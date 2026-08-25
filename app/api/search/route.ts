import { NextResponse } from 'next/server';
import { search } from '@/lib/content';

/**
 * La réponse dépend de la chaîne de requête : la route doit rester dynamique.
 * (`force-static` ferait retourner des valeurs vides aux API de requête, et
 * l'endpoint répondrait toujours `{"hits":[]}`.)
 */
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q') ?? '';
  return NextResponse.json({ hits: search(q, 8) });
}
