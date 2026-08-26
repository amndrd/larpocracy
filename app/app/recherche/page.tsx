import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import { IconFleche } from '@/components/icons';
import { search } from '@/lib/content';
import { getSession } from '@/lib/session';
import type { SearchHit } from '@/lib/content';

export const metadata: Metadata = { title: 'Recherche' };

const TONS: Record<SearchHit['kind'], string> = {
  fiche: 'bg-accent-3 text-accent-ink',
  terme: 'bg-surface-2 text-ink-2',
  nom: 'bg-gold-2 text-gold',
  domaine: 'bg-yes-2 text-yes',
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function RecherchePage({ searchParams }: Props) {
  const q = (await searchParams).q ?? '';
  const { plan } = await getSession();
  const hits = q ? search(q, 60, plan) : [];

  return (
    <Container narrow className="py-12 sm:py-16">
      <span className="chip">Recherche</span>
      <h1 className="headline mt-3 text-[clamp(2rem,4vw,2.75rem)]">
        {q ? `« ${q} »` : 'Chercher'}
      </h1>
      <p className="mt-3 text-[0.9375rem] text-ink-2">
        {q
          ? `${hits.length} résultat${hits.length > 1 ? 's' : ''}.`
          : 'Tapez au moins deux caractères dans le champ de recherche.'}
      </p>

      {hits.length > 0 && (
        <ul className="mt-8 space-y-2.5">
          {hits.map((h, i) => (
            <li key={`${h.kind}-${h.label}-${i}`}>
              <Link
                href={h.href}
                style={{ animationDelay: `${Math.min(i, 10) * 35}ms` }}
                className="card card-lift group animate-fade-up flex items-center gap-4 p-4 hover:card-lift-on"
              >
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${TONS[h.kind]}`}
                >
                  {h.kind}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="display block text-[1.125rem] transition-colors group-hover:text-accent-ink">
                    {h.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-3">{h.sub}</span>
                </span>
                <IconFleche className="size-4 shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {q && hits.length === 0 && (
        <div className="card animate-pop mt-8 px-8 py-14 text-center">
          <p className="headline text-[1.625rem]">Rien pour l&apos;instant.</p>
          <p className="mx-auto mt-3 max-w-[44ch] text-[0.9375rem] text-ink-2">
            Le sujet est peut-être cartographié dans l&apos;atlas mais pas encore rédigé.
          </p>
        </div>
      )}
    </Container>
  );
}
