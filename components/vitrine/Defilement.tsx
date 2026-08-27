'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * L'indicateur de défilement du registre : un filet vertical au bord droit,
 * et un point qui descend avec la page.
 *
 * La position est écrite directement dans le style de l'élément plutôt que
 * dans l'état React : le défilement émet des dizaines d'événements par
 * seconde, et un rendu à chaque fois pour déplacer un point serait du gâchis.
 * Seule l'apparition en fin de page passe par l'état, elle ne change qu'une
 * fois.
 */
export default function Defilement() {
  const point = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const surDefilement = () => {
      const course = document.documentElement.scrollHeight - window.innerHeight;
      // Une page plus courte que l'écran n'a rien à indiquer.
      if (course <= 0) {
        setVisible(false);
        return;
      }
      setVisible(true);
      const part = Math.min(1, Math.max(0, window.scrollY / course));
      if (point.current) point.current.style.top = `${part * 100}%`;
    };

    surDefilement();
    window.addEventListener('scroll', surDefilement, { passive: true });
    window.addEventListener('resize', surDefilement);
    return () => {
      window.removeEventListener('scroll', surDefilement);
      window.removeEventListener('resize', surDefilement);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed top-1/2 right-6 z-40 hidden h-40 w-px -translate-y-1/2 bg-line lg:block"
    >
      <span
        ref={point}
        className="absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ top: '0%' }}
      />
    </div>
  );
}
