'use client';

import { useEffect, useRef } from 'react';

/**
 * Le point qui suit le curseur.
 *
 * Il ne colle pas au pointeur : il le rattrape, d'un sixième de la distance à
 * chaque image. C'est ce retard qui lui donne son poids. Peint en différence,
 * il s'inverse sur ce qu'il survole — noir sur le papier, clair sur l'encre.
 *
 * Le CSS le réserve aux écrans d'au moins 768 px ; il reste caché jusqu'au
 * premier mouvement, pour ne pas se poser dans un coin au chargement.
 */
export default function PointCurseur() {
  const point = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = point.current;
    if (!el) return;

    // Le pointeur n'a pas de position tant qu'il n'a pas bougé.
    let visé: { x: number; y: number } | null = null;
    let x = 0;
    let y = 0;
    let image = 0;

    const suivre = (e: PointerEvent) => {
      if (!visé) {
        x = e.clientX;
        y = e.clientY;
        el.style.visibility = 'visible';
      }
      visé = { x: e.clientX, y: e.clientY };
    };

    const boucle = () => {
      if (visé) {
        x += (visé.x - x) / 6;
        y += (visé.y - y) / 6;
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      }
      image = requestAnimationFrame(boucle);
    };

    window.addEventListener('pointermove', suivre);
    image = requestAnimationFrame(boucle);
    return () => {
      window.removeEventListener('pointermove', suivre);
      cancelAnimationFrame(image);
    };
  }, []);

  return (
    <div
      ref={point}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-60 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-base mix-blend-difference md:block"
      /* `translate: none` neutralise les deux utilitaires de recentrage :
         le décalage de moitié est repris dans `transform`, qui seul est animé. */
      style={{ translate: 'none', visibility: 'hidden' }}
    />
  );
}
