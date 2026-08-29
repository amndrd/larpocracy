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
            <span className="nav_volet_case_titre text-youth">{t}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
