import GrilleFond from '@/components/GrilleFond';
import Header from '@/components/Header';
import Liasse from '@/components/Liasse';
import PointCurseur from '@/components/PointCurseur';
import RideauIntro from '@/components/RideauIntro';

/**
 * La page : le hero et son titre, puis le manifeste.
 *
 * Le corps de page est un `<main>` et non un `<div>` : c'est le repère que
 * cherche un lecteur d'écran pour sauter le cadre — l'en-tête recouvre toute
 * la fenêtre, et rien d'autre ne dit où commence ce qu'il y a à lire. La
 * classe ne change pas : le rideau d'intro commande à `.page` par le
 * combinateur de frères (#037), et les deux le restent.
 */
export default function Page() {
  return (
    <>
      <RideauIntro />
      <GrilleFond />
      <PointCurseur />
      <Header />
      <main className="page">
        <section className="hero">
          <h1 className="hero_titre">
            <span className="hero_ligne">Money</span>
            <span className="hero_ligne">talks</span>
          </h1>

          <Liasse />
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
      </main>
    </>
  );
}
