import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import { LEVELS, domains, getCards, getDomain } from '@/lib/content';

type Props = { params: Promise<{ domaine: string }> };

export function generateStaticParams() {
  return domains.map((d) => ({ domaine: d.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDomain((await params).domaine);
  if (!d) return {};
  return { title: d.title, description: d.blurb };
}

export default async function DomainPage({ params }: Props) {
  const { domaine } = await params;
  const d = getDomain(domaine);
  if (!d) notFound();

  const cards = getCards(d.id);

  return (
    <Container className="py-16">
      <nav className="eyebrow">
        <Link href="/domaines" className="transition-colors hover:text-accent">
          Domaines
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{d.title}</span>
      </nav>

      <header className="mt-8 grid gap-8 border-b border-rule pb-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <h1 className="display text-[clamp(2.25rem,5vw,3.5rem)]">{d.title}</h1>
          <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-2">
            {d.blurb}
          </p>
        </div>
        <div className="flex gap-8 self-end md:col-span-4 md:justify-end">
          <div>
            <div className="display text-[2rem] leading-none">{d.topics}</div>
            <div className="eyebrow mt-1.5">Sujets</div>
          </div>
          <div>
            <div className="display text-[2rem] leading-none">{cards.length}</div>
            <div className="eyebrow mt-1.5">Fiches</div>
          </div>
        </div>
      </header>

      {cards.length > 0 ? (
        <ol className="mt-4">
          {cards.map((c, i) => (
            <li key={c.id}>
              <Link
                href={`/f/${d.id}/${c.id}`}
                className="group grid items-baseline gap-x-6 gap-y-2 border-b border-rule-soft py-7 transition-colors hover:bg-paper-2 md:grid-cols-12"
              >
                <span className="font-mono text-[0.6875rem] text-ink-3 md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="md:col-span-8">
                  <h2 className="display text-[1.5rem] transition-colors group-hover:text-accent">
                    {c.title}
                  </h2>
                  <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">
                    {c.summary}
                  </p>
                </div>
                <div className="eyebrow md:col-span-3 md:text-right">
                  {LEVELS[c.level]} · {c.minutes ?? 5} min
                </div>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-12 border border-dashed border-rule px-8 py-16 text-center">
          <p className="display text-[1.5rem]">Ce domaine attend son tour.</p>
          <p className="mx-auto mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-2">
            Ses {d.topics} sujets sont déjà découpés dans l&apos;atlas. Les domaines se
            remplissent par fréquence d&apos;usage réel, pas par ordre alphabétique.
          </p>
          <Link href="/domaines" className="link hover:link-hover mt-6 inline-block text-[0.875rem]">
            Retour aux domaines
          </Link>
        </div>
      )}
    </Container>
  );
}
