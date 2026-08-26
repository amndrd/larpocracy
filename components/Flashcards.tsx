'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonLink } from './Button';
import { IconChevron, IconMelanger, IconNon, IconOui, IconRetourner } from './icons';
import { ProgressBar } from './Progress';
import { clsx } from '@/lib/clsx';
import { rich } from '@/lib/mdlite';
import type { FlashCard } from '@/lib/content';

type Verdict = 'su' | 'revoir';

function melange(source: number[]) {
  const o = [...source];
  for (let i = o.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [o[i], o[j]] = [o[j], o[i]];
  }
  return o;
}

/**
 * Le paquet de cartes d'une fiche : recto le terme, verso la définition.
 * On retourne au clic, à l'espace ou à l'entrée ; on juge « su » ou
 * « à revoir » pour ne rejouer ensuite que ce qui n'est pas acquis.
 */
export default function Flashcards({ deck, retour }: { deck: FlashCard[]; retour: string }) {
  const [ordre, setOrdre] = useState<number[]>(() => deck.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [face, setFace] = useState<'recto' | 'verso'>('recto');
  const [verdicts, setVerdicts] = useState<Record<number, Verdict>>({});
  const [fini, setFini] = useState(false);

  const total = ordre.length;
  const idx = ordre[pos];
  const carte = deck[idx];

  const rejouer = useCallback((liste: number[]) => {
    setOrdre(liste);
    setPos(0);
    setFace('recto');
    setVerdicts({});
    setFini(false);
  }, []);

  const avance = useCallback(
    (v?: Verdict) => {
      if (v !== undefined) setVerdicts((p) => ({ ...p, [idx]: v }));
      if (pos + 1 >= total) {
        setFini(true);
        return;
      }
      setFace('recto');
      setPos((p) => p + 1);
    },
    [idx, pos, total],
  );

  const recule = useCallback(() => {
    setPos((p) => {
      if (p === 0) return p;
      setFace('recto');
      return p - 1;
    });
  }, []);

  /* Raccourcis clavier : le mode se joue sans quitter le clavier. */
  useEffect(() => {
    if (fini) return;
    const onKey = (e: KeyboardEvent) => {
      const cible = e.target as HTMLElement | null;
      if (cible && ['INPUT', 'TEXTAREA'].includes(cible.tagName)) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFace((f) => (f === 'recto' ? 'verso' : 'recto'));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        avance();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        recule();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [avance, recule, fini]);

  /* ---------- Écran de fin ---------- */
  if (fini) {
    const su = Object.values(verdicts).filter((v) => v === 'su').length;
    const aRevoir = ordre.filter((i) => verdicts[i] === 'revoir');

    return (
      <div className="card animate-pop mx-auto max-w-xl p-8 text-center sm:p-10">
        <p className="eyebrow">Paquet terminé</p>
        <p className="display mt-4 text-[3.5rem] leading-none">
          {su}
          <span className="text-ink-3">/{total}</span>
        </p>
        <p className="mt-3 text-[0.9375rem] text-ink-2">
          {aRevoir.length === 0
            ? 'Paquet net. Le vocabulaire est en place.'
            : `${aRevoir.length} carte${aRevoir.length > 1 ? 's' : ''} à reprendre — c'est là que se joue la différence.`}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {aRevoir.length > 0 && (
            <Button onClick={() => rejouer(aRevoir)}>
              Rejouer les {aRevoir.length} ratées
            </Button>
          )}
          <Button
            variante={aRevoir.length > 0 ? 'secondaire' : 'primaire'}
            onClick={() => rejouer(deck.map((_, i) => i))}
          >
            <IconRetourner className="size-4" />
            Tout reprendre
          </Button>
          <ButtonLink variante="fantome" href={retour}>
            Retour à la fiche
          </ButtonLink>
        </div>
      </div>
    );
  }

  /* ---------- Le paquet ---------- */
  const retourne = face === 'verso';

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-4">
        <span className="font-mono text-[0.8125rem] tabular-nums text-ink-3">
          {pos + 1} / {total}
        </span>
        <ProgressBar value={pos} total={total} className="flex-1" />
        <button
          type="button"
          onClick={() => rejouer(melange(deck.map((_, i) => i)))}
          className="pressable inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold text-ink-2 hover:bg-canvas-2 hover:text-ink"
        >
          <IconMelanger className="size-4" />
          Mélanger
        </button>
      </div>

      <div className="flip-scene h-[21rem] sm:h-[25rem]">
        <button
          type="button"
          onClick={() => setFace((f) => (f === 'recto' ? 'verso' : 'recto'))}
          aria-label={retourne ? 'Revenir au recto' : 'Retourner la carte'}
          className="flip-inner block w-full cursor-pointer text-left"
          data-face={face}
        >
          {/* Recto : le terme seul. */}
          <span className="flip-face card items-center justify-center px-7 py-8 shadow-lg sm:px-12">
            <span className="eyebrow absolute left-6 top-5">
              {carte.kind === 'nom' ? 'Nom propre' : 'Terme'}
            </span>
            <span className="display text-center text-[clamp(1.75rem,5vw,2.75rem)]">
              {carte.recto}
            </span>
            <span className="absolute inset-x-0 bottom-5 text-center text-[0.75rem] text-ink-3">
              Cliquer ou appuyer sur Espace pour retourner
            </span>
          </span>

          {/* Verso : la définition, et la ligne secondaire. */}
          <span
            className="flip-face card items-center justify-center overflow-auto px-7 py-10 shadow-lg sm:px-12"
            data-side="verso"
          >
            <span className="max-w-prose text-center text-[1.0625rem] leading-relaxed text-ink-2">
              {rich(carte.verso)}
            </span>
            {carte.note && (
              <span className="mt-5 rounded-full bg-accent-3 px-4 py-1.5 text-center font-mono text-[0.8125rem] text-accent">
                {carte.note}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Jugement : actif seulement une fois la carte retournée. */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => recule()}
          disabled={pos === 0}
          aria-label="Carte précédente"
          className="pressable grid size-11 place-items-center rounded-full border border-line bg-surface text-ink-2 shadow-xs hover:border-ink/20 hover:text-ink disabled:opacity-35"
        >
          <IconChevron className="size-4 rotate-180" />
        </button>

        <button
          type="button"
          onClick={() => avance('revoir')}
          disabled={!retourne}
          className={clsx(
            'pressable inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.875rem] font-semibold',
            'border border-no/25 bg-no-2 text-no shadow-[0_3px_0_var(--color-no-2)]',
            'hover:bg-no hover:text-white active:translate-y-[3px] active:shadow-none',
            !retourne && 'pointer-events-none opacity-35',
          )}
        >
          <IconNon className="size-4" />À revoir
        </button>

        <button
          type="button"
          onClick={() => avance('su')}
          disabled={!retourne}
          className={clsx(
            'pressable inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.875rem] font-semibold',
            'border border-yes/25 bg-yes-2 text-yes shadow-[0_3px_0_var(--color-yes-2)]',
            'hover:bg-yes hover:text-white active:translate-y-[3px] active:shadow-none',
            !retourne && 'pointer-events-none opacity-35',
          )}
        >
          <IconOui className="size-4" />
          Je savais
        </button>

        <button
          type="button"
          onClick={() => avance()}
          aria-label="Carte suivante"
          className="pressable grid size-11 place-items-center rounded-full border border-line bg-surface text-ink-2 shadow-xs hover:border-ink/20 hover:text-ink"
        >
          <IconChevron className="size-4" />
        </button>
      </div>
    </div>
  );
}
