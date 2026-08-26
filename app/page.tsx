import Image from 'next/image';
import Container from '@/components/Container';
import DomainGrid from '@/components/DomainGrid';
import { ButtonLink } from '@/components/Button';
import { IconCartes, IconFleche, IconLire, IconNon, IconOui, IconTest } from '@/components/icons';
import { domains, stats } from '@/lib/content';
import { HERO } from '@/lib/visuels';

const MODES = [
  {
    icon: <IconLire className="size-5" />,
    titre: 'On lit la fiche',
    texte:
      "Le fait, le terme, le nom — et sa prononciation. Sept minutes, densité maximale, zéro remplissage.",
  },
  {
    icon: <IconCartes className="size-5" />,
    titre: 'On révise en cartes',
    texte:
      "Recto le terme, verso la définition. On juge « je savais » ou « à revoir », et on rejoue les ratées.",
  },
  {
    icon: <IconTest className="size-5" />,
    titre: 'On se teste',
    texte:
      "Des questions à choix, corrigées et expliquées. Le score se garde, domaine par domaine.",
  },
];

const DIS_CA = [
  '« Vous avez du champagne de vigneron ? »',
  '« Je ne connais pas du tout — racontez-moi. »',
  '« Vous levez à combien, pre ou post ? »',
];

const PAS_CA = [
  "« Prenez du Dom Pérignon, c'est le meilleur champagne. »",
  '« Ah oui, bien sûr, j’en ai beaucoup entendu parler. »',
  '« Cette bouteille doit valoir dans les 300 €, non ? »',
];

export default function Home() {
  return (
    <>
      {/* ---------- Ouverture ---------- */}
      <Container className="pt-6 sm:pt-8">
        <section className="animate-fade-up relative overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={HERO}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[30%_center]"
          />
          {/* Deux voiles : l'un porte le texte à gauche, l'autre calme le motif à droite. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(11,10,13,.94) 0%, rgba(11,10,13,.84) 40%, rgba(11,10,13,.62) 100%), ' +
                'linear-gradient(to top, rgba(11,10,13,.45), transparent 55%)',
            }}
          />

          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <p className="eyebrow text-white/60">Culture générale appliquée</p>
            <h1 className="display mt-5 max-w-[18ch] text-[clamp(2.5rem,6.5vw,4.75rem)] text-white">
              Une porte ne s&apos;ouvre jamais sur un CV.{' '}
              <em className="italic text-white/70">Elle s&apos;ouvre sur une conversation.</em>
            </h1>
            <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/75">
              Larpocracy enseigne les codes, le vocabulaire et les références des milieux du
              business, du luxe et du pouvoir. Pour avoir quelque chose à dire — de juste — à
              n&apos;importe qui, dans n&apos;importe quelle pièce.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/domaines" taille="lg">
                Explorer les domaines
                <IconFleche className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/manifeste"
                taille="lg"
                variante="fantome"
                className="border border-white/25 text-white hover:bg-white/10 hover:text-white"
              >
                Le manifeste
              </ButtonLink>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/15 pt-8">
              {[
                { n: stats.domains, l: 'Domaines' },
                { n: stats.topics, l: 'Sujets cartographiés' },
                { n: stats.cards, l: 'Fiches publiées' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="display text-[2.25rem] leading-none text-white">{s.n}</dt>
                  <dd className="eyebrow mt-2 text-white/55">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </Container>

      {/* ---------- Les trois modes ---------- */}
      <Container className="py-16 sm:py-20">
        <div className="max-w-[46ch]">
          <p className="eyebrow">Comment ça s&apos;apprend</p>
          <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)]">
            Une fiche se lit, se révise, se vérifie.
          </h2>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {MODES.map((m, i) => (
            <div
              key={m.titre}
              style={{ animationDelay: `${i * 70}ms` }}
              className="card animate-fade-up p-6"
            >
              <span className="grid size-11 place-items-center rounded-full bg-accent-3 text-accent">
                {m.icon}
              </span>
              <h3 className="display mt-5 text-[1.25rem]">{m.titre}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">{m.texte}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* ---------- Le format signature ---------- */}
      <section className="border-y border-line bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Le principe</p>
              <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)]">Dis ça. Pas ça.</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
                Le format signature du site : la même idée, formulée par quelqu&apos;un qui
                sait, et par quelqu&apos;un qui essaie. La différence n&apos;est presque jamais
                le vocabulaire.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              <div className="card animate-fade-up overflow-hidden">
                <h3 className="flex items-center gap-2 border-b border-line-soft bg-yes-2 px-5 py-3 text-[0.8125rem] font-semibold text-yes">
                  <IconOui className="size-4" />
                  Dis ça
                </h3>
                <ul className="space-y-4 p-5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {DIS_CA.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div
                className="card animate-fade-up overflow-hidden"
                style={{ animationDelay: '90ms' }}
              >
                <h3 className="flex items-center gap-2 border-b border-line-soft bg-no-2 px-5 py-3 text-[0.8125rem] font-semibold text-no">
                  <IconNon className="size-4" />
                  Pas ça
                </h3>
                <ul className="space-y-4 p-5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {PAS_CA.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Le catalogue ---------- */}
      <Container className="py-16 sm:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Le catalogue</p>
            <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)]">
              De la cave au conseil d&apos;administration
            </h2>
          </div>
          <ButtonLink href="/domaines" variante="secondaire">
            Voir les {stats.domains} domaines
            <IconFleche className="size-4" />
          </ButtonLink>
        </div>
        <DomainGrid list={domains.slice(0, 6)} />
      </Container>
    </>
  );
}
