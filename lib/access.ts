import type { Plan } from './plans';
import type { Card } from './types';

/**
 * Qui a le droit de lire quoi.
 *
 * Le modèle est volontairement le plus simple possible : une fiche porte
 * `"free": true` ou ne le porte pas. Pas de règle dérivée du niveau ou du
 * rang dans le domaine — une règle implicite se retournerait contre soi le
 * jour où une fiche de bases mériterait d'être l'appât payant.
 */
export function isFree(card: Card): boolean {
  return card.free === true;
}

export function canOpen(card: Card, plan: Plan): boolean {
  return plan === 'pro' || isFree(card);
}

/** Ce qu'on affiche d'un domaine : combien d'ouvertes sur combien. */
export function countFree(cards: Card[]): number {
  return cards.filter(isFree).length;
}
