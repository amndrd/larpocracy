import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';

export const metadata: Metadata = { title: 'Entrer' };

export default function ConnexionPage() {
  return (
    <Container narrow className="py-28 text-center">
      <p className="eyebrow">Comptes</p>
      <h1 className="display mt-4 text-[clamp(2rem,4.5vw,3rem)]">Bientôt.</h1>
      <p className="mx-auto mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-2">
        Les comptes arrivent : ils serviront à retenir où vous en êtes, domaine par
        domaine. En attendant, tout le contenu est en accès libre.
      </p>
      <Link
        href="/domaines"
        className="mt-10 inline-block border border-ink px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
      >
        Explorer les domaines
      </Link>
    </Container>
  );
}
