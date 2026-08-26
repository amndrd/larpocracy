import type { Metadata } from 'next';
import Container from '@/components/Container';
import DomainGrid from '@/components/DomainGrid';
import { domains, stats } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Les domaines',
  description: `${stats.topics} sujets cartographiés sur ${stats.domains} domaines.`,
};

export default function DomainesPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-[52ch]">
        <p className="eyebrow">Catalogue</p>
        <h1 className="headline mt-3 text-[clamp(2.5rem,5.5vw,3.75rem)]">
          Les {stats.domains} domaines
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
          {stats.topics} sujets cartographiés, {stats.cards} fiches publiées à ce jour. Les
          domaines sans fiche sont déjà découpés dans{' '}
          <a
            href="https://github.com/amndrd/larpocracy/blob/main/docs/TOPICS.md"
            className="link hover:link-hover"
          >
            l&apos;atlas
          </a>{' '}
          — ils attendent leur tour.
        </p>
      </header>
      <div className="mt-10">
        <DomainGrid list={domains} />
      </div>
    </Container>
  );
}
