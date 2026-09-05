import GrilleFond from '@/components/GrilleFond';
import Header from '@/components/Header';
import PointCurseur from '@/components/PointCurseur';
import RideauIntro from '@/components/RideauIntro';

/** La page : le hero et son titre, puis le manifeste. */
export default function Page() {
  return (
    <>
      <RideauIntro />
      <GrilleFond />
      <PointCurseur />
      <Header />
      <div className="page">
        <section className="hero">
          <h1 className="hero_titre">
            <span className="hero_ligne">Money</span>
            <span className="hero_ligne">talks</span>
          </h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero_rouleau"
            src="/money-roll.webp"
            alt="Un rouleau de billets de cent dollars"
            width={420}
            height={594}
            /* C'est la plus grande chose peinte au premier écran : c'est donc
               elle que mesure le LCP. `high` la sort de la file d'attente des
               images, `async` décode hors du fil principal. Le modèle marque
               la sienne de la même façon. */
            fetchPriority="high"
            decoding="async"
          />
        </section>

        <section className="manifeste">
          <p className="manifeste_paragraphe">
            La plupart des gens entrent dans une pièce comme on s’assied à une table dont
            personne ne leur a donné les règles : sans savoir ce qui se dit, ce qui se tait,
            ni pourquoi la conversation passe sans eux.
          </p>

          <p className="manifeste_paragraphe">
            Les codes s’apprennent. Le vocabulaire, les références, la prononciation — et la
            sobriété qui les fait tenir. On n’apprend pas ici à mentir : on apprend à savoir.
            C’est ce qui fait qu’une salle écoute.
          </p>
        </section>
      </div>
    </>
  );
}
