import type { StaticImageData } from 'next/image';
import creditsJson from '@/content/credits.json';

import art from '@/public/visuels/art.jpg';
import business from '@/public/visuels/business.jpg';
import caveTable from '@/public/visuels/cave-table.jpg';
import codes from '@/public/visuels/codes.jpg';
import conversation from '@/public/visuels/conversation.jpg';
import culture from '@/public/visuels/culture.jpg';
import heroImg from '@/public/visuels/hero.jpg';
import horlogerie from '@/public/visuels/horlogerie.jpg';
import lieux from '@/public/visuels/lieux.jpg';
import machines from '@/public/visuels/machines.jpg';
import metaLarp from '@/public/visuels/meta-larp.jpg';
import monde from '@/public/visuels/monde.jpg';
import pouvoir from '@/public/visuels/pouvoir.jpg';
import sport from '@/public/visuels/sport.jpg';
import vestiaire from '@/public/visuels/vestiaire.jpg';

/**
 * Les visuels sont importés statiquement : Next connaît alors leurs dimensions
 * et fabrique la miniature floutée affichée pendant le chargement.
 */
export const VISUELS: Record<string, StaticImageData> = {
  art,
  business,
  'cave-table': caveTable,
  codes,
  conversation,
  culture,
  horlogerie,
  lieux,
  machines,
  'meta-larp': metaLarp,
  monde,
  pouvoir,
  sport,
  vestiaire,
};

export const HERO = heroImg;

export type Credit = {
  fichier: string;
  titre: string;
  auteur: string;
  licence: string;
  source: string;
};

/**
 * Chaque visuel est sous licence libre et sa provenance est vérifiable.
 * La page /credits les liste toutes — c'est la contrepartie de leur usage.
 */
export const CREDITS = creditsJson as Record<string, Credit>;

export function visuelOf(domainId: string): StaticImageData | undefined {
  return VISUELS[domainId];
}
