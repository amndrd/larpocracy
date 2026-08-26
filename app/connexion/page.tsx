import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Container from '@/components/Container';
import { signIn } from '@/app/auth/actions';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { getUser } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'Entrer' };

type Props = { searchParams: Promise<{ suite?: string; erreur?: string }> };

export default async function ConnexionPage({ searchParams }: Props) {
  const { suite, erreur } = await searchParams;

  if (isSupabaseConfigured && (await getUser())) redirect('/compte');

  return (
    <Container narrow className="py-16">
      <div className="card animate-fade-up mx-auto max-w-[26rem] p-7 sm:p-9">
        <p className="eyebrow">Votre compte</p>
        <h1 className="display mt-3 text-[2.25rem]">Entrer</h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
          Un compte sert à retenir où vous en êtes, domaine par domaine. Le contenu, lui,
          reste en accès libre.
        </p>

        {erreur === 'lien' && (
          <p role="alert" className="mt-6 rounded-md border-l-[3px] border-no bg-no-2 px-4 py-3 text-[0.875rem] text-no">
            Ce lien de confirmation est expiré ou déjà utilisé. Reconnectez-vous.
          </p>
        )}

        {isSupabaseConfigured ? (
          <AuthForm mode="signin" action={signIn} suite={suite} />
        ) : (
          <p className="mt-8 rounded-md border border-dashed border-line px-5 py-6 text-[0.9375rem] text-ink-2">
            Les comptes ne sont pas encore branchés sur cette installation. Tout le
            contenu est accessible sans connexion.
          </p>
        )}
      </div>
    </Container>
  );
}
