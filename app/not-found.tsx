import Container from '@/components/Container';
import { ButtonLink } from '@/components/Button';

export default function NotFound() {
  return (
    <Container narrow className="py-20">
      <div className="card animate-pop px-8 py-20 text-center">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="headline mt-4 text-[clamp(2.25rem,5vw,3.25rem)]">Cette page n&apos;existe pas.</h1>
        <p className="mt-4 text-[1.0625rem] text-ink-2">
          Ce qui, socialement, est toujours rattrapable.
        </p>
        <ButtonLink href="/" taille="lg" className="mt-9">
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
    </Container>
  );
}
