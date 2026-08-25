import Link from 'next/link';
import Container from './Container';
import SearchBox from './SearchBox';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className="group flex shrink-0 items-baseline gap-2.5">
          <span className="display text-[1.35rem] leading-none tracking-tight">
            Larpocracy
          </span>
          <span className="hidden text-[0.6875rem] italic text-ink-3 sm:inline">
            l&apos;art de tenir la salle
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <SearchBox />
          <nav className="hidden items-center gap-6 text-[0.8125rem] md:flex">
            <Link href="/domaines" className="text-ink-2 transition-colors hover:text-accent">
              Domaines
            </Link>
            <Link href="/manifeste" className="text-ink-2 transition-colors hover:text-accent">
              Manifeste
            </Link>
            <Link
              href="/connexion"
              className="border border-ink px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
            >
              Entrer
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
