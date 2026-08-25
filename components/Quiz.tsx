'use client';

import { useState } from 'react';
import { clsx } from '@/lib/clsx';
import { rich } from '@/lib/mdlite';
import type { QuizItem } from '@/lib/types';

export default function Quiz({ items }: { items: QuizItem[] }) {
  const [picks, setPicks] = useState<Record<number, number>>({});

  return (
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
  );
}
