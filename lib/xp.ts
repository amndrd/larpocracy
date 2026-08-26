/**
 * Le jeu : points, rangs, séries, distinctions.
 *
 * Tout est **dérivé de l'activité réelle** — aucune monnaie inventée, aucun
 * point offert. C'est la contrepartie du principe « zéro fraude » : un
 * compteur qui monte sans qu'on ait rien appris ne vaut rien.
 */

export const POINTS = {
  fiche: 10, // une fiche lue
  reponse: 5, // une bonne réponse au test
  carte: 2, // une carte jugée « je savais »
} as const;

export type Rang = { seuil: number; nom: string };

/** Sept rangs, du visiteur toléré à celui qui reçoit. */
export const RANGS: Rang[] = [
  { seuil: 0, nom: 'Invité' },
  { seuil: 100, nom: 'Habitué' },
  { seuil: 250, nom: 'Introduit' },
  { seuil: 500, nom: 'Familier' },
  { seuil: 900, nom: 'Initié' },
  { seuil: 1500, nom: 'Connaisseur' },
  { seuil: 2500, nom: 'Maître de maison' },
];

export type Compte = {
  fiches: number;
  reponses: number;
  cartes: number;
};

export function xpOf(c: Compte): number {
  return c.fiches * POINTS.fiche + c.reponses * POINTS.reponse + c.cartes * POINTS.carte;
}

/** Rang courant, rang suivant, et la part parcourue entre les deux. */
export function rangOf(xp: number) {
  let i = 0;
  for (let k = 0; k < RANGS.length; k++) if (xp >= RANGS[k].seuil) i = k;
  const actuel = RANGS[i];
  const suivant = RANGS[i + 1] ?? null;
  const part = suivant
    ? (xp - actuel.seuil) / (suivant.seuil - actuel.seuil)
    : 1;
  return { actuel, suivant, part: Math.max(0, Math.min(1, part)), index: i };
}

/**
 * Série : nombre de jours consécutifs jusqu'à aujourd'hui.
 * Une journée manquée remet à zéro, mais on tolère que le dernier jour
 * actif soit hier — sinon la série tomberait avant même la fin de la journée.
 */
export function serieOf(jours: string[], aujourdhui = new Date()): number {
  if (jours.length === 0) return 0;
  const set = new Set(jours);
  const curseur = new Date(
    Date.UTC(aujourdhui.getUTCFullYear(), aujourdhui.getUTCMonth(), aujourdhui.getUTCDate()),
  );
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  if (!set.has(iso(curseur))) {
    curseur.setUTCDate(curseur.getUTCDate() - 1);
    if (!set.has(iso(curseur))) return 0;
  }

  let n = 0;
  while (set.has(iso(curseur))) {
    n++;
    curseur.setUTCDate(curseur.getUTCDate() - 1);
  }
  return n;
}

export type Distinction = {
  id: string;
  nom: string;
  detail: string;
  obtenue: boolean;
};

/** Les distinctions se déduisent des mêmes chiffres : rien à stocker. */
export function distinctionsOf(d: {
  fiches: number;
  domaines: number;
  serie: number;
  sansFaute: number;
  paquetsNets: number;
  xp: number;
}): Distinction[] {
  return [
    {
      id: 'premiere-fiche',
      nom: 'Premier pas',
      detail: 'Lire une première fiche',
      obtenue: d.fiches >= 1,
    },
    {
      id: 'sans-faute',
      nom: 'Sans faute',
      detail: 'Réussir un test sans aucune erreur',
      obtenue: d.sansFaute >= 1,
    },
    {
      id: 'paquet-net',
      nom: 'Paquet net',
      detail: 'Savoir toutes les cartes d’une fiche',
      obtenue: d.paquetsNets >= 1,
    },
    {
      id: 'trois-domaines',
      nom: 'Trois pièces',
      detail: 'Entamer trois domaines différents',
      obtenue: d.domaines >= 3,
    },
    {
      id: 'serie-7',
      nom: 'Une semaine',
      detail: 'Sept jours d’affilée',
      obtenue: d.serie >= 7,
    },
    {
      id: 'initie',
      nom: 'Initié',
      detail: 'Atteindre 900 points',
      obtenue: d.xp >= 900,
    },
  ];
}
