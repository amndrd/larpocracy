import Link from 'next/link';
import { IconFleche } from './icons';
import { domainVars } from '@/lib/theme';
import type { EntreeCatalogue } from '@/lib/catalogue';

/**
 * Le rail horizontal du registre : de grandes plaques qu'on fait défiler
 * latéralement, là où le reste de la page descend. Ce changement d'axe est le
 * geste — il casse la lecture verticale au tiers de la page.
 *
 * Pas de carrousel scripté : un débordement horizontal avec accrochage
 * (`snap`) fait le même travail, se manipule au doigt comme au trackpad,
 * reste navigable au clavier, et ne coûte pas une ligne de JavaScript.
 *
 * Sans image déclarée, chaque plaque affiche l'aplat de sa teinte plutôt
 * qu'un trou : le catalogue est présentable avant d'être illustré.
 */
export default function Rail({
  entrees,
  ouverts,
}: {
  entrees: EntreeCatalogue[];
  /** Les domaines qui ont vraiment des fiches — le reste s'annonce « à venir ». */
  ouverts: Set<string>;
}) {
  return (
    <div className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-7 lg:px-10">
      {entrees.map((d) => {
        const ouvert = ouverts.has(d.id);
        const numero = String(d.n).padStart(2, '0');

        const Plaque = (
          <>
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[var(--dom-tint)]"
              style={domainVars(d.id)}
            >
              {/* Le filet de teinte en haut de plaque : la seule couleur du
                  bloc, et elle change à chaque domaine. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: 'var(--dom)' }}
              />
              <span
                aria-hidden
                className="numero absolute top-6 left-6 text-[0.8125rem]"
                style={{ color: 'var(--dom)' }}
              >
                {numero}
              </span>
              <span
                aria-hidden
                className="mega absolute right-6 bottom-5 left-6 text-[clamp(2rem,3vw,2.75rem)] opacity-15"
                style={{ color: 'var(--dom)' }}
              >
                {d.titre}
              </span>
            </div>

            <div className="flex flex-1 flex-col pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="mega text-[1.375rem]">{d.titre}</h3>
                <span
                  className={
                    'shrink-0 text-[0.6875rem] font-medium tracking-[0.06em] uppercase ' +
                    (ouvert ? 'text-accent' : 'text-ink-4')
                  }
                >
                  {ouvert ? 'Ouvert' : 'À venir'}
                </span>
              </div>
              <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-3">{d.couvre}</p>
              {ouvert && (
                <span className="souligne mt-5 inline-flex w-fit items-center gap-2 text-[0.8125rem] font-medium text-ink group-hover:souligne-on">
                  Voir le domaine
                  <IconFleche className="size-3.5" />
                </span>
              )}
            </div>
          </>
        );

        const classes =
          'group flex w-[76vw] shrink-0 snap-start flex-col sm:w-[19rem] lg:w-[21rem]';

        // Un domaine sans fiche ne mène nulle part : le rendre cliquable
        // enverrait sur une page vide, ce que le catalogue promet d'éviter.
        return ouvert ? (
          <Link key={d.id} href={`/app/d/${d.id}`} className={classes}>
            {Plaque}
          </Link>
        ) : (
          <div key={d.id} className={classes}>
            {Plaque}
          </div>
        );
      })}
    </div>
  );
}
