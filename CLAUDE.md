# LARPOCRACY — contexte projet

> Ce fichier est lu automatiquement au début de chaque session Claude Code.
> Il contient tout ce qu'il faut savoir pour reprendre le projet sans re-expliquer.
> **Le mettre à jour à chaque décision structurante.**

---

## 1. Ce qu'est le projet

**LarpLvl** est un site de culture générale appliquée : il apprend à un utilisateur
les codes, le vocabulaire et les références des milieux du business, du luxe et du
pouvoir — pour qu'il puisse **tenir une conversation crédible et intéressante** avec
n'importe qui, dans n'importe quel milieu.

Baseline : **« L'art de tenir la salle. »**

Le mot « larp » (live action role play) est assumé et revendiqué : on apprend à jouer
un rôle social convaincant. Mais le contenu, lui, est **vrai**. On n'apprend pas à
mentir — on apprend à savoir. La différence est le cœur du produit.

## 2. Le problème qu'on résout

Un réseau se construit sur la conversation. Quelqu'un qui sait parler d'un Barolo, d'un
LBO, d'un Royal Oak, d'un Rothko et du protocole japonais **inspire confiance et donne
envie de travailler avec lui**. Ce n'est pas de la frime : c'est de la surface d'accroche.
Plus tu as de sujets, plus tu as de portes.

LarpLvl est le manuel de terrain de cette surface d'accroche.

## 3. Utilisateur cible

- Jeune actif / entrepreneur / commercial / consultant qui monte.
- Il se retrouve dans des pièces où il ne connaît pas les codes.
- Il n'a pas 20 ans à consacrer à l'acquisition du capital culturel par osmose familiale.
- Il veut des **raccourcis honnêtes** : quoi savoir, quoi dire, quoi ne pas dire.
- Langue : **français**. Termes techniques donnés avec leur équivalent anglais.

## 4. Principes de contenu (non négociables)

1. **Utilisable en dîner.** Chaque fiche doit produire au moins une phrase prononçable
   en soirée. Si l'information n'est pas « disable », elle ne sert pas.
2. **Dis ça / Pas ça.** Le format signature. Chaque fiche oppose la formulation qui
   passe et celle qui trahit. C'est le plus fort différenciateur du site.
3. **La prononciation compte autant que le fait.** Un nom mal prononcé annule dix
   pages de savoir. Chaque nom propre étranger porte sa phonétique.
   C'est aussi ce qui alimente le mode Cartes : `terms` et `names` deviennent
   automatiquement un paquet à réviser, sans rien ajouter au JSON.
4. **Sobriété > étalage.** Le site enseigne systématiquement que sous-jouer bat
   surjouer. Le name-dropping est le marqueur n°1 de l'imposteur.
5. **Zéro fraude.** On enseigne la culture, les codes et l'aisance. Jamais l'usurpation
   d'identité, les faux diplômes, les fausses références, l'escroquerie. Un encart
   d'éthique existe et reste visible. Cette ligne ne bouge pas.
6. **Honnêteté factuelle.** Pas de faits inventés. Un chiffre incertain est marqué
   comme tel ou retiré. Un site qui apprend à bluffer avec des fausses infos est un
   piège pour son utilisateur.
7. **Densité.** Pas de remplissage, pas de blabla motivationnel. Du fait, du terme,
   de la formulation.

## 5. Stack technique

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.
- **Design « nuit », repris de fora.so** (décision #024) : noir pur `#000`, blanc
  chaud `#fff3f0`, filets à 10 % de blanc, panneaux translucides `rgba(23,23,23,.85)`
  cernés d'un `ring-inset` clair, **barre flottante**, et un dégradé de crépuscule
  en bannière (`@utility crepuscule`).
  Jetons dans `app/globals.css` (`@theme`) : surfaces `canvas`/`canvas-2`/`surface`,
  encres `ink`/`ink-2`/`ink-3`/`ink-4`, `--radius-*`, `--shadow-*`, et la courbe
  `--ease-fora` (`cubic-bezier(0.44, 0, 0.56, 1)`) utilisée partout.
- **Typographie : Inter Tight uniquement.** Instrument Serif a été retiré avec la
  refonte #024. Les titres sont grands, de graisse 400 et **très serrés**
  (`headline` : `-0.04em`) ; leur seconde moitié s'éteint (`headline-dim`).
- **Mouvement : une seule figure**, la révélation au défilement (`components/Reveal.tsx`,
  IntersectionObserver). L'état initial est dans la feuille de style (`[data-reveal]`)
  pour éviter tout clignotement avant l'hydratation, et un `<noscript>` du layout le
  neutralise si JavaScript est absent.
- **Gamification** (décision #021) : `lib/xp.ts` (barème, rangs, séries,
  distinctions) et `lib/stats.ts` (`bilan()`, fonction pure). Aucun point offert.
- **Navigation en anglais** : Contenu · About · Features · Pricing · News, puis Login
  et Get started. Les routes suivent (`/about`, `/features`, `/pricing`, `/news`) ;
  `/manifeste` et `/tarifs` redirigent en 308 depuis `next.config.ts`.
- **Vitrine et application sont deux mondes** (décision #025), à la manière de Figma :
  - `app/(site)/**` — la vitrine, **prérendue en statique**, châssis `Header` flottant
    + `Footer` ;
  - `app/app/**` — l'application, **rendue à la demande** (`dynamic = 'force-dynamic'`),
    châssis `AppShell` à barre latérale, session obligatoire.
  Le contraste entre les deux châssis est voulu : c'est ce qui fait sentir qu'on entre.
- **Freemium** : une fiche porte `"free": true` et s'ouvre à tous, ou demande la
  formule Pro. `lib/access.ts` (`isFree`, `canOpen`) et `lib/session.ts` (`getSession`,
  qui rend `plan`). Le montant de Pro est dans `PRIX_PRO` (`lib/plans.ts`) et reste
  à fixer — aucun prix inventé ne traîne dans une page.
- **Chaque domaine a sa teinte** (`lib/theme.ts`), posée en variables CSS `--dom` et
  `--dom-tint` par `domainVars()`, jamais en classes Tailwind générées.
- **Images** : déposées à la main dans `public/images/`, puis **déclarées** dans le
  JSON (`"image": "mon-fichier.jpg"`). Jamais devinées par convention de nom — une
  image absente afficherait un trou. Sans image déclarée, le site pose un aplat
  teinté à la place. Voir `lib/images.ts` et `public/images/LISEZMOI.md`.
- **Supabase** : authentification (email + mot de passe) et Postgres.
- Hébergement **Vercel**. Développement sur `localhost:3000` (`npm run dev`).
- Contenu en **JSON** dans `content/`, importé statiquement par `lib/content.ts`.
- Pages de contenu **prérendues** (`generateStaticParams`) : bon pour le référencement.

### Pièges déjà rencontrés — ne pas les refaire

- **Next 16 a renommé `middleware` en `proxy`.** Fichier `proxy.ts`, fonction
  exportée `proxy`. L'ancienne convention émet un avertissement de dépréciation.
- **`export const dynamic = 'force-static'` vide les paramètres de requête.**
  Une route qui lit `searchParams` ne doit jamais l'utiliser : `/api/search`
  répondait systématiquement `{"hits":[]}` à cause de ça.
- **`params` et `searchParams` sont des `Promise`** : toujours les `await`.
- **`next dev` réécrit un bloc à la fin de ce fichier.** Ne pas le supprimer,
  il se recrée ; le committer avec le reste.
- **Le header ne doit pas lire la session côté serveur** : cela basculerait
  toutes les pages en rendu dynamique. C'est le rôle de `AccountNav`, client.
- **Ne jamais mettre la clé `service_role` dans le code** : elle contourne la RLS.
- **Vercel refuse le type `Secret` pour une variable `NEXT_PUBLIC_`** : ce préfixe
  l'envoie au navigateur, elle ne peut donc pas être secrète. Type **Config**.
  Un secret déjà enregistré n'est pas convertible : il faut le supprimer et le recréer.
- **Les variables `NEXT_PUBLIC_` sont figées dans le JS au moment du build.**
  Changer la valeur ne suffit pas : il faut redéployer. Et un « Redeploy » qui
  réutilise le cache de build peut resservir l'ancienne valeur — vérifier la clé
  réellement livrée en cherchant sa valeur dans `/_next/static/chunks/*.js`.
- **Les compteurs de l'en-tête passent par `/api/bilan`**, jamais par le rendu
  serveur : lire la session dans le header basculerait tout le site en dynamique.
- **`backdrop-filter` déclaré dans un `@utility` reste sans effet.** Tailwind v4
  pilote cette propriété par ses propres variables et écrase la déclaration. Pour un
  effet de verre dépoli, utiliser les classes `backdrop-blur-*` et
  `backdrop-saturate-*` sur l'élément.
- **La barre de navigation est flottante** (`position: fixed`), donc hors du flux :
  `<main>` porte un `pt-20 sm:pt-24` pour dégager sa hauteur. Le supprimer ferait
  passer les titres sous la barre.
- **Le contenu verrouillé ne doit jamais partir dans le HTML.** C'est la raison pour
  laquelle `app/app/**` est dynamique : une page prérendue livrerait le texte payant
  à qui inspecte la source, quel que soit le masquage visuel. La page de fiche coupe
  **avant** de rendre sections, lexique et test, elle ne les cache pas.
- **La recherche filtre selon la formule** : `search(q, limit, plan)` écarte les
  termes et prononciations issus d'une fiche verrouillée. Les titres de fiches, eux,
  restent trouvables — un titre ne livre rien.
- **Les redirections d'entrée sont dans `proxy.ts`**, pas dans les pages : un
  `redirect()` depuis l'accueil ferait basculer toute la vitrine en dynamique.
- **`upload.wikimedia.org` ne sert que les largeurs de vignette déjà en cache** et
  répond **400** sur toutes les autres. Pour ajouter un visuel : télécharger l'URL
  exacte renvoyée par l'API, puis redimensionner localement.
- **Ne jamais recopier une clé à la main depuis un terminal** : `l` et `1` s'y
  confondent. Une clé anon mal recopiée a fait échouer toute l'auth en production
  avec le seul message « Impossible d'aboutir ». Copier-coller, toujours.

## 6. Arborescence

```
app/
  layout.tsx              coquille, polices, header/footer
  (site)/                 LA VITRINE — statique, barre flottante
    page.tsx              accueil
    about/ features/ pricing/ news/    présentation
    connexion/ inscription/            entrée
  app/                    L'APPLICATION — dynamique, barre latérale, session requise
    layout.tsx            AppShell + chargement du bilan
    page.tsx              tableau de bord
    d/[domaine]/          un domaine
    f/[domaine]/[fiche]/  une fiche (verrou compris)
    f/[domaine]/[fiche]/cartes/   le paquet
    compte/  recherche/
  auth/actions.ts         Server Actions d'authentification
  auth/confirm/route.ts   cible du lien de confirmation email
  api/search/route.ts     recherche (dynamique — voir les pièges)
  api/bilan/route.ts      points et série pour l'en-tête (dynamique)
components/               Header (barre flottante), Footer, SearchBox, AuthForm, …
  Button/Badge/Progress   primitives (bouton pressable, pastille, barre + anneau)
  icons.tsx               les pictogrammes, dessinés à la main
  DomainCard/FicheCard    les vignettes du catalogue
  StudyModes.tsx          le sélecteur Lire · Cartes · Test d'une fiche
  GameStats.tsx           pilules de points, carte de rang, mur de distinctions
  Reveal.tsx              révélation au défilement
  Logo.tsx                le monogramme
  HeroPreview.tsx         l'aperçu produit de la bannière, dessiné en HTML
  Faq.tsx                 repliage natif `<details>`
  app/AppShell.tsx        le châssis de l'application
  app/Verrou.tsx          l'écran de déblocage d'une fiche fermée
  Flashcards.tsx          le mode Cartes
  Quiz.tsx                le test d'une fiche
lib/
  content.ts              chargement du contenu + index de recherche + `deckOf`
  xp.ts                   barème, rangs, séries, distinctions (pur)
  stats.ts                `bilan()` : tout ce que l'interface affiche du parcours
  theme.ts                la teinte de chaque domaine
  images.ts               résolution des images déclarées dans le JSON
  news.ts                 le journal de bord (`content/news.json`)
  access.ts               qui peut lire quoi (`isFree`, `canOpen`)
  session.ts              qui consulte, et avec quelle formule
  plans.ts                les formules — `PRIX_PRO` est à fixer
  types.ts                types du contenu
  progress.ts             lecture/écriture de la progression
  plans.ts                formules free | pro
  supabase/               clients serveur, navigateur, config
proxy.ts                  rafraîchissement de session (ex-middleware)
content/
  domains.json            les domaines — **vide au 26 août 2026**
  news.json               le journal de bord — vide lui aussi
  modules/<id>.json       le contenu, un fichier par domaine
public/images/            vos images, déposées à la main
supabase/schema.sql       schéma + RLS, à exécuter dans le SQL Editor
docs/                     contexte, atlas, feuille de route, guide, décisions
```

**Après un `git pull`** : `supabase/schema.sql` a gagné une table `activity_days` et
deux colonnes sur `card_progress`. Le rejouer dans le SQL Editor de Supabase (il est
idempotent). Sans cela le site marche, mais la série reste à 0 et les cartes ne
rapportent aucun point.

**Sans clés Supabase**, l'application bascule en mode démo : tout est ouvert, rien
n'est enregistré, et un encart le dit dans la barre latérale. Sans cela le site
serait inaccessible en local — voir `lib/session.ts`.

**Pour ouvrir une fiche à tous** : `"free": true` dans son objet JSON. Sans ce
drapeau, elle demande la formule Pro. Aucune règle implicite tirée du niveau ou du
rang : c'est un choix explicite, fiche par fiche.

**Pour ajouter une nouvelle** : un objet dans `content/news.json`
(`id`, `date` au format AAAA-MM-JJ, `title`, `body`, et `tag`/`image` facultatifs).
Rien d'autre à toucher — la page `/news` trie par date décroissante.

**Le site est vide de contenu au 26 août 2026** (décision #022) : `domains.json`
vaut `[]` et `content/modules/` ne contient aucune fiche. Toutes les pages gèrent
ce cas et affichent un état vide plutôt que de casser.

**Pour ajouter un domaine** — dans `content/domains.json` :

```json
[
  {
    "id": "cave-table", "n": 1, "title": "Cave & Table",
    "tagline": "Vin, champagne, spiritueux, gastronomie",
    "blurb": "Deux ou trois phrases sur ce que le domaine couvre.",
    "topics": 77, "module": true,
    "keywords": ["vin", "champagne"],
    "image": "cave-table.jpg"
  }
]
```

`image` est facultatif : le fichier doit être dans `public/images/`. Sans lui, la
vignette affiche un aplat à la teinte du domaine (`lib/theme.ts`).

**Pour ajouter un module de contenu** :
1. créer `content/modules/<id-du-domaine>.json` (schéma dans `docs/CONTENT-GUIDE.md`) ;
2. l'importer dans `lib/content.ts` ;
3. l'ajouter au tableau `moduleFiles`.

L'import est statique volontairement : c'est ce qui garantit que le contenu est
embarqué dans le build sur Vercel.

## 7. Les 14 domaines

| # | Domaine | Ce qu'il couvre |
|---|---------|-----------------|
| 1 | Cave & Table | Vin, champagne, spiritueux, gastronomie, produits d'exception, cigares |
| 2 | Vestiaire | Costume, chemise, chaussures, dress codes, maroquinerie, parfum |
| 3 | Horlogerie & Joaillerie | Montres, complications, pierres, maisons, marché secondaire |
| 4 | Machines | Automobile, jets privés, yachts, aviation premium |
| 5 | Lieux | Palaces, clubs privés, stations, immobilier prime, résidence fiscale |
| 6 | Business & Finance | Marchés, PE, VC, M&A, hedge funds, valorisation, négociation, stratégie |
| 7 | Pouvoir & Réseaux | Groupes de luxe, dynasties, gatekeepers, institutions, philanthropie |
| 8 | Art & Marché | Histoire de l'art, galeries, foires, enchères, collectionner |
| 9 | Culture | Architecture, design, musique, opéra, littérature, cinéma, histoire, idées |
| 10 | Codes & Étiquette | Table, protocole, titres, invitations, codes par pays |
| 11 | Conversation & Réseau | Small talk, storytelling, networking, follow-up, présence |
| 12 | Monde | Géographie, cultures, religions, géopolitique, langues, prononciation |
| 13 | Sport & Loisirs | Golf, équitation, voile, ski, F1, tennis, chasse, jeux de salon |
| 14 | Méta-Larp | Théorie du signaling, erreurs qui trahissent, éthique, entraînement |

Détail complet : `docs/TOPICS.md`.

## 8. Schéma d'une fiche

Voir `docs/CONTENT-GUIDE.md` pour la version normative. En bref :

```json
{
  "id": "champagne-maisons",
  "title": "Maisons, vignerons et cuvées de prestige",
  "level": 1,
  "minutes": 7,
  "summary": "…",
  "sections": [{ "h": "…", "body": "…" }],
  "terms":    [{ "t": "Blanc de blancs", "d": "…", "en": "…" }],
  "names":    [{ "n": "Krug", "say": "krougue", "d": "…" }],
  "sayThis":  ["…"],
  "notThis":  ["…"],
  "quiz":     [{ "q": "…", "a": ["…"], "ok": 0, "why": "…" }]
}
```

Niveaux : `1` bases · `2` aisance · `3` connaisseur.

## 9. Règles de travail

- **Un commit par modification, poussé immédiatement.** Demande explicite de
  l'utilisateur. Messages de commit en français, à l'impératif, préfixés du scope
  (`contenu:`, `site:`, `docs:`, `data:`).
- Le repo est **public** : `github.com/amndrd/larpocracy`.
- Avant chaque commit : `npx tsc --noEmit && npx eslint . && npm run build`.
- Ne jamais casser `content/*.json` : valider avec `python3 -m json.tool`.
- Toute nouvelle décision de fond va dans `docs/DECISIONS.md`.
- Quand un module est rempli, cocher sa ligne dans `docs/ROADMAP.md`.

## 10. État actuel

Voir la section « État » en tête de `docs/ROADMAP.md` — c'est la source de vérité
sur ce qui est fait et ce qui vient ensuite.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
