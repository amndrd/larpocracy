export type Level = 1 | 2 | 3;

export type Domain = {
  id: string;
  n: number;
  title: string;
  tagline: string;
  blurb: string;
  topics: number;
  module: boolean;
  keywords?: string[];
  /** Nom du fichier déposé dans `public/images/`, par exemple `cave-table.jpg`. */
  image?: string;
};

export type Section = { h: string; body: string };
export type Term = { t: string; d: string; en?: string };
export type NameEntry = { n: string; say: string; d: string };
export type QuizItem = { q: string; a: string[]; ok: number; why: string };

export type Card = {
  id: string;
  title: string;
  /** Nom du fichier déposé dans `public/images/`. Facultatif. */
  image?: string;
  level: Level;
  minutes?: number;
  summary: string;
  sections: Section[];
  terms?: Term[];
  names?: NameEntry[];
  sayThis?: string[];
  notThis?: string[];
  quiz?: QuizItem[];
};

export type Module = { domain: string; cards: Card[] };

/** Une ligne de progression, telle que stockée dans `card_progress`. */
export type ProgressRow = {
  domain_id: string;
  card_id: string;
  read_at: string;
  quiz_correct: number | null;
  quiz_total: number | null;
  cards_known: number | null;
  cards_total: number | null;
};
