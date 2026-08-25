import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import { PLANS } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Formules',
  description: 'Tout le contenu publié est en accès libre. La formule Pro viendra plus tard.',
};

export default function TarifsPage() {
  return (
    <Container className="py-16">
      <header className="max-w-[52ch]">
        <p className="eyebrow">Formules</p>
        <h1 className="display mt-4 text-[clamp(2.25rem,5vw,3.25rem)]">
          Pour l&apos;instant, tout est ouvert.
        </h1>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">
          Le site est en construction : 5 fiches publiées sur 673 sujets cartographiés.
          Faire payer maintenant serait vendre une promesse. La formule Pro s&apos;activera
          quand le contenu la justifiera — et elle n&apos;enlèvera rien à ce qui est déjà
          gratuit.
        </p>
      </header>

      <div className="mt-14 grid gap-px border border-rule bg-rule md:grid-cols-2">
        {(['free', 'pro'] as const).map((key) => {
          const p = PLANS[key];
          const isPro = key === 'pro';
          return (
            <div key={p.id} className="flex flex-col bg-paper p-8">
              <div className="flex items-baseline justify-between">
                <h2 className="display text-[1.75rem]">{p.name}</h2>
                <span className="text-right">
                  <span className="display text-[1.75rem]">{p.price}</span>
                  {p.period && <span className="eyebrow ml-2">{p.period}</span>}
                </span>
              </div>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{p.pitch}</p>
              <ul className="mt-7 flex-1 space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className={isPro ? 'text-ink-3' : 'text-yes'}>—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {isPro ? (
                  <span className="block border border-dashed border-rule px-5 py-3 text-center text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-3">
                    Pas encore disponible
                  </span>
                ) : (
                  <Link
                    href="/inscription"
                    className="block border border-ink bg-ink px-5 py-3 text-center text-[0.75rem] font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:bg-transparent hover:text-ink"
                  >
                    Créer un compte
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 max-w-[60ch] text-[0.875rem] leading-relaxed text-ink-3">
        Aucune fiche déjà publiée ne passera un jour derrière un paiement. Ce qui est
        gratuit le reste — c&apos;est plus simple à tenir, et plus honnête à annoncer.
      </p>
    </Container>
  );
}
