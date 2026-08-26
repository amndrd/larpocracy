import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import { IconFleche } from './icons';
import { getCards } from '@/lib/content';
import { domainVars } from '@/lib/theme';
import { visuelOf } from '@/lib/visuels';
import type { Domain } from '@/lib/types';

/**
 * Vignette de domaine. La photo se fond dans la carte par le bas — sur fond
 * sombre, une image détourée franchement ferait autocollant.
 */
export default function DomainCard({ d, index = 0 }: { d: Domain; index?: number }) {
  const count = getCards(d.id).length;
  const ouvert = count > 0;
  const visuel = visuelOf(d.id);

  return (
    <Link
      href={`/d/${d.id}`}
      style={{ ...domainVars(d.id), animationDelay: `${Math.min(index, 8) * 55}ms` }}
      className="card card-lift group animate-fade-up relative flex flex-col overflow-hidden hover:card-lift-on"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-canvas-2">
        {visuel && (
          <Image
            src={visuel}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            className={
              'object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ' +
              (ouvert ? 'opacity-90' : 'opacity-45 grayscale-[60%]')
            }
          />
        )}
        {/* Teinte du domaine, puis fondu vers la carte : la photo n'a pas de bord bas. */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light opacity-50 transition-opacity duration-500 group-hover:opacity-25"
          style={{ background: 'var(--dom)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--color-surface) 2%, rgba(32,27,24,.55) 34%, transparent 72%)',
          }}
        />

        {/* Le numéro à la Toko : gros, dans la teinte, en pied d'image. */}
        <span className="display absolute left-5 bottom-3 text-[2.25rem] leading-none text-[var(--dom)] opacity-90">
          {String(d.n).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <h3 className="display text-[1.5rem] transition-colors duration-300 group-hover:text-[var(--dom)]">
          {d.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[0.875rem] leading-relaxed text-ink-2">
          {d.blurb}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge ton="domaine">{d.topics} sujets</Badge>
            {ouvert ? (
              <Badge ton="neutre">
                {count} fiche{count > 1 ? 's' : ''}
              </Badge>
            ) : (
              <Badge ton="neutre">Bientôt</Badge>
            )}
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-ink-3 transition-all duration-300 group-hover:bg-[var(--dom)] group-hover:text-canvas">
            <IconFleche className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
