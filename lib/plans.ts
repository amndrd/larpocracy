/**
 * Les formules. La facturation (Stripe) n'est pas encore branchée : le champ
 * `plan` de la table profiles existe déjà et vaut 'free' pour tout le monde.
 * Quand Stripe arrivera, seul le passage de 'free' à 'pro' changera.
 */
export type Plan = 'free' | 'pro';

export const PLANS = {
  free: {
    id: 'free' as const,
    name: 'Libre',
    price: '0 €',
    period: '',
    pitch: "Tout le contenu publié, sans limite de lecture.",
    features: [
      'Les 14 domaines et toutes les fiches publiées',
      'Recherche complète : fiches, termes, prononciations',
      'Quiz de vérification',
      'Progression enregistrée sur votre compte',
    ],
  },
  pro: {
    id: 'pro' as const,
    name: 'Pro',
    price: '—',
    period: 'à venir',
    pitch: "Ce qui viendra s'ajouter quand le contenu sera assez dense pour le justifier.",
    features: [
      'Parcours guidés : dîner d’affaires, premier gala, levée de fonds',
      'Fiches « 5 minutes avant » pour un événement précis',
      'Révision par répétition espacée',
      'Simulations de conversation à choix multiples',
      'Export PDF et fiches imprimables',
    ],
  },
} satisfies Record<Plan, unknown>;
