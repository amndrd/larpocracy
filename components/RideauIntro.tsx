'use client';

import { useEffect, useState } from 'react';

/** Le temps que le rideau reste posé avant de se lever. */
const ATTENTE = 600;

/** La durée du fondu — celle de `--duration-md`, qu'il faut savoir ici aussi. */
const FONDU = 420;

/**
 * Le rideau d'intro, repris de moneyincheck.org (#033).
 *
 * Une page de papier millimétré posée devant le site, qui se retire au bout
 * d'un instant. Le modèle y faisait aussi tourner une vidéo et écrire des
 * coups d'échecs à la main ; on n'en garde que la grille.
 *
 * Il est rendu par le serveur, et non monté après coup : autrement la page
 * s'afficherait le temps d'une image avant d'être recouverte.
 */
export default function RideauIntro() {
  const [fini, setFini] = useState(false);
  const [retiré, setRetiré] = useState(false);

  useEffect(() => {
    const lever = setTimeout(() => setFini(true), ATTENTE);
    const retirer = setTimeout(() => setRetiré(true), ATTENTE + FONDU);
    return () => {
      clearTimeout(lever);
      clearTimeout(retirer);
    };
  }, []);

  if (retiré) return null;

  return (
    <div className={`rideau${fini ? ' --fini' : ''}`} aria-hidden="true">
      <div className="grille" />
    </div>
  );
}
