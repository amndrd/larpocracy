'use client';

import { useEffect, useRef, useState } from 'react';

/** Le temps minimum que le rideau reste posé avant que le zoom parte. */
const ATTENTE = 600;

/** Le plafond : passé ce délai le rideau se lève, polices chargées ou non. */
const PLAFOND = 2000;

/** La durée du zoom, et les deux échelles de départ — les cotes du modèle. */
const ZOOM = 800;
const DEPART_X = 0.665;
const DEPART_Y = 0.7;

/** La durée du fondu — celle de `--duration-md`, qu'il faut savoir ici aussi. */
const FONDU = 420;

/** Une attente, en promesse — de quoi composer avec `document.fonts`. */
const tempo = (ms: number) => new Promise((suite) => setTimeout(suite, ms));

/** La courbe du modèle : cubique à l'entrée comme à la sortie. */
const courbe = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Le rideau d'intro, repris de moneyincheck.org (#033).
 *
 * Une page de papier millimétré posée devant le site, dont les cases grandissent
 * depuis le centre de la fenêtre jusqu'à rejoindre exactement celles de la
 * grille de fond — puis le rideau s'efface, et la page est déjà en place.
 * Le modèle y faisait aussi tourner une vidéo et écrire des coups d'échecs à
 * la main ; on n'en garde que la grille.
 *
 * Il se lève quand les polices sont prêtes, jamais avant `ATTENTE` ni après
 * `PLAFOND` : c'est là sa raison d'être autre que décorative — le titre du
 * hero est en Playfair, et sans rideau on le verrait sauter de la police de
 * secours à la sienne. Le modèle attendait de la même façon, mais sa vidéo.
 *
 * Le zoom joue sur `background-size` et `background-position`, jamais sur
 * `transform` : une mise à l'échelle épaissirait le trait, et le fond
 * cesserait d'être du papier technique. Ici les cases s'écartent, le trait
 * reste à un pixel — c'est ce qui donne l'impression d'avancer vers la page.
 *
 * Il est rendu par le serveur, et non monté après coup : autrement la page
 * s'afficherait le temps d'une image avant d'être recouverte.
 */
export default function RideauIntro() {
  const grille = useRef<HTMLDivElement>(null);
  const [fini, setFini] = useState(false);
  const [retiré, setRetiré] = useState(false);

  useEffect(() => {
    const el = grille.current;
    if (!el) return;

    /* Qui a demandé moins de mouvement n'a ni rideau ni zoom : le CSS a déjà
       masqué le rideau, on se contente ici de le retirer du balisage et de
       ne rien bloquer. Le modèle renonçait de même à son écran de chargement. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Différé d'un tour : React ne veut pas d'un `setState` posé à même le
      // corps de l'effet, qui relancerait un rendu en cascade.
      const vider = setTimeout(() => setRetiré(true), 0);
      return () => clearTimeout(vider);
    }

    let x = DEPART_X;
    let y = DEPART_Y;

    /* Le défilement est bloqué tant que le rideau est là : la page est déjà
       en place derrière, et une molette pendant l'intro la ferait défiler
       sans que rien ne bouge à l'écran. Le modèle faisait de même. */
    const défilement = document.documentElement.style.overflow;
    const rendreLeDéfilement = () => {
      document.documentElement.style.overflow = défilement;
    };
    document.documentElement.style.overflow = 'hidden';

    /* Les cotes au repos, relues sur la grille elle-même : c'est là que le zoom
       doit arriver, et le CSS en est seul juge. Vider les styles en ligne avant
       la lecture ne provoque pas de saut — rien n'est peint entre l'écriture et
       la lecture, qui sont dans la même tâche. */
    let repos = { cx: 0, cy: 0, ox: 0, oy: 0 };
    const mesurer = () => {
      el.style.backgroundSize = '';
      el.style.backgroundPosition = '';
      const style = getComputedStyle(el);
      // La grille est peinte en deux dégradés : le navigateur rend donc deux
      // couches identiques, séparées par une virgule. La première suffit.
      const couche = (v: string) => v.split(',')[0].trim().split(/\s+/).map(parseFloat);
      const [cx, cy] = couche(style.backgroundSize);
      const [ox, oy] = couche(style.backgroundPosition);
      repos = { cx, cy, ox, oy };
    };

    /* Les cases grandissent, et leur origine se rapproche du centre de la
       fenêtre dans la même proportion : c'est ce déplacement conjoint qui fait
       que la grille se déploie depuis le centre plutôt que depuis le coin. */
    const poser = () => {
      const mx = window.innerWidth / 2;
      const my = window.innerHeight / 2;
      el.style.backgroundSize = `${x * repos.cx}px ${y * repos.cy}px`;
      el.style.backgroundPosition = `${mx + x * (repos.ox - mx)}px ${my + y * (repos.oy - my)}px`;
    };

    const suivreFenêtre = () => {
      mesurer();
      poser();
    };

    mesurer();
    poser();
    window.addEventListener('resize', suivreFenêtre);

    let image = 0;
    const zoomer = (départ: number) => {
      const avancer = (maintenant: number) => {
        const t = Math.min(1, (maintenant - départ) / ZOOM);
        const p = courbe(t);
        x = DEPART_X + (1 - DEPART_X) * p;
        y = DEPART_Y + (1 - DEPART_Y) * p;
        poser();
        if (t < 1) {
          image = requestAnimationFrame(avancer);
          return;
        }
        rendreLeDéfilement();
        setFini(true);
        retirer = setTimeout(() => setRetiré(true), FONDU);
      };
      image = requestAnimationFrame(avancer);
    };

    let retirer: ReturnType<typeof setTimeout>;
    let annulé = false;

    Promise.race([
      Promise.all([document.fonts.ready, tempo(ATTENTE)]),
      tempo(PLAFOND),
    ]).then(() => {
      if (!annulé) zoomer(performance.now());
    });

    return () => {
      annulé = true;
      rendreLeDéfilement();
      window.removeEventListener('resize', suivreFenêtre);
      cancelAnimationFrame(image);
      clearTimeout(retirer);
    };
  }, []);

  if (retiré) return null;

  return (
    <div className={`rideau${fini ? ' --fini' : ''}`} aria-hidden="true">
      <div className="grille" ref={grille} />
    </div>
  );
}
