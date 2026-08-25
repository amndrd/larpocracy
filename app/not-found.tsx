import Link from 'next/link';
import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container narrow className="py-32 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="display mt-4 text-[clamp(2rem,5vw,3rem)]">
        Cette page n&apos;existe pas.
      </h1>
      <p className="mt-4 text-[1.0625rem] text-ink-2">
        Ce qui, socialement, est toujours rattrapable.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block border border-ink px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
      >
        Retour à l&apos;accueil
      </Link>
    </Container>
  );
}
