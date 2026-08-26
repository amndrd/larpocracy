import Link from 'next/link';
import Container from './Container';
import { stats } from '@/lib/content';

const LIENS = [
  { href: '/domaines', label: 'Domaines' },
  { href: '/manifeste', label: 'Manifeste' },
  { href: '/tarifs', label: 'Formules' },
  { href: '/credits', label: 'Crédits visuels' },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-canvas-2">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-[1.375rem] italic">
            Apprends pour de vrai. C&apos;est moins cher que de faire semblant.
          </p>
          <p className="mt-3 text-[0.8125rem] text-ink-3">
            {stats.cards} fiche{stats.cards > 1 ? 's' : ''} · {stats.domains} domaines ·{' '}
            {stats.topics} sujets cartographiés
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-ink-3">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/amndrd/larpocracy"
            className="transition-colors hover:text-ink"
          >
            Code source
          </a>
        </nav>
      </Container>
    </footer>
  );
}
