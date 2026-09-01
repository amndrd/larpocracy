import Link from 'next/link';
import type { CaseVolet } from './volets';

/**
 * Le volet qui se déploie à droite de la barre, au survol d'une pastille.
 *
 * Même matière que les pastilles — un voile noir et un flou d'arrière-plan —
 * mais plus dense, pour qu'il se détache d'elles au lieu de s'y fondre.
 *
 * Il n'est jamais retiré du balisage : fermé, il est seulement `hidden` au
 * sens de la visibilité, ce qui le retire aussi de l'arbre d'accessibilité
 * et rend ses liens infocusables. C'est la même règle que l'étiquette des
 * pastilles — le contenu reste lisible aux moteurs de recherche.
 */
export default function VoletNav({
  titre,
  href,
  cases,
  ouvert,
  surEntree,
  surSortie,
}: {
  titre: string;
  href: string;
  cases: readonly CaseVolet[];
  ouvert: boolean;
  surEntree: () => void;
  surSortie: () => void;
}) {
  return (
    <div
      className={`nav_volet${ouvert ? ' --ouvert' : ''}`}
      onMouseEnter={surEntree}
      onMouseLeave={surSortie}
    >
      <p className="nav_volet_titre text-youth">{titre}</p>

      <div className="nav_volet_grille">
        {cases.map(({ titre: t, ancre }) => (
          <Link key={ancre} className="nav_volet_case" href={`${href}#${ancre}`}>
            {/* Le fond porte seul le lustre : c'est lui qui recule au survol,
                et c'est là que viendra l'image quand il y en aura une. */}
            <span className="nav_volet_case_fond" aria-hidden="true" />

            {/* La flèche est dans le titre, non à côté : elle suit ainsi le
                dernier mot, quelle que soit la longueur de l'étiquette.

                Ce n'est pas un dessin mais une lettre — le caractère ↗ de la
                Youth, comme sur le modèle. La grasse en donne une flèche
                pleine, plus épaisse que tout tracé au trait, et qui suit le
                corps et la couleur du titre sans qu'on ait à les lui redire. */}
            <span className="nav_volet_case_titre text-youth">
              {t}
              <span className="nav_volet_case_fleche" aria-hidden="true">
                ↗
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
