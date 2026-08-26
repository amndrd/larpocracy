import { IconCadenas, IconEclair, IconFlamme, IconTrophee } from './icons';
import { ProgressBar } from './Progress';
import { clsx } from '@/lib/clsx';
import type { Bilan } from '@/lib/stats';

/** Les compteurs en pilule : points, série, rang. */
export function StatPills({ b, className }: { b: Bilan; className?: string }) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-2', className)}>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-3 px-3 py-1.5 text-[0.8125rem] font-semibold text-accent-ink">
        <IconEclair className="size-3.5" />
        <span className="tabular-nums">{b.xp.toLocaleString('fr-FR')}</span> pts
      </span>
      <span
        className={clsx(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold',
          b.serie > 0 ? 'bg-gold-2 text-gold' : 'bg-canvas-2 text-ink-3',
        )}
      >
        <IconFlamme className="size-3.5" />
        <span className="tabular-nums">{b.serie}</span> j
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas-2 px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-2">
        <IconTrophee className="size-3.5" />
        {b.rang.actuel.nom}
      </span>
    </div>
  );
}

/** La carte de rang : où on en est, et ce qu'il reste avant le suivant. */
export function RankCard({ b }: { b: Bilan }) {
  const restant = b.rang.suivant ? b.rang.suivant.seuil - b.xp : 0;

  return (
    <div className="card animate-fade-up overflow-hidden p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Votre rang</p>
          <p className="display mt-2 text-[2rem] leading-none">{b.rang.actuel.nom}</p>
        </div>
        <p className="display text-[2.5rem] leading-none text-accent">
          <span className="animate-count inline-block tabular-nums">
            {b.xp.toLocaleString('fr-FR')}
          </span>
          <span className="ml-1.5 text-[0.9375rem] font-sans font-semibold text-ink-3">pts</span>
        </p>
      </div>

      <ProgressBar value={b.rang.part * 100} total={100} className="mt-5" />

      <p className="mt-3 text-[0.8125rem] text-ink-3">
        {b.rang.suivant ? (
          <>
            Encore <strong className="font-semibold text-ink-2">{restant} points</strong> avant{' '}
            <strong className="font-semibold text-ink-2">{b.rang.suivant.nom}</strong>.
          </>
        ) : (
          'Dernier rang atteint. Il ne reste plus qu’à recevoir.'
        )}
      </p>
    </div>
  );
}

/** Le mur de distinctions. Celles qui manquent restent visibles, verrouillées. */
export function Distinctions({ b }: { b: Bilan }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {b.distinctions.map((d, i) => (
        <div
          key={d.id}
          style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
          className={clsx(
            'card animate-fade-up flex items-center gap-3.5 p-4',
            !d.obtenue && 'opacity-55',
          )}
        >
          <span
            className={clsx(
              'grid size-10 shrink-0 place-items-center rounded-full',
              d.obtenue ? 'bg-gold-2 text-gold' : 'bg-canvas-2 text-ink-3',
            )}
          >
            {d.obtenue ? <IconTrophee className="size-5" /> : <IconCadenas className="size-4" />}
          </span>
          <span className="min-w-0">
            <span className="block text-[0.9375rem] font-semibold text-ink">{d.nom}</span>
            <span className="block text-[0.75rem] text-ink-3">{d.detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
