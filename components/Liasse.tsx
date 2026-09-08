'use client';

import { useEffect, useRef } from 'react';
import type { Liasse as Objet3D, Réglages } from './liasse3d';
import { signalerLiasse } from './liassePrete';

/**
 * Ce que le site retient des réglages du modèle.
 *
 * Le reste — les 92 billets, la banderole, les couleurs, la graine — est pris
 * tel quel : c'est la liasse du modèle, et elle n'a pas à changer d'aspect en
 * changeant de page.
 */
const RÉGLAGES: Partial<Réglages> = {
  /* On ne la manipule pas. Elle remplace une image, elle en tient le rôle :
     elle tourne seule, elle ne prend ni le pointeur ni le défilement. */
  interaction: false,

  /* Rien sous la liasse : elle est posée devant un titre, pas sur un sol. */
  groundShadow: false,

  /* La caméra avance, de six hauteurs de billet à quatre : la liasse remplit
     sa boîte au lieu d'y flotter. C'est ici que se règle sa taille — la
     feuille de style ne cote que la boîte, et les deux se tiennent : voir
     `.hero_liasse`, qui dit laquelle commande à l'autre. */
  distance: 3.9,

  /* Le modèle dessinait ses faces pour un plein écran. Ici la liasse fait un
     tiers de la largeur : la moitié de la définition suffit, et c'est autant
     de mémoire et de temps de dessin en moins au chargement. Le dos descend
     à 512 tout seul — on ne le voit que par la tranche. */
  noteTexture: 1024,
  shadowMapSize: 1024,

  /* Le seul objet peint en WebGL de la page n'a pas besoin de quatre fois les
     pixels de l'écran pour rester net à cette taille. */
  maxPixelRatio: 1.5,
};

/**
 * La liasse de billets, au centre du titre du hero (#038).
 *
 * Elle prend la place du rouleau en image (#035) : même endroit, même rôle,
 * mais elle tourne. Le dessin est dans `liasse3d.js` ; ce composant ne fait
 * que lui donner une boîte, et défaire ce qu'il a fait.
 *
 * three.js n'est pas dans le paquet de la page : il vient d'un `import()`
 * différé, une fois le composant monté. La page reste prérendue en statique,
 * et le premier octet n'a pas à porter six cents kilos de moteur 3D.
 *
 * Sans WebGL — un vieux navigateur, une carte sur liste noire — `create` lève.
 * On tient alors la promesse quand même : le rideau d'intro l'attend, et rien
 * ne doit le retenir pour une liasse qui ne viendra pas.
 *
 * Sans JavaScript du tout, il ne reste que le `<noscript>` : le rouleau en
 * image, tel qu'il était. C'est le seul endroit où il sert encore.
 */
export default function Liasse() {
  const boîte = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boîte.current;
    if (!el) return;

    let objet: Objet3D | null = null;
    let annulé = false;

    import('./liasse3d')
      .then(({ create }) => {
        if (annulé) return;
        objet = create(el, { ...RÉGLAGES, onReady: signalerLiasse });
      })
      .catch((erreur) => {
        /* Pas de WebGL, ou le module qui n'arrive pas : la page se passera de
           liasse, mais le rideau ne doit pas rester baissé pour autant. La
           trace n'est laissée qu'en développement — en production, l'absence
           de liasse n'est pas une panne à signaler au visiteur. */
        if (process.env.NODE_ENV !== 'production') console.warn('Liasse :', erreur);
        signalerLiasse();
      });

    return () => {
      annulé = true;
      objet?.destroy();
    };
  }, []);

  return (
    <>
      <div ref={boîte} className="hero_liasse" />

      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero_rouleau"
          src="/money-roll.webp"
          alt="Un rouleau de billets de cent dollars"
          width={420}
          height={594}
        />
      </noscript>
    </>
  );
}
