'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { SearchHit } from '@/lib/content';

export default function SearchBox() {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /* Recherche différée : on ne part pas au premier caractère. */
  useEffect(() => {
    if (q.trim().length < 2) {
      setHits([]);
      return;
    }
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
  }, [q]);

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
    if (q.trim().length < 2) return;
    setOpen(false);
    inputRef.current?.blur();
    router.push(`/recherche?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div ref={boxRef} className="relative w-40 sm:w-56 lg:w-72">
      <input
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => hits.length && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
          if (e.key === 'Escape') {
            setOpen(false);
            inputRef.current?.blur();
          }
        }}
        placeholder="Chercher…"
        aria-label="Rechercher"
        autoComplete="off"
        spellCheck={false}
        className="w-full border-b border-rule bg-transparent pb-1.5 text-[0.8125rem] text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none"
      />

      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[60vh] overflow-auto border border-rule bg-paper shadow-[0_12px_32px_rgba(20,20,15,0.10)]">
          {hits.length === 0 ? (
            <p className="px-4 py-3 text-[0.8125rem] text-ink-3">
              Rien pour l&apos;instant — le sujet attend peut-être d&apos;être écrit.
            </p>
          ) : (
            hits.map((h) => (
              <Link
                key={`${h.kind}-${h.label}-${h.href}`}
                href={h.href}
                onClick={() => setOpen(false)}
                className="block border-b border-rule-soft px-4 py-2.5 last:border-b-0 hover:bg-paper-2"
              >
                <span className="block text-[0.875rem] text-ink">{h.label}</span>
                <span className="mt-0.5 block text-[0.75rem] text-ink-3">
                  {h.kind} · {h.sub}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
