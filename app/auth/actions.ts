'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export type AuthState = { error?: string; notice?: string };

/** Un chemin de redirection n'est accepté que s'il est interne au site. */
function safeNext(raw: FormDataEntryValue | null): string {
  const v = typeof raw === 'string' ? raw : '';
  return v.startsWith('/') && !v.startsWith('//') ? v : '/compte';
}

function readCredentials(formData: FormData) {
  return {
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    password: String(formData.get('password') ?? ''),
  };
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: "L'authentification n'est pas encore configurée." };

  const { email, password } = readCredentials(formData);
  if (!email || !password) return { error: 'Renseignez votre email et votre mot de passe.' };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Message volontairement identique pour un email inconnu et un mot de passe
    // faux : distinguer les deux révélerait quels emails ont un compte.
    return { error: 'Email ou mot de passe incorrect.' };
  }

  revalidatePath('/', 'layout');
  redirect(safeNext(formData.get('suite')));
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: "L'authentification n'est pas encore configurée." };

  const { email, password } = readCredentials(formData);
  const displayName = String(formData.get('display_name') ?? '').trim();

  if (!email || !password) return { error: 'Renseignez votre email et un mot de passe.' };
  if (password.length < 8) return { error: 'Le mot de passe doit faire au moins 8 caractères.' };

  const origin = (await headers()).get('origin') ?? '';
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || email.split('@')[0] },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) return { error: error.message };

  // Session immédiate : la confirmation par email est désactivée côté projet.
  if (data.session) {
    revalidatePath('/', 'layout');
    redirect('/compte');
  }

  return {
    notice:
      'Compte créé. Vérifiez votre boîte mail : un lien de confirmation vous attend.',
  };
}

export async function signOut() {
  if (!isSupabaseConfigured) redirect('/');
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
