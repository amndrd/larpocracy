import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/** Cible du lien de confirmation envoyé par email. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  if (!isSupabaseConfigured || !token_hash || !type) {
    return NextResponse.redirect(`${origin}/connexion?erreur=lien`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash });

  return NextResponse.redirect(
    error ? `${origin}/connexion?erreur=lien` : `${origin}/compte`,
  );
}
