import type { Metadata } from 'next';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'About',
  description: "Ce que fait LarpLvl, exactement — et la seule ligne qu'il ne franchira pas.",
};

export default function AboutPage() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <p className="chip">Manifeste</p>
      <h1 className="headline mt-3 text-[clamp(2.5rem,5.5vw,3.75rem)]">
        Ce que fait ce site, exactement
      </h1>

      <div className="prose-larp card mt-8 p-7 sm:p-10">
        <p>
          Les portes professionnelles ne s&apos;ouvrent presque jamais sur un CV. Elles
          s&apos;ouvrent sur une conversation. Et une conversation s&apos;ouvre sur une{' '}
          <em>surface d&apos;accroche</em> : le nombre de sujets sur lesquels vous pouvez
          répondre autre chose que « ah, je ne connais pas ».
        </p>
        <p>
          Quelqu&apos;un qui peut, dans la même soirée, dire quelque chose de juste sur un
          Barolo, sur la structure d&apos;un LBO, sur pourquoi la Royal Oak a changé
          l&apos;horlogerie, et sur pourquoi on ne tend jamais une carte de visite
          d&apos;une seule main à Tokyo — cette personne inspire confiance. Pas parce
          qu&apos;elle impressionne : parce qu&apos;elle donne à l&apos;autre le sentiment
          d&apos;être compris.
        </p>

        <h2 className="display mt-12 border-t border-line pt-8 text-[1.625rem] text-ink">
          L&apos;inégalité qu&apos;on attaque
        </h2>
        <p>
          Ce capital-là se transmet normalement par la famille, l&apos;école, le milieu. Il
          est invisible, jamais enseigné, jamais écrit nulle part. Ceux qui l&apos;ont ne
          savent même pas qu&apos;ils l&apos;ont. Ceux qui ne l&apos;ont pas croient
          qu&apos;il leur manque « quelque chose » sans pouvoir le nommer.
        </p>
        <p>LarpLvl écrit ce qui n&apos;est jamais écrit.</p>

        <h2 className="display mt-12 border-t border-line pt-8 text-[1.625rem] text-ink">
          Le nom
        </h2>
        <p>
          <strong>LarpLvl</strong> — de <em>LARP</em> (live action role play) et{' '}
          <em>-cracy</em>, le pouvoir. Le mot dit exactement ce que fait le site, avec
          l&apos;auto-dérision nécessaire pour que ce ne soit pas grotesque. On assume le
          jeu de rôle social : tout le monde le joue. Ceux qui prétendent le contraire sont
          simplement ceux qui en ont appris les règles sans s&apos;en apercevoir.
        </p>

        <h2 className="display mt-12 border-t border-line pt-8 text-[1.625rem] text-ink">
          La seule ligne rouge
        </h2>
        <p>
          Ce site enseigne la connaissance, les codes et l&apos;aisance. Il
          n&apos;enseignera jamais la fraude : pas de faux diplôme, pas de fausse
          référence, pas de fausse fortune, pas d&apos;usurpation.
        </p>
        <p>
          Ce n&apos;est pas seulement une position morale. C&apos;est un calcul. Une erreur
          de culture se rattrape en une phrase : un cépage confondu, un nom mal prononcé,
          une date approximative. Un mensonge vérifiable, lui, ne se rattrape jamais.
          C&apos;est le seul faux pas qui coûte définitivement.
        </p>

        <blockquote className="my-10 rounded-md bg-accent-3 px-6 py-5">
          <p className="display text-[1.5rem] italic leading-snug text-ink">
            Apprends pour de vrai. C&apos;est moins cher que de faire semblant.
          </p>
        </blockquote>

        <h2 className="display mt-12 border-t border-line pt-8 text-[1.625rem] text-ink">
          Comment c&apos;est écrit
        </h2>
        <ul className="ml-5 list-disc space-y-3">
          <li>
            <strong>Chaque fiche doit produire une phrase prononçable.</strong> Si après
            lecture vous ne pouvez rien <em>dire</em>, la fiche a échoué.
          </li>
          <li>
            <strong>Le fait avant le commentaire.</strong> Un chiffre, une date, un nom —
            ou le silence.
          </li>
          <li>
            <strong>Aucun fait inventé.</strong> Un site qui vous apprendrait à bluffer
            avec de fausses informations vous enverrait vous faire corriger en public.
          </li>
          <li>
            <strong>Toujours dire ce qui trahit.</strong> Chaque module a son anti-manuel.
          </li>
          <li>
            <strong>Sobriété.</strong> Sous-jouer bat surjouer, et le name-dropping est le
            marqueur numéro un de l&apos;imposteur.
          </li>
        </ul>

        <div className="my-10 rounded-md border border-line border-l-[3px] border-l-accent bg-canvas-2 px-6 py-5">
          <p className="text-[0.9375rem]">
            <strong>Le site n&apos;admire pas.</strong> Il explique. Les milieux décrits ici
            ne sont ni un panthéon ni une cible : ce sont des milieux avec des règles, et
            les règles s&apos;apprennent.
          </p>
        </div>

        <h2 className="display mt-12 border-t border-line pt-8 text-[1.625rem] text-ink">
          Ouvert
        </h2>
        <p>
          Tout est public : le code, le contenu, la feuille de route, et jusqu&apos;au
          journal des décisions.{' '}
          <a href="https://github.com/amndrd/larpocracy" className="link hover:link-hover">
            github.com/amndrd/larpocracy
          </a>
        </p>
      </div>
    </Container>
  );
}
