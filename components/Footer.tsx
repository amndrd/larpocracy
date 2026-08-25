import Link from 'next/link';
import Container from './Container';
import { stats } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule py-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-[1.25rem] italic text-ink">
            Apprends pour de vrai. C&apos;est moins cher que de faire semblant.
          </p>
          <p className="mt-2 text-[0.8125rem] text-ink-3">
            {stats.cards} fiche{stats.cards > 1 ? 's' : ''} · {stats.domains} domaines ·{' '}
            {stats.topics} sujets cartographiés
          </p>
        </div>
        <nav className="flex gap-5 text-[0.8125rem] text-ink-3">
          <Link href="/domaines" className="transition-colors hover:text-accent">
            Domaines
          </Link>
          <Link href="/manifeste" className="transition-colors hover:text-accent">
            Manifeste
          </Link>
          <Link href="/tarifs" className="transition-colors hover:text-accent">
            Formules
          </Link>
          <a
            href="https://github.com/amndrd/larpocracy"
            className="transition-colors hover:text-accent"
          >
            Code source
          </a>
        </nav>
      </Container>
    </footer>
  );
}
