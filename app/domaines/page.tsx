import type { Metadata } from 'next';
import Container from '@/components/Container';
import DomainGrid from '@/components/DomainGrid';
import { ButtonLink } from '@/components/Button';
import { domains, stats } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Les domaines',
  description: `${stats.topics} sujets cartographiés sur ${stats.domains} domaines.`,
};

export default function DomainesPage() {
  const vide = domains.length === 0;

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-[52ch]">
        <p className="eyebrow">Catalogue</p>
        <h1 className="headline mt-3 text-[clamp(2.5rem,5.5vw,3.75rem)]">
          {vide ? 'Le contenu' : `Les ${stats.domains} domaines`}
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
          {vide ? (
            'Rien n’est encore publié. Les domaines et leurs fiches arrivent un par un.'
          ) : (
            <>
              {stats.topics} sujets cartographiés, {stats.cards} fiches publiées à ce jour. Les
              domaines sans fiche sont déjà découpés dans{' '}
              <a
                href="https://github.com/amndrd/larpocracy/blob/main/docs/TOPICS.md"
                className="link hover:link-hover"
              >
                l&apos;atlas
              </a>{' '}
              — ils attendent leur tour.
            </>
          )}
        </p>
      </header>

      <div className="mt-10">
        {vide ? (
          <div className="card animate-pop px-8 py-20 text-center">
            <p className="headline text-[1.75rem]">Rien à afficher pour l’instant.</p>
            <p className="mx-auto mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-2">
              Le catalogue se construit domaine par domaine. En attendant, le manifeste dit
              ce que ce site fera, exactement.
            </p>
            <ButtonLink href="/manifeste" variante="secondaire" className="mt-7">
              Lire le manifeste
            </ButtonLink>
          </div>
        ) : (
          <DomainGrid list={domains} />
        )}
      </div>
    </Container>
  );
}
