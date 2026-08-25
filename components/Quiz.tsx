'use client';

import { useEffect, useRef, useState } from 'react';
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
    <>
      {finished && (
        <p className="mb-6 border-l-2 border-accent bg-paper-2 px-4 py-3 text-[0.875rem] text-ink-2">
          <strong className="text-ink">
            {correct} / {items.length}
          </strong>{' '}
          — score enregistré si vous êtes connecté.
        </p>
      )}
      <ol className="divide-y divide-rule-soft">
      {items.map((q, qi) => {
        const picked = picks[qi];
        const answered = picked !== undefined;
        return (
          <li key={qi} className="py-7 first:pt-0 last:pb-0">
            <p className="text-[0.9375rem] font-medium text-ink">
              {qi + 1}. {rich(q.q)}
            </p>
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
                      'block w-full border px-4 py-2.5 text-left text-[0.9375rem] transition-colors',
                      !answered && 'border-rule hover:border-ink hover:bg-paper-2',
                      answered && isRight && 'border-yes bg-yes/5 text-yes',
                      answered && isPicked && !isRight && 'border-no bg-no/5 text-no',
                      answered && !isRight && !isPicked && 'border-rule-soft text-ink-3',
                    )}
                  >
                    {rich(choice)}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className="mt-4 border-l-2 border-accent bg-paper-2 px-4 py-3 text-[0.875rem] leading-relaxed text-ink-2">
                {rich(q.why)}
              </p>
            )}
          </li>
        );
      })}
      </ol>
    </>
  );
}
