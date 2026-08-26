import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { IconCadenas, IconOui } from '@/components/icons';
import { PLANS } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Une partie du contenu est ouverte à tous et le restera. La formule Pro déverrouille le reste.',
};

const FAQ = [
  {
    q: 'Une fiche libre peut-elle devenir payante ?',
    r: "Non. Une fiche publiée comme libre le reste — c'est un engagement, pas une promotion de lancement.",
  },
  {
    q: 'Quand la formule Pro sera-t-elle disponible ?',
    r: "Quand le contenu la justifiera. Faire payer aujourd'hui reviendrait à vendre une promesse, et le montant n'est pas encore arrêté.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Container className="pt-32 pb-14 text-center sm:pt-40">
        <Reveal>
          <span className="chip">Pricing</span>
          <h1 className="headline mx-auto mt-7 max-w-[18ch] text-[clamp(2.5rem,6vw,4.25rem)]">
            Une partie ouverte à tous.{' '}
            <span className="headline-dim">Le reste, pour ceux qui suivent.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-3">
            Chaque domaine s&apos;ouvre sur des fiches libres, entièrement lisibles et
            jouables. La formule Pro déverrouille le reste et finance l&apos;écriture du
            suivant.
          </p>
        </Reveal>
      </Container>

      <Container className="pb-16">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {(['free', 'pro'] as const).map((cle, i) => {
            const p = PLANS[cle];
            const pro = cle === 'pro';
            return (
              <Reveal key={p.id} delay={i * 110}>
                <div
                  className={
                    'flex h-full flex-col rounded-md p-7 ' +
                    (pro
                      ? 'bg-white/[0.03] ring-1 ring-white/[0.08] ring-inset'
                      : 'card ring-white/[0.14]')
                  }
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="display text-[1.5rem]">{p.name}</h2>
                    <span className="text-[0.75rem] text-ink-3">{p.period}</span>
                  </div>
                  <p className="display mt-4 text-[2.5rem] leading-none">{p.price}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-3">{p.pitch}</p>

                  <ul className="mt-7 flex-1 space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        {pro ? (
                          <IconCadenas className="mt-1 size-4 shrink-0 text-gold" />
                        ) : (
                          <IconOui className="mt-1 size-4 shrink-0 text-yes" />
                        )}
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {pro ? (
                      <span className="block rounded-full px-5 py-3 text-center text-[0.8125rem] font-medium text-ink-4 ring-1 ring-white/10 ring-inset">
                        Pas encore disponible
                      </span>
                    ) : (
                      <ButtonLink href="/inscription" taille="lg" className="w-full">
                        Get started
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-10 max-w-4xl space-y-5">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-md bg-white/[0.03] p-6 ring-1 ring-white/[0.06] ring-inset">
                <p className="text-[0.9375rem] font-medium text-ink">{f.q}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-3">{f.r}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </>
  );
}
