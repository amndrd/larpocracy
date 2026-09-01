/**
 * L'accroche : le premier écran, sous l'en-tête.
 *
 * Elle dit trois choses dans cet ordre — ce qu'on apprend, pourquoi, et à
 * quoi ça ressemble. La troisième est la plus importante : plutôt que de
 * décrire le format « Dis ça / Pas ça », elle en montre un. C'est le
 * différenciateur du site ; il vaut mieux le donner que le raconter.
 *
 * L'exemple est vrai, comme tout le reste : le barolo est un vin du Piémont
 * tiré du seul nebbiolo. Confondre l'appellation et le cépage est l'erreur
 * exacte que le site apprend à ne pas commettre.
 *
 * Rien ici n'est un composant client : l'entrée en cascade est une animation
 * CSS jouée au chargement, elle n'a besoin d'aucun JavaScript.
 */
export default function Accroche() {
  return (
    <section className="accroche">
      <p className="accroche_etiquette text-youth">
        <span className="accroche_point" aria-hidden="true" />
        Culture générale appliquée
      </p>

      {/* Chaque ligne monte derrière son propre cache : d'où les deux
          enveloppes, l'une qui coupe, l'autre qui bouge. */}
      <h1 className="accroche_titre text-youth">
        <span className="accroche_ligne">
          <span>L&rsquo;art de</span>
        </span>
        <span className="accroche_ligne">
          <span>tenir la salle.</span>
        </span>
      </h1>

      <p className="accroche_texte">
        Les codes, le vocabulaire et les références des milieux du business,
        du luxe et du pouvoir. De quoi tenir une conversation crédible avec
        n&rsquo;importe qui, dans n&rsquo;importe quelle pièce.{' '}
        <strong>On n&rsquo;apprend pas à mentir : on apprend à savoir.</strong>
      </p>

      <figure className="accroche_demo">
        <p className="accroche_demo_ligne">
          <span className="accroche_demo_marque text-youth">Dis ça</span>
          <span className="accroche_demo_dit">
            « Un barolo, c&rsquo;est du nebbiolo. »
          </span>
        </p>
        <p className="accroche_demo_ligne --pas">
          <span className="accroche_demo_marque text-youth">Pas ça</span>
          <span className="accroche_demo_dit">
            « J&rsquo;adore le barolo, c&rsquo;est mon cépage préféré. »
          </span>
        </p>
        <figcaption className="accroche_demo_note">
          Barolo est un lieu. Le cépage, c&rsquo;est le nebbiolo.
        </figcaption>
      </figure>
    </section>
  );
}
