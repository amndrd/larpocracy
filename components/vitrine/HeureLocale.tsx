'use client';

import { useEffect, useState } from 'react';

/**
 * L'heure locale en bas de page — la petite signature des sites de studio.
 *
 * Elle ne peut pas être rendue côté serveur : l'heure du serveur n'est pas
 * celle du visiteur, et React signalerait la divergence à l'hydratation. Le
 * bloc réserve donc sa place et ne se remplit qu'une fois monté.
 */
export default function HeureLocale({ lieu = 'Paris, France' }: { lieu?: string }) {
  const [heure, setHeure] = useState<string | null>(null);

  useEffect(() => {
    const lire = () =>
      setHeure(
        new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      );
    lire();
    // Une minute suffit : l'affichage ne montre pas les secondes.
    const t = setInterval(lire, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <p className="text-[0.8125rem] text-ink-3">
      {lieu}{' '}
      <span className="font-semibold tabular-nums text-ink">{heure ?? '—:—'}</span>
    </p>
  );
}
