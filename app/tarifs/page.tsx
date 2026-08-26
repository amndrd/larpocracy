import type { Metadata } from 'next';
import Container from '@/components/Container';
import Badge from '@/components/Badge';
import { ButtonLink } from '@/components/Button';
import { IconOui } from '@/components/icons';
import { PLANS } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Formules',
  description: 'Tout le contenu publié est en accès libre. La formule Pro viendra plus tard.',
};

export default function TarifsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-[54ch]">
        <p className="eyebrow">Formules</p>
        <h1 className="headline mt-3 text-[clamp(2.5rem,5.5vw,3.75rem)]">
          Pour l&apos;instant, tout est ouvert.
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
          Le site est en construction : 5 fiches publiées sur 673 sujets cartographiés. Faire
          payer maintenant serait vendre une promesse. La formule Pro s&apos;activera quand le
          contenu la justifiera — et elle n&apos;enlèvera rien à ce qui est déjà gratuit.
        </p>
      </header>

      <div className="mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {(['free', 'pro'] as const).map((key, i) => {
          const p = PLANS[key];
          const isPro = key === 'pro';
          return (
            <div
              key={p.id}
              style={{ animationDelay: `${i * 80}ms` }}
              className={
                'card animate-fade-up flex flex-col p-7 ' +
                (isPro ? 'border-dashed' : 'border-accent/35')
              }
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="display text-[1.75rem]">{p.name}</h2>
                {isPro ? (
                  <Badge ton="or">{p.period}</Badge>
                ) : (
                  <Badge ton="oui">Disponible</Badge>
                )}
              </div>

              <p className="display mt-3 text-[2.5rem] leading-none">{p.price}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{p.pitch}</p>

              <ul className="mt-6 flex-1 space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <IconOui
                      className={'mt-1 size-4 shrink-0 ' + (isPro ? 'text-ink-3' : 'text-yes')}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                {isPro ? (
                  <span className="block rounded-full border border-dashed border-line px-5 py-3 text-center text-[0.8125rem] font-semibold text-ink-3">
                    Pas encore disponible
                  </span>
                ) : (
                  <ButtonLink href="/inscription" taille="lg" className="w-full">
                    Créer un compte
                  </ButtonLink>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 max-w-[62ch] text-[0.875rem] leading-relaxed text-ink-3">
        Aucune fiche déjà publiée ne passera un jour derrière un paiement. Ce qui est gratuit le
        reste — c&apos;est plus simple à tenir, et plus honnête à annoncer.
      </p>
    </Container>
  );
}
