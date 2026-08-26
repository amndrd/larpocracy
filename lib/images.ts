import type { Card, Domain } from './types';

/**
 * Les images vivent dans `public/images/` et sont **déclarées** dans le JSON
 * du contenu, jamais devinées par convention de nom : une convention implicite
 * produirait des images cassées dès qu'un fichier manque, et Next ne peut pas
 * vérifier l'existence d'un fichier au moment du rendu.
 *
 * Pas d'import statique ici — les fichiers sont ajoutés à la main après coup,
 * donc ils n'existent pas forcément quand le code est écrit.
 */
const DOSSIER = '/images/';

/** Bannière de l'accueil. Mettre le fichier dans `public/images/`. */
export const ACCUEIL_IMAGE: string | null = null;

function chemin(fichier: string | undefined | null): string | null {
  if (!fichier) return null;
  // Un chemin déjà complet est respecté tel quel.
  return fichier.startsWith('/') ? fichier : DOSSIER + fichier;
}

export function imageOfDomain(d: Domain): string | null {
  return chemin(d.image);
}

export function imageOfCard(c: Card): string | null {
  return chemin(c.image);
}

export function imageAccueil(): string | null {
  return chemin(ACCUEIL_IMAGE);
}
