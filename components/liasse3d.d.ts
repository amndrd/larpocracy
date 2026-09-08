import type * as THREE from 'three';

/**
 * Les types de `liasse3d.js`.
 *
 * Le module est en JavaScript et le restera (voir son en-tête) : c'est ici
 * que TypeScript apprend ce qu'il expose. Un `.d.ts` posé à côté d'un `.js`
 * du même nom l'emporte sur lui à la résolution — le `.js` n'est donc jamais
 * lu par le compilateur, seulement par le bundler.
 */

/** Les réglages. Tous facultatifs : `defaults` fournit le reste. */
export interface Réglages {
  /** Le nombre de feuilles. 92 font une liasse de 10 000 $. */
  bills: number;
  /** L'épaisseur d'une feuille, en hauteurs de billet. */
  thickness: number;
  /** La banderole de papier autour de la liasse. */
  strap: boolean;
  denomination: string;
  issuer: string;
  spelled: string;
  series: string;
  serial: string;
  /** L'encre, le papier, la banderole — en notation CSS. */
  ink: string;
  paper: string;
  strapColor: string;
  /** La rotation d'ambiance, sa vitesse en rad/s, et le repos avant reprise. */
  autoRotate: boolean;
  autoRotateSpeed: number;
  idleDelay: number;
  /** La distance de la caméra, en hauteurs de billet. */
  distance: number;
  exposure: number;
  /** Les ombres portées, puis celle au sol sous la liasse. */
  shadow: boolean;
  groundShadow: boolean;
  maxPixelRatio: number;
  /** La graine du hasard : à graine égale, liasse identique. */
  seed: number;
  onFrame: ((orientation: THREE.Quaternion, distance: number) => void) | null;

  /* Les quatre réglages ajoutés par le site (#038). */

  /** `false` : ni glisser, ni molette, ni clavier. */
  interaction: boolean;
  /** La largeur du canvas de la face imprimée, en pixels. Le dos en prend la moitié. */
  noteTexture: number;
  /** Le côté de la carte d'ombre, en pixels. */
  shadowMapSize: number;
  /** Appelé une fois, à la première image peinte. */
  onReady: (() => void) | null;
}

/** Ce que rend `create`. */
export interface Liasse {
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Le pivot : c'est lui qui porte l'orientation de la liasse. */
  object: THREE.Group;
  /** Ramène l'orientation, le cadrage et la distance à leur valeur de départ. */
  reset(): void;
  setAutoRotate(actif: boolean): boolean;
  isAutoRotate(): boolean;
  /** Défait tout : la boucle, les écouteurs, les textures, le contexte WebGL. */
  destroy(): void;
}

/** Le rapport d'un billet : 156 / 66,3. */
export declare const NOTE_RATIO: number;

/** Les valeurs par défaut, telles que les décrit `Réglages`. */
export declare const defaults: Réglages;

/**
 * Monte la liasse dans un conteneur — un élément, ou un sélecteur.
 * Le canvas prend toute sa boîte et suit ses redimensionnements.
 *
 * Lève si le contexte WebGL n'est pas accordé : c'est à l'appelant de le
 * rattraper.
 */
export declare function create(
  container: HTMLElement | string,
  options?: Partial<Réglages>,
): Liasse;

/** Un billet seul, en `<canvas>` — pour une impression, ou pour texturer autre chose. */
export declare function note(
  options?: Partial<Réglages>,
  side?: 'front' | 'back',
  size?: number,
): HTMLCanvasElement;
