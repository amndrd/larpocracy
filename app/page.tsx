import Image from 'next/image';
import Constellation from '@/components/Constellation';
import Container from '@/components/Container';
import DomainGrid from '@/components/DomainGrid';
import { ButtonLink } from '@/components/Button';
import { IconCartes, IconEclair, IconFleche, IconLire, IconNon, IconOui, IconTest, IconTrophee } from '@/components/icons';
import { domains, stats } from '@/lib/content';
import { RANGS } from '@/lib/xp';
import { HERO } from '@/lib/visuels';

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
        <section className="animate-fade-up relative overflow-hidden rounded-2xl border border-line bg-canvas-2">
          {/* La photo n'est qu'une texture : elle passe très en retrait. */}
          <Image
            src={HERO}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[30%_center] opacity-25"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(20,17,15,.96) 0%, rgba(20,17,15,.86) 45%, rgba(20,17,15,.60) 100%)',
            }}
          />
          <Constellation className="pointer-events-none absolute inset-0 size-full opacity-95" />

          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <p className="eyebrow">Culture générale appliquée</p>
            <h1 className="headline mt-6 max-w-[16ch] text-[clamp(2.75rem,7.5vw,5.5rem)]">
              Une porte ne s&apos;ouvre jamais sur un CV.{' '}
              <em className="italic text-ink-3">Elle s&apos;ouvre sur une conversation.</em>
            </h1>
            <p className="mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-2">
              Larpocracy enseigne les codes, le vocabulaire et les références des milieux du
              business, du luxe et du pouvoir. Pour avoir quelque chose à dire — de juste — à
              n&apos;importe qui, dans n&apos;importe quelle pièce.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/domaines" taille="lg">
                <span className="grid size-6 place-items-center rounded-full bg-accent-2">
                  <IconEclair className="size-3.5" />
                </span>
                Commencer
              </ButtonLink>
              <ButtonLink href="/manifeste" taille="lg" variante="secondaire">
                Le manifeste
              </ButtonLink>
            </div>

            <dl className="mt-12 flex flex-wrap gap-2.5">
              {[
                { n: stats.domains, l: 'domaines' },
                { n: stats.topics, l: 'sujets cartographiés' },
                { n: stats.cards, l: 'fiches publiées' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="inline-flex items-baseline gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 backdrop-blur-sm"
                >
                  <dt className="display text-[1.25rem] leading-none">{s.n}</dt>
                  <dd className="text-[0.8125rem] text-ink-3">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </Container>

      {/* ---------- Les trois modes, en bento ---------- */}
      <Container className="py-16 sm:py-20">
        <div className="max-w-[46ch]">
          <p className="eyebrow">Comment ça s&apos;apprend</p>
          <h2 className="headline mt-3 text-[clamp(1.875rem,4vw,2.75rem)]">
            Une fiche se lit, se révise, se vérifie.
          </h2>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <div className="card animate-fade-up flex flex-col p-6 md:row-span-2">
            <span className="grid size-11 place-items-center rounded-full bg-surface-2 text-ink">
              <IconLire className="size-5" />
            </span>
            <h3 className="display mt-5 text-[1.375rem]">On lit la fiche</h3>
            <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
              Le fait, le terme, le nom — et sa prononciation. Sept minutes, densité maximale,
              zéro remplissage. Chaque fiche doit produire au moins une phrase prononçable le
              soir même.
            </p>
            <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-[0.75rem] font-semibold text-ink-2">
              <IconEclair className="size-3.5" />+10 points
            </p>
          </div>

          {/* La carte pleine, à la Toko : une seule, pour qu'elle porte. */}
          <div
            className="animate-fade-up flex flex-col rounded-lg bg-accent p-6 text-white md:col-span-2"
            style={{ animationDelay: '70ms' }}
          >
            <span className="grid size-11 place-items-center rounded-full bg-white/15">
              <IconCartes className="size-5" />
            </span>
            <h3 className="display mt-5 text-[1.375rem]">On révise en cartes</h3>
            <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-white/80">
              Recto le terme, verso la définition. Pour un nom propre, le verso porte la
              prononciation — parce qu&apos;un nom mal dit annule dix pages de savoir. On juge
              « je savais » ou « à revoir », et on ne rejoue que les ratées.
            </p>
            <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[0.75rem] font-semibold">
              <IconEclair className="size-3.5" />+2 points par carte
            </p>
          </div>

          <div
            className="card animate-fade-up flex flex-col p-6 md:col-span-2"
            style={{ animationDelay: '140ms' }}
          >
            <span className="grid size-11 place-items-center rounded-full bg-surface-2 text-ink">
              <IconTest className="size-5" />
            </span>
            <h3 className="display mt-5 text-[1.375rem]">On se teste</h3>
            <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
              Des questions à choix, corrigées et expliquées. Le score reste, domaine par
              domaine — et il fait monter le rang.
            </p>
            <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-[0.75rem] font-semibold text-ink-2">
              <IconEclair className="size-3.5" />+5 points par bonne réponse
            </p>
          </div>
        </div>
      </Container>

      {/* ---------- Les rangs ---------- */}
      <section className="border-y border-line bg-canvas-2">
        <Container className="py-14">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[44ch]">
              <p className="eyebrow">La progression</p>
              <h2 className="headline mt-3 text-[clamp(1.625rem,3.2vw,2.25rem)]">
                D&apos;invité à maître de maison.
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                Sept rangs, et pas un point offert : ils ne montent qu&apos;en lisant, en
                révisant et en répondant juste.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-2 px-4 py-2 text-[0.8125rem] font-semibold text-gold">
              <IconTrophee className="size-4" />6 distinctions à décrocher
            </span>
          </div>

          <ol className="rail mt-8 flex gap-2.5 overflow-x-auto pb-2">
            {RANGS.map((r, i) => (
              <li
                key={r.nom}
                style={{ animationDelay: `${i * 45}ms` }}
                className="card animate-fade-up flex shrink-0 items-center gap-3 px-4 py-3"
              >
                <span className="display text-[1.25rem] leading-none text-ink-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block whitespace-nowrap text-[0.9375rem] font-semibold text-ink">
                    {r.nom}
                  </span>
                  <span className="block text-[0.75rem] tabular-nums text-ink-3">
                    {r.seuil} pts
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------- Le format signature ---------- */}
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Le principe</p>
            <h2 className="headline mt-3 text-[clamp(1.875rem,4vw,2.75rem)]">Dis ça. Pas ça.</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              Le format signature du site : la même idée, formulée par quelqu&apos;un qui sait,
              et par quelqu&apos;un qui essaie. La différence n&apos;est presque jamais le
              vocabulaire.
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
            <div className="card animate-fade-up overflow-hidden" style={{ animationDelay: '90ms' }}>
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

      {/* ---------- Le catalogue ---------- */}
      <Container className="pb-16 sm:pb-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Le catalogue</p>
            <h2 className="headline mt-3 text-[clamp(1.875rem,4vw,2.75rem)]">
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
