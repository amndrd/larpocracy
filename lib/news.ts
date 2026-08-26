import newsJson from '@/content/news.json';
import type { NewsItem } from './types';

/**
 * Le journal de bord. Ajouter une entrée = ajouter un objet dans
 * `content/news.json` ; rien d'autre à toucher.
 */
export const news = (newsJson as NewsItem[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
