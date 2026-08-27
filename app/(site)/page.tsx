import Container from '@/components/Container';
import Faq from '@/components/Faq';
import Reveal from '@/components/Reveal';
import Rail from '@/components/Rail';
import Ruban from '@/components/Ruban';
import { ButtonLink } from '@/components/Button';
import { IconFleche, IconNon, IconOui } from '@/components/icons';
import { CATALOGUE } from '@/lib/catalogue';
import { domains, stats } from '@/lib/content';
import { PLANS } from '@/lib/plans';
import { RANGS } from '@/lib/xp';

/** Les quatre temps de la méthode. Le registre les numérote : on les numérote. */
const METHODE = [
  {
    n: '01',
    titre: 'Lire',
    resume: 'La fiche',
    texte:
      "Sept minutes, densité maximale. Le fait, le terme, le nom — et sa prononciation, parce qu'un nom mal dit annule dix pages de savoir.",
    gain: '+10 points',
  },
  {
    n: '02',
    titre: 'Cartes',
    resume: 'La révision',
    texte:
      "Recto le terme, verso la définition. On juge « je savais » ou « à revoir », et on ne rejoue que les ratées. Le paquet se fabrique tout seul depuis la fiche.",
    gain: '+2 points',
  },
  {
    n: '03',
    titre: 'Test',
    resume: 'La vérification',
    texte:
      "Des questions à choix, corrigées et expliquées — y compris quand la réponse est juste. Savoir pourquoi on a eu raison vaut la moitié de l'exercice.",
    gain: '+5 points',
  },
  {
    n: '04',
    titre: 'Rang',
    resume: 'La progression',
    texte:
      "Sept rangs, d'Invité à Maître de maison. Pas un point offert : le compteur ne monte qu'en lisant, en révisant et en répondant juste.",
    gain: `${RANGS.length} rangs`,
  },
];

/**
 * Le format signature, en lieu et place des témoignages du registre.
 * Un témoignage se fabrique ; celui-ci s'enseigne — et il ne coûte pas
 * une seule affirmation inventée.
 */
const DIS_CA = [
  '« Je ne connais pas — racontez-moi. »',
  '« J’ai un faible pour les blancs de blancs. »',
  '« Je suis arrivé dans le secteur l’an dernier. »',
];

const PAS_CA = [
  '« Comme je le disais l’autre soir à… »',
  '« Évidemment, tout le monde sait ça. »',
  '« C’est le meilleur, tout simplement. »',
];

/**
 * Les principes de rédaction. Le registre place ici ses portraits d'équipe ;
 * nous n'en avons pas à montrer, et en inventer serait la faute que le site
 * passe son temps à condamner. Ce sont donc les règles d'écriture du contenu
 * qui tiennent la place — elles disent qui écrit, ce qui revient au même.
 */
const PRINCIPES = [
  {
    n: '01',
    titre: 'Utilisable en dîner',
    texte:
      "Chaque fiche doit produire au moins une phrase prononçable en soirée. Si l'information n'est pas disable, elle ne sert à rien et elle ne rentre pas.",
  },
  {
    n: '02',
    titre: 'La prononciation compte autant que le fait',
    texte:
      "Un nom mal prononcé annule dix pages de savoir. Chaque nom propre étranger porte sa phonétique, et ces phonétiques deviennent un paquet de cartes à réviser.",
  },
  {
    n: '03',
    titre: 'Sobriété plutôt qu’étalage',
    texte:
      "Le site enseigne systématiquement que sous-jouer bat surjouer. Le name-dropping reste le marqueur numéro un de l'imposteur.",
  },
  {
    n: '04',
    titre: 'Zéro fraude',
    texte:
      "On enseigne la culture, les codes et l'aisance. Jamais l'usurpation d'identité, le faux diplôme ou la fausse référence. Cette ligne ne bouge pas.",
  },
  {
    n: '05',
    titre: 'Honnêteté factuelle',
    texte:
      "Pas de fait inventé. Un chiffre incertain est marqué comme tel, ou retiré. Un site qui apprendrait à bluffer avec de fausses informations serait un piège pour qui le lit.",
  },
  {
    n: '06',
    titre: 'Densité',
    texte:
      "Pas de remplissage, pas de blabla motivationnel. Du fait, du terme, de la formulation — et rien entre les deux.",
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
    r: "Une partie des fiches est ouverte à tous. Le reste demandera la formule Pro, dont le montant n'est pas encore arrêté — et ne sera pas annoncé avant de l'être.",
  },
];

export default function Home() {
  const publies = new Set(domains.map((d) => d.id));

  return (
    <>
      {/* ══════════ Le héros ══════════ */}
      {/* Tout est centré et le titre pèse de tout son poids : c'est la
          composition du registre. Pas de bandeau de logos sous le titre —
          rien n'y remplacerait une preuve qu'on n'a pas. */}
      <section className="flex min-h-[calc(100svh-6rem)] flex-col justify-center">
        <Container className="py-16 text-center">
          <Reveal>
            <h1 className="mega mx-auto max-w-[14ch] text-[clamp(3.25rem,11vw,9rem)]">
              L’art de tenir la salle
              <span className="text-accent">.</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-12 max-w-[34ch] text-[clamp(1.125rem,2.2vw,1.5rem)] leading-snug text-ink-2">
              Les codes, le vocabulaire et les références des milieux du business, du luxe et
              du pouvoir — pour avoir quelque chose à dire, et que ce soit juste.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/inscription" taille="lg">
                Get started
                <IconFleche className="size-4" />
              </ButtonLink>
              <ButtonLink href="/features" taille="lg" variante="secondaire">
                Voir la méthode
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-14 text-[0.8125rem] text-ink-3">
              Quatorze domaines · lecture, cartes et test sur chaque fiche
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ══════════ Le bandeau ══════════ */}
      <Ruban mots={CATALOGUE.map((d) => d.titre)} />

      {/* ══════════ La déclaration ══════════ */}
      <Container className="border-t border-line py-24 sm:py-36">
        <div className="max-w-[52rem] space-y-6">
          {/* Une idée en pleine lumière, son commentaire en retrait. */}
          <Reveal>
            <p className="mega text-[clamp(1.75rem,4.4vw,3.25rem)]">
              Un réseau se construit sur la conversation.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mega text-[clamp(1.75rem,4.4vw,3.25rem)] text-ink-4">
              Quelqu’un qui sait parler d’un Barolo, d’un LBO, d’un Royal Oak et du protocole
              japonais donne envie de travailler avec lui. Ce n’est pas de la frime : c’est de
              la surface d’accroche.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* ══════════ Le rail ══════════ */}
      {/* Le registre casse ici la lecture verticale : on défile de côté. */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">En vitrine</p>
                <h2 className="mega mt-6 max-w-[14ch] text-[clamp(2rem,5vw,3.5rem)]">
                  Six domaines <span className="text-ink-4">pour commencer.</span>
                </h2>
              </div>
              <p className="text-[0.8125rem] text-ink-4">Faites glisser →</p>
            </div>
          </Reveal>
        </Container>

        <Reveal delay={120} className="mt-12">
          <Rail entrees={CATALOGUE.slice(0, 6)} ouverts={publies} />
        </Reveal>
      </section>

      {/* ══════════ La méthode, 01 à 04 ══════════ */}
      <Container className="border-t border-line py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">La méthode</p>
            <h2 className="mega mt-6 max-w-[12ch] text-[clamp(2rem,5vw,3.5rem)]">
              Une fiche se lit, se révise, <span className="text-ink-4">se vérifie.</span>
            </h2>
          </Reveal>

          <div className="lg:col-span-8">
            {METHODE.map((m, i) => (
              <Reveal key={m.n} delay={i * 90}>
                <article className="group grid gap-x-8 gap-y-3 border-t border-line py-9 sm:grid-cols-[auto_1fr] sm:py-11">
                  <p className="numero text-[0.875rem] sm:pt-1">{m.n}</p>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="mega text-[clamp(1.75rem,3.4vw,2.5rem)]">{m.titre}</h3>
                      <span className="text-[0.875rem] text-ink-4">— {m.resume}</span>
                      <span className="ml-auto text-[0.8125rem] tabular-nums text-ink-3">
                        {m.gain}
                      </span>
                    </div>
                    <p className="mt-4 max-w-[58ch] text-[1rem] leading-relaxed text-ink-3">
                      {m.texte}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* ══════════ Le catalogue, en index ══════════ */}
      <Container className="border-t border-line py-20 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Le programme complet</p>
              <h2 className="mega mt-6 max-w-[14ch] text-[clamp(2rem,5vw,3.5rem)]">
                De la cave <span className="text-ink-4">au conseil.</span>
              </h2>
            </div>
            <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Quatorze domaines cartographiés. Ils se remplissent un par un, et le journal de
              bord dit lesquels — sans rien annoncer qui ne soit publié.
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          {CATALOGUE.map((d, i) => {
            const ouvert = publies.has(d.id);
            return (
              <Reveal key={d.id} delay={Math.min(i, 8) * 45}>
                <div className="ligne group hover:ligne-on hover:bg-canvas-2">
                  <span className="numero w-8 shrink-0 text-[0.8125rem]">
                    {String(d.n).padStart(2, '0')}
                  </span>
                  <span className="mega flex-1 text-[clamp(1.25rem,2.6vw,2rem)] text-ink">
                    {d.titre}
                  </span>
                  <span className="hidden max-w-[36ch] flex-1 text-[0.875rem] text-ink-3 lg:block">
                    {d.couvre}
                  </span>
                  <span
                    className={
                      'shrink-0 text-[0.75rem] font-medium tracking-[0.06em] uppercase ' +
                      (ouvert ? 'text-accent' : 'text-ink-4')
                    }
                  >
                    {ouvert ? 'Ouvert' : 'À venir'}
                  </span>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-line" />
        </div>

        {stats.cards > 0 && (
          <Reveal delay={120}>
            <div className="mt-10">
              <ButtonLink href="/app" variante="secondaire">
                Entrer dans le contenu
                <IconFleche className="size-4" />
              </ButtonLink>
            </div>
          </Reveal>
        )}
      </Container>

      {/* ══════════ Dis ça / Pas ça ══════════ */}
      <section className="border-t border-line bg-canvas-2">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">Le format signature</p>
            <h2 className="mega mt-6 max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)]">
              Sous-jouer bat surjouer. <span className="text-ink-4">Toujours.</span>
            </h2>
            <p className="mt-6 max-w-[54ch] text-[1rem] leading-relaxed text-ink-3">
              Chaque fiche oppose la formulation qui passe et celle qui trahit. Le
              name-dropping reste le marqueur numéro un de l’imposteur.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="h-full border-t-2 border-yes bg-canvas p-8">
                <p className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.08em] text-yes uppercase">
                  <IconOui className="size-4" />
                  Dis ça
                </p>
                <ul className="mt-7 space-y-5">
                  {DIS_CA.map((t) => (
                    <li key={t} className="text-[1.0625rem] tracking-[-0.02em] text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="h-full border-t-2 border-no bg-canvas p-8">
                <p className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.08em] text-no uppercase">
                  <IconNon className="size-4" />
                  Pas ça
                </p>
                <ul className="mt-7 space-y-5">
                  {PAS_CA.map((t) => (
                    <li key={t} className="text-[1.0625rem] tracking-[-0.02em] text-ink-4">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ══════════ Les principes ══════════ */}
      <Container className="border-t border-line py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">La maison</p>
            <h2 className="mega mt-6 max-w-[12ch] text-[clamp(2rem,5vw,3.5rem)]">
              Six règles <span className="text-ink-4">non négociables.</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Elles commandent tout ce qui est écrit ici, et elles sont publiques comme le
              reste — code, contenu et décisions.
            </p>
          </Reveal>

          <div className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {PRINCIPES.map((p, i) => (
              <Reveal key={p.n} delay={Math.min(i, 6) * 70} className="bg-canvas">
                <article className="flex h-full flex-col p-7">
                  <p className="numero text-[0.8125rem]">{p.n}</p>
                  <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.025em] text-ink">
                    {p.titre}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">{p.texte}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* ══════════ Pricing ══════════ */}
      <Container className="border-t border-line py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h2 className="mega mt-6 max-w-[16ch] text-[clamp(2rem,5vw,3.5rem)]">
            Jugez sur pièce <span className="text-ink-4">avant de payer.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {(['free', 'pro'] as const).map((cle, i) => {
            const p = PLANS[cle];
            const pro = cle === 'pro';
            return (
              <Reveal key={p.id} delay={i * 110} className="bg-canvas">
                <div className="flex h-full flex-col p-8 sm:p-10">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="mega text-[1.75rem]">{p.name}</h3>
                    <span className="text-[0.75rem] tracking-[0.06em] text-ink-4 uppercase">
                      {p.period}
                    </span>
                  </div>
                  <p className="mega mt-8 text-[clamp(2.5rem,6vw,4rem)]">{p.price}</p>
                  <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-3">
                    {p.pitch}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[0.9375rem] text-ink-2">
                        <span aria-hidden className="text-ink-4">
                          —
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    {pro ? (
                      <span className="block border border-line px-5 py-3.5 text-center text-[0.8125rem] font-medium text-ink-4">
                        Montant pas encore arrêté
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

      {/* ══════════ FAQ ══════════ */}
      <Container className="border-t border-line py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="mega mt-6 max-w-[12ch] text-[clamp(2rem,5vw,3.5rem)]">
              Les questions <span className="text-ink-4">qui reviennent.</span>
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <Faq items={FAQ} />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* ══════════ L'appel final ══════════ */}
      <section className="border-t border-line bg-ink text-canvas">
        <Container className="py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="mega mx-auto max-w-[18ch] text-[clamp(2.25rem,6.5vw,5rem)]">
              Apprends pour de vrai. C’est moins cher que de faire semblant.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/inscription" taille="lg" variante="clair">
                Get started
                <IconFleche className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                taille="lg"
                className="bg-transparent text-canvas ring-1 ring-canvas/30 ring-inset hover:bg-canvas/10"
              >
                Contact us
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
