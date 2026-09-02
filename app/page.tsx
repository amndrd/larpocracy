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
            <span className="hero_ligne">well</span>
            <span className="hero_ligne">spoken</span>
          </h1>
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
