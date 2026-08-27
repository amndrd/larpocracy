import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { IconFleche } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact us',
  description: "Écrire à LarpLvl : questions, corrections de contenu, propositions.",
};

/**
 * L'adresse de contact.
 *
 * Elle vaut `null` tant qu'elle n'est pas arrêtée, et le bloc « Écrire »
 * ne s'affiche pas : mieux vaut une page sans e-mail qu'un lien mort ou une
 * adresse personnelle publiée sans qu'on l'ait décidé. Une seule ligne à
 * changer le jour venu.
 */
const EMAIL: string | null = null;

const RAISONS = [
  {
    n: '01',
    titre: 'Une erreur dans une fiche',
    texte:
      "C'est le message le plus utile qu'on puisse recevoir. Le site promet des faits vérifiables : une correction sourcée passe avant tout le reste.",
  },
  {
    n: '02',
    titre: 'Un sujet qui manque',
    texte:
      "Les quatorze domaines sont une carte, pas une limite. Si une pièce dans laquelle vous entrez a des codes qu'aucune fiche ne couvre, dites-le.",
  },
  {
    n: '03',
    titre: 'Un partenariat, une question',
    texte:
      "Écoles, entreprises, médias : le site est jeune et ouvert. Le code et les décisions sont publics, la conversation aussi.",
  },
];

export default function Contact() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mega mt-8 max-w-[14ch] text-[clamp(2.75rem,8vw,7rem)]">
              Dites-nous <span className="text-ink-4">ce qui cloche.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-10 max-w-[46ch] text-[1.125rem] leading-relaxed text-ink-2">
              Le site se construit à découvert : le code, le contenu et les décisions sont
              publics. Tout ce qui arrive par ces canaux est lu.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="mega max-w-[12ch] text-[clamp(1.75rem,4vw,2.75rem)]">
              Trois raisons <span className="text-ink-4">d’écrire.</span>
            </h2>
          </Reveal>

          <div className="lg:col-span-8">
            {RAISONS.map((r, i) => (
              <Reveal key={r.n} delay={i * 90}>
                <article className="grid gap-x-8 gap-y-3 border-t border-line py-9 sm:grid-cols-[auto_1fr]">
                  <p className="numero text-[0.875rem] sm:pt-1">{r.n}</p>
                  <div>
                    <h3 className="mega text-[clamp(1.375rem,2.6vw,1.875rem)]">{r.titre}</h3>
                    <p className="mt-4 max-w-[58ch] text-[1rem] leading-relaxed text-ink-3">
                      {r.texte}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>
      </Container>

      <section className="border-t border-line bg-canvas-2">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <h2 className="mega max-w-[16ch] text-[clamp(1.75rem,4vw,2.75rem)]">
              Les canaux <span className="text-ink-4">qui existent vraiment.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="h-full border-t-2 border-ink bg-canvas p-8">
                <p className="eyebrow">Correction ou proposition</p>
                <p className="mt-5 text-[1.0625rem] tracking-[-0.02em] text-ink">
                  Ouvrez un ticket sur le dépôt public.
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">
                  C&apos;est tracé, c&apos;est lisible par tous, et la correction se voit dans
                  l&apos;historique du site.
                </p>
                <a
                  href="https://github.com/amndrd/larpocracy/issues"
                  className="souligne mt-7 inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink hover:souligne-on"
                >
                  github.com/amndrd/larpocracy
                  <IconFleche className="size-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="h-full border-t-2 border-line bg-canvas p-8">
                <p className="eyebrow">Écrire</p>
                {EMAIL ? (
                  <>
                    <p className="mt-5 text-[1.0625rem] tracking-[-0.02em] text-ink">
                      Une question qui n&apos;a pas sa place en public.
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="souligne mt-7 inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink hover:souligne-on"
                    >
                      {EMAIL}
                      <IconFleche className="size-4" />
                    </a>
                  </>
                ) : (
                  <>
                    <p className="mt-5 text-[1.0625rem] tracking-[-0.02em] text-ink-4">
                      Adresse e-mail à venir.
                    </p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">
                      Elle sera publiée ici dès qu&apos;elle sera en place. En attendant, le
                      dépôt public reçoit tout.
                    </p>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink text-canvas">
        <Container className="py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="mega mx-auto max-w-[16ch] text-[clamp(2rem,6vw,4.5rem)]">
              Ou commencez, tout simplement.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-12 flex justify-center">
              <ButtonLink href="/inscription" taille="lg" variante="clair">
                Get started
                <IconFleche className="size-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
