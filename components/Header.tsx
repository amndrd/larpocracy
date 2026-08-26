import Link from 'next/link';
import Container from './Container';
import AccountNav from './AccountNav';
import SearchBox from './SearchBox';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-4 sm:gap-6">
        <Link href="/" className="flex shrink-0 items-baseline gap-2.5">
          <span className="display text-[1.4rem] leading-none tracking-tight">Larpocracy</span>
          <span className="hidden text-[0.6875rem] italic text-ink-3 lg:inline">
            l&apos;art de tenir la salle
          </span>
        </Link>

        <div className="ml-auto flex min-w-0 flex-1 justify-end sm:ml-4 sm:justify-center">
          <SearchBox />
        </div>

        <nav className="flex shrink-0 items-center gap-1">
          <Link
            href="/domaines"
            className="hidden rounded-full px-3.5 py-2 text-[0.875rem] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink md:block"
          >
            Domaines
          </Link>
          <Link
            href="/manifeste"
            className="hidden rounded-full px-3.5 py-2 text-[0.875rem] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink lg:block"
          >
            Manifeste
          </Link>
          <AccountNav />
        </nav>
      </Container>
    </header>
  );
}
