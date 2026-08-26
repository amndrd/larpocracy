import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import { IconFleche } from './icons';
import { getCards } from '@/lib/content';
import { domainVars } from '@/lib/theme';
import { visuelOf } from '@/lib/visuels';
import type { Domain } from '@/lib/types';

/** Vignette de domaine : photo, teinte propre, et l'état du remplissage. */
export default function DomainCard({ d, index = 0 }: { d: Domain; index?: number }) {
  const count = getCards(d.id).length;
  const ouvert = count > 0;
  const visuel = visuelOf(d.id);

  return (
    <Link
      href={`/d/${d.id}`}
      style={{ ...domainVars(d.id), animationDelay: `${Math.min(index, 8) * 55}ms` }}
      className="card card-lift group animate-fade-up flex flex-col overflow-hidden hover:card-lift-on"
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
              (ouvert ? '' : 'grayscale-[55%]')
            }
          />
        )}
        {/* Le dégradé à la teinte du domaine unifie des photos d'origines diverses. */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply opacity-55 transition-opacity duration-500 group-hover:opacity-35"
          style={{
            background: `linear-gradient(150deg, var(--dom) 0%, transparent 62%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: 'linear-gradient(to top, rgba(10,12,16,.72), transparent)' }}
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-2.5 py-1 font-mono text-[0.6875rem] font-semibold text-ink shadow-xs backdrop-blur-sm">
          {String(d.n).padStart(2, '0')}
        </span>

        <h3 className="display absolute inset-x-5 bottom-4 text-[1.5rem] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,.45)]">
          {d.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-3 flex-1 text-[0.875rem] leading-relaxed text-ink-2">{d.blurb}</p>

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
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-canvas-2 text-ink-3 transition-all duration-300 group-hover:bg-[var(--dom)] group-hover:text-white">
            <IconFleche className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
