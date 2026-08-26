import { domains, getCards, stats as contenu } from './content';
import { distinctionsOf, rangOf, serieOf, xpOf } from './xp';
import type { ProgressRow } from './types';

/**
 * Assemble tout ce que l'interface affiche du parcours d'un utilisateur.
 * Fonction pure : elle ne lit rien, on lui passe les lignes déjà chargées.
 * C'est ce qui la rend testable et réutilisable côté serveur comme client.
 */
export function bilan(progress: ProgressRow[], jours: string[]) {
  const lues = new Set(progress.map((p) => p.card_id));

  const reponses = progress.reduce((a, p) => a + (p.quiz_correct ?? 0), 0);
  const reponsesTotal = progress.reduce((a, p) => a + (p.quiz_total ?? 0), 0);
  const cartes = progress.reduce((a, p) => a + (p.cards_known ?? 0), 0);
  const cartesTotal = progress.reduce((a, p) => a + (p.cards_total ?? 0), 0);

  const xp = xpOf({ fiches: lues.size, reponses, cartes });
  const rang = rangOf(xp);
  const serie = serieOf(jours);

  const domainesEntames = domains.filter((d) =>
    getCards(d.id).some((c) => lues.has(c.id)),
  ).length;

  const sansFaute = progress.filter(
    (p) => p.quiz_total != null && p.quiz_total > 0 && p.quiz_correct === p.quiz_total,
  ).length;

  const paquetsNets = progress.filter(
    (p) => p.cards_total != null && p.cards_total > 0 && p.cards_known === p.cards_total,
  ).length;

  return {
    xp,
    rang,
    serie,
    lues,
    fiches: lues.size,
    fichesTotal: contenu.cards,
    reponses,
    reponsesTotal,
    cartes,
    cartesTotal,
    domainesEntames,
    domainesOuverts: contenu.openDomains,
    sansFaute,
    paquetsNets,
    distinctions: distinctionsOf({
      fiches: lues.size,
      domaines: domainesEntames,
      serie,
      sansFaute,
      paquetsNets,
      xp,
    }),
  };
}

export type Bilan = ReturnType<typeof bilan>;
