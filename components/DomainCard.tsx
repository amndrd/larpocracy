import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import { IconCadenas, IconFleche } from './icons';
import { countFree } from '@/lib/access';
import { getCards } from '@/lib/content';
import { imageOfDomain } from '@/lib/images';
import { domainVars } from '@/lib/theme';
import type { Plan } from '@/lib/plans';
import type { Domain } from '@/lib/types';

/**
 * Vignette de domaine. Sans image déclarée, la carte affiche un aplat teinté
 * plutôt qu'un trou : le catalogue reste présentable avant d'être illustré.
 */
export default function DomainCard({
  d,
  index = 0,
  plan = 'pro',
}: {
  d: Domain;
  index?: number;
  /** Sert à annoncer ce qui est ouvert : inutile de le préciser en vitrine. */
  plan?: Plan;
}) {
  const cards = getCards(d.id);
  const count = cards.length;
  const ouvert = count > 0;
  const libres = countFree(cards);
  const verrouille = plan === 'free' && count > libres;
  const image = imageOfDomain(d);
  const numero = String(d.n).padStart(2, '0');

  return (
    <Link
      href={`/app/d/${d.id}`}
      style={{ ...domainVars(d.id), animationDelay: `${Math.min(index, 8) * 55}ms` }}
      className="card card-lift group animate-fade-up flex flex-col overflow-hidden hover:card-lift-on"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--dom-tint)]">
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={
                'object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ' +
                (ouvert ? '' : 'grayscale-[55%]')
              }
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{ background: 'linear-gradient(to top, rgba(10,12,16,.55), transparent)' }}
            />
            <span className="display absolute left-5 bottom-3 text-[2.25rem] leading-none text-white/90">
              {numero}
            </span>
          </>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 90% at 20% 10%, color-mix(in srgb, var(--dom) 22%, transparent), transparent 65%)',
            }}
          >
            <span className="display absolute left-5 bottom-3 text-[2.75rem] leading-none text-[var(--dom)] opacity-45">
              {numero}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="display text-[1.5rem] transition-colors duration-300 group-hover:text-[var(--dom)]">
          {d.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[0.875rem] leading-relaxed text-ink-2">
          {d.blurb}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {d.topics > 0 && <Badge ton="domaine">{d.topics} sujets</Badge>}
            {ouvert ? (
              <Badge ton="neutre">
                {count} fiche{count > 1 ? 's' : ''}
              </Badge>
            ) : (
              <Badge ton="neutre">Bientôt</Badge>
            )}
            {verrouille && (
              <Badge ton="or">
                <IconCadenas className="size-3" />
                {libres} libre{libres > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-ink-3 transition-all duration-300 group-hover:bg-[var(--dom)] group-hover:text-canvas">
            <IconFleche className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
