import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import FicheCard from '@/components/FicheCard';
import { ButtonLink } from '@/components/Button';
import { IconChevron } from '@/components/icons';
import { getCards, getDomain } from '@/lib/content';
import { getSession } from '@/lib/session';
import { domainVars } from '@/lib/theme';
import { imageOfDomain } from '@/lib/images';

type Props = { params: Promise<{ domaine: string }> };

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
  const { plan } = await getSession();
  const image = imageOfDomain(d);

  return (
    <div style={domainVars(d.id)}>
      <Container className="py-6 sm:py-8">
        <nav className="mb-5 flex items-center gap-1.5 text-[0.8125rem] text-ink-3">
          <Link href="/app" className="transition-colors hover:text-ink">
            Tableau de bord
          </Link>
          <IconChevron className="size-3.5" />
          <span className="text-ink-2">{d.title}</span>
        </nav>

        {/* Bandeau du domaine */}
        <header className="animate-fade-up relative overflow-hidden rounded-2xl shadow-md">
          {image && (
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          )}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: image
                ? 'linear-gradient(100deg, rgba(13,11,10,.86) 0%, rgba(13,11,10,.66) 48%, rgba(13,11,10,.40) 100%)'
                : 'linear-gradient(120deg, var(--dom) 0%, color-mix(in srgb, var(--dom) 62%, #1d1d1f) 100%)',
            }}
          />
          <div className="relative px-6 py-12 sm:px-10 sm:py-14">
            <p className="eyebrow text-white/55">Domaine {String(d.n).padStart(2, '0')}</p>
            <h1 className="headline mt-3 text-[clamp(2.25rem,5.5vw,3.5rem)] text-white">{d.title}</h1>
            <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-white/75">{d.blurb}</p>

            <div className="mt-8 flex flex-wrap gap-8 border-t border-white/15 pt-6">
              <div>
                <div className="display text-[1.75rem] leading-none text-white">{d.topics}</div>
                <div className="eyebrow mt-1.5 text-white/50">Sujets</div>
              </div>
              <div>
                <div className="display text-[1.75rem] leading-none text-white">{cards.length}</div>
                <div className="eyebrow mt-1.5 text-white/50">Fiches</div>
              </div>
            </div>
          </div>
        </header>
      </Container>

      <Container className="pb-16">
        {cards.length > 0 ? (
          <>
            <h2 className="eyebrow mb-4">Les fiches</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((c, i) => (
                <FicheCard key={c.id} card={c} domainId={d.id} index={i} plan={plan} />
              ))}
            </div>
          </>
        ) : (
          <div className="card animate-pop px-8 py-16 text-center">
            <p className="headline text-[1.75rem]">Ce domaine attend son tour.</p>
            <p className="mx-auto mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-2">
              Ses {d.topics} sujets sont déjà découpés dans l&apos;atlas. Les domaines se
              remplissent par fréquence d&apos;usage réel, pas par ordre alphabétique.
            </p>
            <ButtonLink href="/app" variante="secondaire" className="mt-7">
              Voir les domaines ouverts
            </ButtonLink>
          </div>
        )}
      </Container>
    </div>
  );
}
