/**
 * Le programme annoncé : les quatorze domaines de la carte.
 *
 * Ce n'est pas du contenu — `content/domains.json` reste la source de vérité
 * de ce qui est *publié*. Cette liste-ci dit ce que le site couvrira, et la
 * vitrine s'en sert pour son index et son bandeau. La page recoupe les deux
 * pour marquer « Ouvert » ce qui existe vraiment : le programme ne peut donc
 * jamais laisser croire qu'une fiche est là quand elle ne l'est pas.
 *
 * Les identifiants sont ceux de `lib/theme.ts` : une teinte les attend déjà.
 */
export type EntreeCatalogue = {
  id: string;
  n: number;
  titre: string;
  couvre: string;
};

export const CATALOGUE: EntreeCatalogue[] = [
  { id: 'cave-table', n: 1, titre: 'Cave & Table', couvre: 'Vin, champagne, spiritueux, gastronomie, cigares' },
  { id: 'vestiaire', n: 2, titre: 'Vestiaire', couvre: 'Costume, chemise, souliers, dress codes, parfum' },
  { id: 'horlogerie', n: 3, titre: 'Horlogerie & Joaillerie', couvre: 'Complications, pierres, maisons, marché secondaire' },
  { id: 'machines', n: 4, titre: 'Machines', couvre: 'Automobile, jets, yachts, aviation' },
  { id: 'lieux', n: 5, titre: 'Lieux', couvre: 'Palaces, clubs privés, stations, immobilier prime' },
  { id: 'business', n: 6, titre: 'Business & Finance', couvre: 'Marchés, PE, VC, M&A, valorisation, négociation' },
  { id: 'pouvoir', n: 7, titre: 'Pouvoir & Réseaux', couvre: 'Groupes de luxe, dynasties, institutions, philanthropie' },
  { id: 'art', n: 8, titre: 'Art & Marché', couvre: 'Histoire de l’art, galeries, foires, enchères' },
  { id: 'culture', n: 9, titre: 'Culture', couvre: 'Architecture, design, musique, opéra, littérature, cinéma' },
  { id: 'codes', n: 10, titre: 'Codes & Étiquette', couvre: 'Table, protocole, titres, invitations, codes par pays' },
  { id: 'conversation', n: 11, titre: 'Conversation & Réseau', couvre: 'Small talk, storytelling, networking, présence' },
  { id: 'monde', n: 12, titre: 'Monde', couvre: 'Géographie, cultures, religions, géopolitique, prononciation' },
  { id: 'sport', n: 13, titre: 'Sport & Loisirs', couvre: 'Golf, équitation, voile, ski, F1, tennis, chasse' },
  { id: 'meta-larp', n: 14, titre: 'Méta-Larp', couvre: 'Signaling, erreurs qui trahissent, éthique, entraînement' },
];
