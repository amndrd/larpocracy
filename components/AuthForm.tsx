'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { AuthState } from '@/app/auth/actions';

type Props = {
  mode: 'signin' | 'signup';
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  suite?: string;
};

export default function AuthForm({ mode, action, suite }: Props) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {});
  const isSignup = mode === 'signup';

  return (
    <form action={formAction} className="mt-10 space-y-5">
      {suite && <input type="hidden" name="suite" value={suite} />}

      {isSignup && (
        <Field
          label="Comment vous appeler"
          name="display_name"
          type="text"
          autoComplete="nickname"
          placeholder="Facultatif"
        />
      )}

      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="vous@exemple.com"
      />

      <Field
        label="Mot de passe"
        name="password"
        type="password"
        required
        autoComplete={isSignup ? 'new-password' : 'current-password'}
        hint={isSignup ? '8 caractères minimum' : undefined}
      />

      {state.error && (
        <p role="alert" className="border-l-2 border-no bg-no/5 px-4 py-3 text-[0.875rem] text-no">
          {state.error}
        </p>
      )}
      {state.notice && (
        <p role="status" className="border-l-2 border-yes bg-yes/5 px-4 py-3 text-[0.875rem] text-yes">
          {state.notice}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-ink bg-ink py-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-50"
      >
        {pending ? 'Un instant…' : isSignup ? 'Créer mon compte' : 'Entrer'}
      </button>

      <p className="pt-2 text-center text-[0.875rem] text-ink-2">
        {isSignup ? (
          <>
            Déjà un compte ?{' '}
            <Link href="/connexion" className="link hover:link-hover">
              Se connecter
            </Link>
          </>
        ) : (
          <>
            Pas encore de compte ?{' '}
            <Link href="/inscription" className="link hover:link-hover">
              En créer un
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border border-rule bg-transparent px-4 py-2.5 text-[0.9375rem] text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none"
      />
      {hint && <span className="mt-1.5 block text-[0.75rem] text-ink-3">{hint}</span>}
    </label>
  );
}
