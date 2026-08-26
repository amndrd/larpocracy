import Container from '@/components/Container';
import DomainGrid from '@/components/DomainGrid';
import Faq from '@/components/Faq';
import HeroPreview from '@/components/HeroPreview';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { IconCartes, IconEclair, IconFleche, IconLire, IconTest, IconTrophee } from '@/components/icons';
import { domains, stats } from '@/lib/content';
import { news } from '@/lib/news';
import { PLANS } from '@/lib/plans';
import { RANGS } from '@/lib/xp';

const MODES = [
  {
    icon: <IconLire className="size-5" />,
    titre: 'Lire',
    texte:
      "Le fait, le terme, le nom — et sa prononciation. Sept minutes, densité maximale, zéro remplissage.",
    points: '+10 pts',
  },
  {
    icon: <IconCartes className="size-5" />,
    titre: 'Cartes',
    texte:
      "Recto le terme, verso la définition. On juge « je savais » ou « à revoir », et on ne rejoue que les ratées.",
    points: '+2 pts',
  },
  {
    icon: <IconTest className="size-5" />,
    titre: 'Test',
    texte:
      'Des questions à choix, corrigées et expliquées — même quand la réponse est juste.',
    points: '+5 pts',
  },
];

const FAQ = [
  {
    q: 'Est-ce que ça apprend à mentir ?',
    r: "Non, et c'est la seule ligne qui ne bougera jamais. LarpLvl enseigne la culture, les codes et l'aisance — jamais le faux diplôme, la fausse référence ou la fausse fortune. Une erreur de culture se rattrape en une phrase ; un mensonge vérifiable, jamais.",
  },
  {
    q: 'À qui ça s’adresse ?',
    r: "À qui se retrouve dans des pièces dont il ne connaît pas les codes, et qui n'a pas vingt ans à consacrer à les acquérir par osmose familiale.",
  },
  {
    q: 'Pourquoi des points et des rangs ?',
    r: "Parce qu'on ne révise pas sans repère. Mais aucun point n'est offert : 10 par fiche lue, 5 par bonne réponse, 2 par carte sue. Un compteur qui monterait sans qu'on ait appris serait le contraire de ce que le site enseigne.",
  },
  {
    q: 'Le contenu est-il déjà là ?',
    r: "Pas encore. Le site est remis à zéro et se remplit domaine par domaine. Le compte, la progression et les trois modes sont prêts et vous attendent.",
  },
  {
    q: 'Faut-il payer ?',
    r: "Non. Tout ce qui est publié est en accès libre, et aucune fiche déjà publiée ne passera un jour derrière un paiement.",
  },
];

export default function Home() {
  const aDuContenu = stats.domains > 0;

  return (
    <>
      {/* ---------- Bannière ---------- */}
      <section className="relative">
        {/* Le ciel de crépuscule, puis son fondu vers le noir. */}
        <div aria-hidden className="crepuscule absolute inset-x-0 top-0 h-[125vh] max-h-[1100px]" />
        <div
          aria-hidden
          className="fondu-bas absolute inset-x-0 top-0 h-[125vh] max-h-[1100px]"
        />

        <Container className="relative pt-36 text-center sm:pt-44">
          <Reveal>
            <span className="chip">Culture générale appliquée</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="headline mx-auto mt-8 max-w-[15ch] text-[clamp(2.75rem,7vw,4.75rem)]">
              Une porte ne s&apos;ouvre jamais sur un CV.{' '}
              <span className="headline-dim">Elle s&apos;ouvre sur une conversation.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-[50ch] text-[1.0625rem] leading-relaxed text-ink-3">
              LarpLvl enseigne les codes, le vocabulaire et les références des milieux du
              business, du luxe et du pouvoir. Pour avoir quelque chose à dire — de juste — à
              n&apos;importe qui, dans n&apos;importe quelle pièce.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/inscription" taille="lg">
                Get started
              </ButtonLink>
              <ButtonLink href="/features" taille="lg" variante="secondaire">
                Features
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={340} className="mt-16 sm:mt-20">
            <HeroPreview />
          </Reveal>
        </Container>
      </section>

      {/* ---------- La déclaration ---------- */}
      <Container className="py-28 sm:py-36">
        <div className="max-w-[62rem] space-y-8">
          {/* Le premier bloc arrive en pleine lumière, le second en retrait :
              c'est le rythme du modèle, une idée puis son commentaire. */}
          <Reveal>
            <p className="headline text-[clamp(1.375rem,3.2vw,2.25rem)] text-ink">
              Un réseau se construit sur la conversation. Quelqu&apos;un qui sait parler
              d&apos;un Barolo, d&apos;un LBO, d&apos;un Royal Oak et du protocole japonais
              inspire confiance.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="headline text-[clamp(1.375rem,3.2vw,2.25rem)] text-ink-4">
              Ce n&apos;est pas de la frime : c&apos;est de la surface d&apos;accroche. Plus
              vous avez de sujets, plus vous avez de portes.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* ---------- Les trois modes ---------- */}
      <Container className="py-16">
        <Reveal>
          <span className="chip">Core features</span>
          <h2 className="headline mt-6 max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)]">
            Une fiche se lit, se révise,{' '}
            <span className="headline-dim">se vérifie.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {MODES.map((m, i) => (
            <Reveal key={m.titre} delay={i * 110}>
              <div className="card card-lift flex h-full flex-col p-7 hover:card-lift-on">
                <span className="grid size-11 place-items-center rounded-full bg-white/[0.06] text-ink">
                  {m.icon}
                </span>
                <h3 className="display mt-6 text-[1.375rem]">{m.titre}</h3>
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

      {/* ---------- Progression ---------- */}
      <Container className="py-16">
        <Reveal>
          <span className="chip">
            <IconTrophee className="size-3.5" />
            Progression
          </span>
          <h2 className="headline mt-6 max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)]">
            D&apos;invité <span className="headline-dim">à maître de maison.</span>
          </h2>
          <p className="mt-5 max-w-[54ch] text-[1rem] leading-relaxed text-ink-3">
            Sept rangs, et pas un point offert : ils ne montent qu&apos;en lisant, en révisant
            et en répondant juste.
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
      </Container>

      {/* ---------- Le catalogue ---------- */}
      <Container className="py-16">
        <Reveal>
          <span className="chip">Contenu</span>
          <h2 className="headline mt-6 max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)]">
            De la cave <span className="headline-dim">au conseil d&apos;administration.</span>
          </h2>
        </Reveal>

        <div className="mt-10">
          {aDuContenu ? (
            <>
              <DomainGrid list={domains.slice(0, 6)} />
              <Reveal delay={120}>
                <div className="mt-8 flex justify-center">
                  <ButtonLink href="/domaines" variante="secondaire">
                    Voir les {stats.domains} domaines
                    <IconFleche className="size-4" />
                  </ButtonLink>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal delay={80}>
              <div className="card px-8 py-20 text-center">
                <p className="display text-[1.75rem]">Le contenu arrive.</p>
                <p className="mx-auto mt-4 max-w-[50ch] text-[0.9375rem] leading-relaxed text-ink-3">
                  Les domaines et les fiches se remplissent un par un. Créez un compte : la
                  progression sera là dès la première fiche publiée.
                </p>
                <ButtonLink href="/inscription" variante="secondaire" className="mt-8">
                  Get started
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </Container>

      {/* ---------- Pricing ---------- */}
      <Container className="py-16">
        <Reveal>
          <span className="chip">Pricing</span>
          <h2 className="headline mt-6 max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)]">
            Pour l&apos;instant, <span className="headline-dim">tout est ouvert.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
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
                    <h3 className="display text-[1.5rem]">{p.name}</h3>
                    <span className="text-[0.75rem] text-ink-3">{p.period || 'disponible'}</span>
                  </div>
                  <p className="display mt-4 text-[2.5rem] leading-none">{p.price}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-3">{p.pitch}</p>
                  <div className="mt-7">
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
      </Container>

      {/* ---------- FAQ ---------- */}
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="chip">FAQ</span>
              <h2 className="headline mt-6 max-w-[16ch] text-[clamp(1.875rem,4vw,3rem)]">
                Les questions <span className="headline-dim">qui reviennent.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <Faq items={FAQ} />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* ---------- News ---------- */}
      <Container className="py-16 pb-24">
        <Reveal>
          <span className="chip">News</span>
          <h2 className="headline mt-6 max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)]">
            Ce qui change, <span className="headline-dim">et pourquoi.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="card mt-10 flex flex-wrap items-center justify-between gap-6 px-8 py-10">
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-3">
              {news.length === 0
                ? "Le journal de bord démarrera avec la première fiche publiée. Le site se construit à découvert : code, contenu et décisions sont publics."
                : `${news.length} entrée${news.length > 1 ? 's' : ''} au journal de bord.`}
            </p>
            <ButtonLink href="/news" variante="secondaire">
              Voir les nouvelles
              <IconFleche className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
