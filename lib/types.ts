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
};

export type Section = { h: string; body: string };
export type Term = { t: string; d: string; en?: string };
export type NameEntry = { n: string; say: string; d: string };
export type QuizItem = { q: string; a: string[]; ok: number; why: string };

export type Card = {
  id: string;
  title: string;
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
