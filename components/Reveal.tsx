'use client';

import { useEffect, useRef } from 'react';

/**
 * Révélation au défilement : le bloc arrive en fondu et remonte de quelques
 * pixels quand il entre dans le cadre. C'est le seul mouvement du modèle —
 * il n'utilise aucune animation CSS, tout est déclenché par le défilement.
 *
 * L'état initial est porté par la feuille de style (`[data-reveal]`), pas par
 * une classe : le bloc est donc déjà invisible au premier rendu, sans
 * clignotement avant l'hydratation.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Décalage en millisecondes, pour faire arriver une grille en cascade. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        el.dataset.reveal = 'vu';
        io.disconnect(); // une révélation ne se rejoue pas
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal="" style={{ transitionDelay: `${delay}ms` }} className={className}>
      {children}
    </div>
  );
}
