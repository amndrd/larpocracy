import Link from 'next/link';
import Container from './Container';
import Logo from './Logo';
import { stats } from '@/lib/content';

const LIENS = [
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/news', label: 'News' },
  { href: '/app', label: 'Contenu' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-5 max-w-[34ch] text-[1rem] italic leading-snug text-ink-2">
            Apprends pour de vrai. C&apos;est moins cher que de faire semblant.
          </p>
          <p className="mt-3 text-[0.8125rem] text-ink-4">
            {stats.cards > 0
              ? `${stats.cards} fiche${stats.cards > 1 ? 's' : ''} · ${stats.domains} domaines · ${stats.topics} sujets cartographiés`
              : 'Le contenu arrive.'}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-ink-3">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors duration-[400ms] ease-[var(--ease-fora)] hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/amndrd/larpocracy"
            className="transition-colors duration-[400ms] ease-[var(--ease-fora)] hover:text-ink"
          >
            Code source
          </a>
        </nav>
      </Container>
    </footer>
  );
}
