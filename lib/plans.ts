/**
 * Les formules.
 *
 * Le modèle est freemium depuis la décision #025 : une fiche porte
 * `"free": true` et reste ouverte à tous, ou ne le porte pas et demande Pro.
 * La facturation (Stripe) n'est pas branchée — le champ `plan` de la table
 * profiles existe et vaut 'free' pour tout le monde. Quand Stripe arrivera,
 * seul le passage de 'free' à 'pro' changera.
 */
export type Plan = 'free' | 'pro';

/**
 * Le montant reste à fixer. Il est isolé ici pour n'avoir qu'une ligne à
 * changer le jour où il est arrêté — et pour qu'aucun prix inventé ne traîne
 * dans une page.
 */
export const PRIX_PRO = '—';

export const PLANS = {
  free: {
    id: 'free' as const,
    name: 'Libre',
    price: '0 €',
    period: 'pour toujours',
    pitch: "De quoi juger sur pièce, sans donner de carte bancaire.",
    features: [
      'Les fiches marquées libres, entièrement',
      'Les trois modes dessus : lire, cartes, test',
      'Points, rang, série et distinctions',
      'Recherche dans le contenu ouvert',
      'Progression enregistrée sur votre compte',
    ],
  },
  pro: {
    id: 'pro' as const,
    name: 'Pro',
    price: PRIX_PRO,
    period: 'bientôt',
    pitch: "Tout le contenu, sans verrou, y compris ce qui sera publié ensuite.",
    features: [
      'Toutes les fiches des 14 domaines',
      'Tout le lexique et toutes les prononciations',
      'Recherche complète, contenu verrouillé compris',
      'Les nouveaux domaines dès leur publication',
      'Soutient directement l’écriture de la suite',
    ],
  },
} satisfies Record<Plan, unknown>;
