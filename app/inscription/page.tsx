import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Container from '@/components/Container';
import { signUp } from '@/app/auth/actions';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { getUser } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'Créer un compte' };

export default async function InscriptionPage() {
  if (isSupabaseConfigured && (await getUser())) redirect('/compte');

  return (
    <Container narrow className="py-20">
      <div className="mx-auto max-w-[24rem]">
        <p className="eyebrow">Votre compte</p>
        <h1 className="display mt-4 text-[2.5rem]">Créer un compte</h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
          Gratuit. Pas de carte bancaire, pas de vérification d&apos;identité — le
          contraire de ce que le site enseigne par ailleurs.
        </p>

        {isSupabaseConfigured ? (
          <AuthForm mode="signup" action={signUp} />
        ) : (
          <p className="mt-8 border border-dashed border-rule px-5 py-6 text-[0.9375rem] text-ink-2">
            Les comptes ne sont pas encore branchés sur cette installation.
          </p>
        )}
      </div>
    </Container>
  );
}
