import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Rafraîchit le jeton de session à chaque requête et réécrit les cookies.
 * Sans cette couche, les sessions expirent de façon erratique — c'est le point
 * explicitement signalé par la documentation de @supabase/ssr.
 *
 * Next 16 a renommé la convention `middleware` en `proxy` : fichier proxy.ts,
 * fonction exportée `proxy`.
 */
export async function proxy(request: NextRequest) {
  if (!isSupabaseConfigured) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Appel volontairement placé avant toute génération de réponse : un refresh
  // qui arriverait après serait perdu.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const chemin = request.nextUrl.pathname;

  // L'application exige une session. La vitrine, jamais.
  if (!user && chemin.startsWith('/app')) {
    const url = request.nextUrl.clone();
    url.pathname = '/connexion';
    url.searchParams.set('suite', chemin);
    return NextResponse.redirect(url);
  }

  // Un compte déjà connecté ne revoit pas la page de vente : il entre.
  // C'est ici et pas dans la page, sinon l'accueil basculerait en rendu
  // dynamique et perdrait son prérendu.
  if (user && chemin === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/app';
    return NextResponse.redirect(url);
  }

  // Les réponses d'auth portent des Set-Cookie : elles ne doivent jamais
  // être mises en cache par le CDN.
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = {
  matcher: [
    /*
     * Toutes les routes sauf les fichiers statiques et les images —
     * inutile de faire tourner l'auth sur un .svg.
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
