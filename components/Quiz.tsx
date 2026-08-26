'use client';

import { useEffect, useRef, useState } from 'react';
import { IconNon, IconOui } from './icons';
import { clsx } from '@/lib/clsx';
import { rich } from '@/lib/mdlite';
import type { QuizItem } from '@/lib/types';

type Props = {
  items: QuizItem[];
  domainId: string;
  cardId: string;
  onComplete: (domainId: string, cardId: string, correct: number, total: number) => Promise<void>;
};

export default function Quiz({ items, domainId, cardId, onComplete }: Props) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const sent = useRef(false);

  const answers = Object.entries(picks);
  const finished = answers.length === items.length;
  const correct = answers.filter(([qi, ai]) => items[Number(qi)].ok === ai).length;

  /* Le score part une seule fois, quand la dernière question est répondue. */
  useEffect(() => {
    if (!finished || sent.current) return;
    sent.current = true;
    void onComplete(domainId, cardId, correct, items.length).catch(() => {
      /* la progression n'est pas critique */
    });
  }, [finished, correct, items.length, domainId, cardId, onComplete]);

  return (
    <div className="space-y-4">
      {/* Compteur permanent : on voit son score se construire. */}
      <div className="flex items-center justify-between gap-4 rounded-lg bg-canvas-2 px-4 py-3">
        <span className="text-[0.8125rem] font-medium text-ink-2">
          {finished ? 'Test terminé' : `${answers.length} sur ${items.length} répondues`}
        </span>
        <span
          className={clsx(
            'font-mono text-[0.9375rem] font-semibold tabular-nums',
            finished ? 'text-accent' : 'text-ink-3',
          )}
        >
          {correct} / {items.length}
        </span>
      </div>

      {finished && (
        <p className="animate-pop rounded-lg bg-accent-3 px-4 py-3 text-[0.875rem] text-accent">
          <strong className="font-semibold">
            {correct === items.length
              ? 'Sans faute.'
              : correct >= items.length / 2
                ? 'Bonne base.'
                : 'À reprendre.'}
          </strong>{' '}
          Score enregistré si vous êtes connecté.
        </p>
      )}

      <ol className="space-y-4">
        {items.map((q, qi) => {
          const picked = picks[qi];
          const answered = picked !== undefined;
          return (
            <li key={qi} className="card p-5 sm:p-6">
              <p className="eyebrow">Question {qi + 1}</p>
              <p className="mt-2 text-[1rem] font-medium leading-snug text-ink">{rich(q.q)}</p>

              <div className="mt-4 space-y-2">
                {q.a.map((choice, ai) => {
                  const isRight = ai === q.ok;
                  const isPicked = picked === ai;
                  return (
                    <button
                      key={ai}
                      type="button"
                      disabled={answered}
                      onClick={() => setPicks((p) => ({ ...p, [qi]: ai }))}
                      className={clsx(
                        'pressable flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-[0.9375rem]',
                        !answered &&
                          'border-line bg-surface hover:border-accent/40 hover:bg-accent-3 active:translate-y-[1px]',
                        answered && isRight && 'border-yes/35 bg-yes-2 text-yes',
                        answered && isPicked && !isRight && 'border-no/35 bg-no-2 text-no',
                        answered && !isRight && !isPicked && 'border-line-soft text-ink-3',
                      )}
                    >
                      <span
                        className={clsx(
                          'grid size-6 shrink-0 place-items-center rounded-full text-[0.6875rem] font-semibold',
                          !answered && 'bg-canvas-2 text-ink-3',
                          answered && isRight && 'bg-yes text-white',
                          answered && isPicked && !isRight && 'bg-no text-white',
                          answered && !isRight && !isPicked && 'bg-canvas-2 text-ink-3',
                        )}
                      >
                        {answered && isRight ? (
                          <IconOui className="size-3.5" />
                        ) : answered && isPicked ? (
                          <IconNon className="size-3.5" />
                        ) : (
                          String.fromCharCode(65 + ai)
                        )}
                      </span>
                      <span className="flex-1">{rich(choice)}</span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <p className="animate-slide-in mt-4 rounded-md border-l-[3px] border-accent bg-accent-3 px-4 py-3 text-[0.875rem] leading-relaxed text-ink-2">
                  {rich(q.why)}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
