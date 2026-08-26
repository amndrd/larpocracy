import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { IconCartes, IconEclair, IconFlamme, IconLire, IconNon, IconOui, IconTest, IconTrophee } from '@/components/icons';
import { RANGS } from '@/lib/xp';

export const metadata: Metadata = {
  title: 'Features',
  description:
    "Lire, réviser en cartes, se tester — et voir son rang monter. Ce que LarpLvl fait, mode par mode.",
};

const MODES = [
  {
    icon: <IconLire className="size-5" />,
    titre: 'Lire',
    points: '+10 points par fiche',
    texte:
      "Le fait, le terme, le nom — et sa prononciation. Sept minutes, densité maximale, zéro remplissage. Chaque fiche doit produire au moins une phrase prononçable le soir même.",
  },
  {
    icon: <IconCartes className="size-5" />,
    titre: 'Cartes',
    points: '+2 points par carte',
    texte:
      "Recto le terme, verso la définition. Pour un nom propre, le verso porte la prononciation — parce qu'un nom mal dit annule dix pages de savoir. On juge « je savais » ou « à revoir », et on ne rejoue que les ratées.",
  },
  {
    icon: <IconTest className="size-5" />,
    titre: 'Test',
    points: '+5 points par bonne réponse',
    texte:
      'Des questions à choix, corrigées et expliquées — même quand la réponse est juste. Le score reste, domaine par domaine, et seul le meilleur passage compte.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Container className="pt-32 pb-16 text-center sm:pt-40">
        <Reveal>
          <span className="chip">Features</span>
          <h1 className="headline mx-auto mt-7 max-w-[18ch] text-[clamp(2.5rem,6vw,4.25rem)]">
            Une fiche se lit, se révise,{' '}
            <span className="headline-dim">se vérifie.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-3">
            Trois modes sur le même contenu. Aucun n&apos;est décoratif : chacun entraîne
            quelque chose de différent, et chacun rapporte des points.
          </p>
        </Reveal>
      </Container>

      {/* Les trois modes */}
      <Container className="pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {MODES.map((m, i) => (
            <Reveal key={m.titre} delay={i * 110}>
              <div className="card card-lift flex h-full flex-col p-7 hover:card-lift-on">
                <span className="grid size-11 place-items-center rounded-full bg-white/[0.06] text-ink">
                  {m.icon}
                </span>
                <h2 className="display mt-6 text-[1.5rem]">{m.titre}</h2>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-3">{m.texte}</p>
                <p className="chip mt-6 w-fit">
                  <IconEclair className="size-3.5" />
                  {m.points}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Dis ça / Pas ça */}
      <Container className="py-16">
        <Reveal>
          <span className="chip">Le format signature</span>
          <h2 className="headline mt-6 max-w-[20ch] text-[clamp(1.875rem,4vw,3rem)]">
            Dis ça. <span className="headline-dim">Pas ça.</span>
          </h2>
          <p className="mt-5 max-w-[54ch] text-[1rem] leading-relaxed text-ink-3">
            La même idée, formulée par quelqu&apos;un qui sait, et par quelqu&apos;un qui
            essaie. La différence n&apos;est presque jamais le vocabulaire.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          <Reveal delay={80}>
            <div className="card h-full overflow-hidden">
              <h3 className="flex items-center gap-2 border-b border-line-soft px-6 py-4 text-[0.8125rem] font-semibold text-yes">
                <IconOui className="size-4" />
                Dis ça
              </h3>
              <ul className="space-y-4 p-6 text-[0.9375rem] leading-relaxed text-ink-2">
                <li>« Vous avez du champagne de vigneron ? »</li>
                <li>« Je ne connais pas du tout — racontez-moi. »</li>
                <li>« Vous levez à combien, pre ou post ? »</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="card h-full overflow-hidden">
              <h3 className="flex items-center gap-2 border-b border-line-soft px-6 py-4 text-[0.8125rem] font-semibold text-no">
                <IconNon className="size-4" />
                Pas ça
              </h3>
              <ul className="space-y-4 p-6 text-[0.9375rem] leading-relaxed text-ink-2">
                <li>« Prenez du Dom Pérignon, c&apos;est le meilleur champagne. »</li>
                <li>« Ah oui, bien sûr, j&apos;en ai beaucoup entendu parler. »</li>
                <li>« Cette bouteille doit valoir dans les 300 €, non ? »</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Progression */}
      <Container className="py-16">
        <Reveal>
          <span className="chip">
            <IconTrophee className="size-3.5" />
            Progression
          </span>
          <h2 className="headline mt-6 max-w-[20ch] text-[clamp(1.875rem,4vw,3rem)]">
            D&apos;invité <span className="headline-dim">à maître de maison.</span>
          </h2>
          <p className="mt-5 max-w-[54ch] text-[1rem] leading-relaxed text-ink-3">
            Sept rangs, une série de jours, six distinctions. Et pas un point offert : ils ne
            montent qu&apos;en lisant, en révisant et en répondant juste.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ol className="rail mt-9 flex gap-2.5 overflow-x-auto pb-2">
            {RANGS.map((r, i) => (
              <li key={r.nom} className="card flex shrink-0 items-center gap-3 px-5 py-4">
                <span className="display text-[1.25rem] leading-none text-ink-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block whitespace-nowrap text-[0.9375rem] font-medium text-ink">
                    {r.nom}
                  </span>
                  <span className="block text-[0.75rem] tabular-nums text-ink-3">
                    {r.seuil} pts
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="chip">
              <IconFlamme className="size-3.5" />
              Série de jours
            </span>
            <span className="chip">
              <IconTrophee className="size-3.5" />6 distinctions
            </span>
            <span className="chip">
              <IconEclair className="size-3.5" />
              Aucun point offert
            </span>
          </div>
        </Reveal>
      </Container>

      <Container className="py-20 text-center">
        <Reveal>
          <h2 className="headline mx-auto max-w-[16ch] text-[clamp(1.875rem,4vw,3rem)]">
            Le contenu arrive. <span className="headline-dim">Le compte, lui, est prêt.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/inscription" taille="lg">
              Get started
            </ButtonLink>
            <ButtonLink href="/pricing" taille="lg" variante="secondaire">
              Pricing
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
