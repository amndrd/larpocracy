/**
 * Le contenu des volets de la barre.
 *
 * Deux entrées seulement en ouvrent un — About et Features. Les six cases
 * de chacun mènent à une ancre de la page correspondante ; ni les pages ni
 * les ancres n'existent encore, comme les six adresses de la barre.
 *
 * Rien n'est inventé : chaque case reprend une section du contexte projet
 * (`CLAUDE.md`, § 1 à § 8). Une case qui ne renverrait à rien serait une
 * promesse, et le site n'en fait pas.
 */
export type CaseVolet = {
  /** Le titre, tel qu'il s'inscrit sur la case. La casse est faite en CSS. */
  titre: string;
  /** L'ancre, ajoutée à l'adresse de l'onglet. */
  ancre: string;
};

export const VOLETS: Record<string, readonly CaseVolet[]> = {
  '/about': [
    { titre: 'Le projet', ancre: 'projet' },
    { titre: 'La méthode', ancre: 'methode' },
    { titre: 'Les 14 domaines', ancre: 'domaines' },
    { titre: 'Pour qui', ancre: 'pour-qui' },
    { titre: "L'éthique", ancre: 'ethique' },
    { titre: 'Le mot « larp »', ancre: 'larp' },
  ],
  '/features': [
    { titre: 'Les fiches', ancre: 'fiches' },
    { titre: 'Dis ça / Pas ça', ancre: 'dis-ca' },
    { titre: 'La prononciation', ancre: 'prononciation' },
    { titre: 'Le mode cartes', ancre: 'cartes' },
    { titre: 'Les quiz', ancre: 'quiz' },
    { titre: 'Les trois niveaux', ancre: 'niveaux' },
  ],
};
