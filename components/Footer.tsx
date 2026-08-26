import Link from 'next/link';
import Container from './Container';
import { stats } from '@/lib/content';

const LIENS = [
  { href: '/domaines', label: 'Contenu' },
  { href: '/manifeste', label: 'Manifeste' },
  { href: '/tarifs', label: 'Tarifs' },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-[1.375rem] italic">
            Apprends pour de vrai. C&apos;est moins cher que de faire semblant.
          </p>
          <p className="mt-3 text-[0.8125rem] text-ink-3">
            {stats.cards > 0
              ? `${stats.cards} fiche${stats.cards > 1 ? 's' : ''} · ${stats.domains} domaines · ${stats.topics} sujets cartographiés`
              : 'Le contenu arrive.'}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-ink-3">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-accent">
              {l.label}
            </Link>
          ))}
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
