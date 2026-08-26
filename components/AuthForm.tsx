'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { Button } from './Button';
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
    <form action={formAction} className="mt-8 space-y-5">
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
        <p
          role="alert"
          className="animate-shake rounded-md border-l-[3px] border-no bg-no-2 px-4 py-3 text-[0.875rem] text-no"
        >
          {state.error}
        </p>
      )}
      {state.notice && (
        <p
          role="status"
          className="animate-pop rounded-md border-l-[3px] border-yes bg-yes-2 px-4 py-3 text-[0.875rem] text-yes"
        >
          {state.notice}
        </p>
      )}

      <Button type="submit" disabled={pending} taille="lg" className="w-full">
        {pending ? 'Un instant…' : isSignup ? 'Créer mon compte' : 'Entrer'}
      </Button>

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
        className="mt-2 h-11 w-full rounded-md border border-line bg-canvas-2 px-4 text-[0.9375rem] text-ink transition-all duration-200 placeholder:text-ink-3 focus:border-accent/50 focus:bg-surface-2 focus:shadow-[var(--shadow-ring)] focus:outline-none"
      />
      {hint && <span className="mt-1.5 block text-[0.75rem] text-ink-3">{hint}</span>}
    </label>
  );
}
