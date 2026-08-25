import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import { search } from '@/lib/content';

export const metadata: Metadata = { title: 'Recherche' };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function RecherchePage({ searchParams }: Props) {
  const q = (await searchParams).q ?? '';
  const hits = q ? search(q, 60) : [];

  return (
    <Container narrow className="py-16">
      <p className="eyebrow">Recherche</p>
      <h1 className="display mt-4 text-[clamp(2rem,4.5vw,3rem)]">
        {q ? `« ${q} »` : 'Chercher'}
      </h1>
      <p className="mt-4 text-[0.9375rem] text-ink-2">
        {q
          ? `${hits.length} résultat${hits.length > 1 ? 's' : ''}.`
          : 'Tapez au moins deux caractères dans le champ de recherche.'}
      </p>

      {hits.length > 0 && (
        <ul className="mt-10 border-t border-rule">
          {hits.map((h, i) => (
            <li key={`${h.kind}-${h.label}-${i}`}>
              <Link
                href={h.href}
                className="group grid items-baseline gap-x-5 gap-y-1 border-b border-rule-soft py-5 transition-colors hover:bg-paper-2 sm:grid-cols-[6rem_1fr]"
              >
                <span className="eyebrow">{h.kind}</span>
                <span>
                  <span className="display block text-[1.1875rem] transition-colors group-hover:text-accent">
                    {h.label}
                  </span>
                  <span className="mt-1 block text-[0.875rem] text-ink-3">{h.sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {q && hits.length === 0 && (
        <div className="mt-10 border border-dashed border-rule px-8 py-14 text-center">
          <p className="display text-[1.375rem]">Rien pour l&apos;instant.</p>
          <p className="mx-auto mt-3 max-w-[42ch] text-[0.9375rem] text-ink-2">
            Le sujet est peut-être cartographié dans l&apos;atlas mais pas encore rédigé.
          </p>
        </div>
      )}
    </Container>
  );
}
