'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IconRecherche } from './icons';
import type { SearchHit } from '@/lib/content';

const TONS: Record<SearchHit['kind'], string> = {
  fiche: 'bg-accent-3 text-accent-ink',
  terme: 'bg-surface-2 text-ink-2',
  nom: 'bg-gold-2 text-gold',
  domaine: 'bg-yes-2 text-yes',
};

export default function SearchBox() {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /* Le champ est-il assez rempli pour chercher ? */
  const active = q.trim().length >= 2;
  /* Les résultats affichés sont dérivés, jamais vidés depuis un effet. */
  const visible = active ? hits : [];

  /* Recherche différée : on ne part pas au premier caractère. */
  useEffect(() => {
    if (!active) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: ctrl.signal,
        });
        const data = (await res.json()) as { hits: SearchHit[] };
        setHits(data.hits);
        setOpen(true);
      } catch {
        /* requête annulée : rien à signaler */
      }
    }, 140);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, active]);

  /* Fermeture au clic extérieur */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* « / » met le focus dans le champ */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function submit() {
    if (!active) return;
    setOpen(false);
    inputRef.current?.blur();
    router.push(`/recherche?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <IconRecherche className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
      <input
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => visible.length > 0 && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
          if (e.key === 'Escape') {
            setOpen(false);
            inputRef.current?.blur();
          }
        }}
        placeholder="Chercher un terme, un nom…"
        aria-label="Rechercher"
        autoComplete="off"
        spellCheck={false}
        className="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-[0.875rem] text-ink transition-all duration-200 placeholder:text-ink-3 focus:border-accent/50 focus:bg-surface-2 focus:shadow-[var(--shadow-ring)] focus:outline-none"
      />

      {open && active && (
        <div className="animate-pop absolute left-0 right-0 top-full z-50 mt-2 max-h-[62vh] overflow-auto rounded-lg border border-line bg-surface p-1.5 shadow-xl">
          {visible.length === 0 ? (
            <p className="px-3 py-3 text-[0.8125rem] text-ink-3">
              Rien pour l&apos;instant — le sujet attend peut-être d&apos;être écrit.
            </p>
          ) : (
            visible.map((h) => (
              <Link
                key={`${h.kind}-${h.label}-${h.href}`}
                href={h.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2"
              >
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[0.625rem] font-semibold ${TONS[h.kind]}`}
                >
                  {h.kind}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.875rem] font-medium text-ink">
                    {h.label}
                  </span>
                  <span className="block truncate text-[0.75rem] text-ink-3">{h.sub}</span>
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
