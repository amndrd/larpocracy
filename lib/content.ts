import domainsJson from '@/content/domains.json';
import type { Card, Domain, Level, Module } from './types';

/* --------------------------------------------------------------
   Les modules de contenu sont importés explicitement.

   POUR AJOUTER UN MODULE :
     1. créer `content/modules/<id-du-domaine>.json`
     2. l'importer ci-dessous
     3. l'ajouter au tableau `moduleFiles`

   Import statique et non lecture de dossier : c'est ce qui garantit que le
   contenu est bien embarqué dans le build sur Vercel.

   Exemple, une fois le fichier créé :
     import mCaveTable from '@/content/modules/cave-table.json';
     const moduleFiles = [mCaveTable] as unknown as Module[];
   -------------------------------------------------------------- */

const moduleFiles: Module[] = [];

export const domains = domainsJson as Domain[];

const byDomain = new Map<string, Card[]>();
for (const m of moduleFiles) byDomain.set(m.domain, m.cards);

export function getDomain(id: string): Domain | undefined {
  return domains.find((d) => d.id === id);
}

export function getCards(domainId: string): Card[] {
  return byDomain.get(domainId) ?? [];
}

export function getCard(domainId: string, cardId: string): Card | undefined {
  return getCards(domainId).find((c) => c.id === cardId);
}

/** Fiches voisines dans le même domaine, pour la navigation bas de page. */
export function getNeighbours(domainId: string, cardId: string) {
  const cards = getCards(domainId);
  const i = cards.findIndex((c) => c.id === cardId);
  return { prev: i > 0 ? cards[i - 1] : null, next: i >= 0 ? cards[i + 1] ?? null : null };
}

export function allCards(): { domain: Domain; card: Card }[] {
  return domains.flatMap((d) => getCards(d.id).map((card) => ({ domain: d, card })));
}

export const stats = {
  domains: domains.length,
  topics: domains.reduce((a, d) => a + d.topics, 0),
  cards: domains.reduce((a, d) => a + getCards(d.id).length, 0),
  openDomains: domains.filter((d) => getCards(d.id).length > 0).length,
};

export const LEVELS: Record<Level, string> = {
  1: 'Bases',
  2: 'Aisance',
  3: 'Connaisseur',
};

/* --------------------------------------------------------------
   Index de recherche, construit une fois au chargement du module.
   -------------------------------------------------------------- */
export type SearchHit = {
  kind: 'fiche' | 'terme' | 'nom' | 'domaine';
  label: string;
  sub: string;
  href: string;
};

type IndexedHit = SearchHit & { hay: string };

export const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const searchIndex: IndexedHit[] = (() => {
  const out: IndexedHit[] = [];
  for (const d of domains) {
    out.push({
      kind: 'domaine',
      label: d.title,
      sub: d.tagline,
      href: `/d/${d.id}`,
      hay: norm(`${d.title} ${d.tagline} ${(d.keywords ?? []).join(' ')}`),
    });
    for (const c of getCards(d.id)) {
      const body = [
        c.title,
        c.summary,
        c.sections.map((s) => `${s.h} ${s.body}`).join(' '),
        (c.terms ?? []).map((t) => `${t.t} ${t.d} ${t.en ?? ''}`).join(' '),
        (c.names ?? []).map((n) => `${n.n} ${n.d}`).join(' '),
      ].join(' ');
      const href = `/f/${d.id}/${c.id}`;
      out.push({ kind: 'fiche', label: c.title, sub: d.title, href, hay: norm(body) });
      for (const t of c.terms ?? [])
        out.push({
          kind: 'terme',
          label: t.t,
          sub: t.en ? `${t.en} — ${d.title}` : d.title,
          href,
          hay: norm(`${t.t} ${t.d} ${t.en ?? ''}`),
        });
      for (const n of c.names ?? [])
        out.push({
          kind: 'nom',
          label: n.n,
          sub: `se dit « ${n.say} »`,
          href,
          hay: norm(`${n.n} ${n.d} ${n.say}`),
        });
    }
  }
  return out;
})();

export function search(q: string, limit = 12): SearchHit[] {
  const n = norm(q.trim());
  if (n.length < 2) return [];
  const exact: IndexedHit[] = [];
  const partial: IndexedHit[] = [];
  for (const it of searchIndex) {
    if (!it.hay.includes(n)) continue;
    (norm(it.label).startsWith(n) ? exact : partial).push(it);
    if (exact.length + partial.length > 200) break;
  }
  return [...exact, ...partial]
    .slice(0, limit)
    .map((h) => ({ kind: h.kind, label: h.label, sub: h.sub, href: h.href }));
}

/* --------------------------------------------------------------
   Ce qu'une fiche contient, et ce qu'on peut en jouer.
   -------------------------------------------------------------- */

/** Comptes affichés sur la vignette d'une fiche. */
export function cardStats(c: Card) {
  return {
    terms: c.terms?.length ?? 0,
    names: c.names?.length ?? 0,
    quiz: c.quiz?.length ?? 0,
    phrases: (c.sayThis?.length ?? 0) + (c.notThis?.length ?? 0),
  };
}

export type FlashCard = {
  kind: 'terme' | 'nom';
  recto: string;
  verso: string;
  /** Équivalent anglais, ou prononciation : la ligne secondaire du verso. */
  note?: string;
};

/**
 * Le paquet de cartes d'une fiche : les termes du lexique, puis les noms
 * propres avec leur prononciation. Une fiche sans lexique ni nom n'a pas
 * de paquet — le mode Cartes n'est alors pas proposé.
 */
export function deckOf(c: Card): FlashCard[] {
  return [
    ...(c.terms ?? []).map((t): FlashCard => ({
      kind: 'terme',
      recto: t.t,
      verso: t.d,
      note: t.en,
    })),
    ...(c.names ?? []).map((n): FlashCard => ({
      kind: 'nom',
      recto: n.n,
      verso: n.d,
      note: `se prononce « ${n.say} »`,
    })),
  ];
}
