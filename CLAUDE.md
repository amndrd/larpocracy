# LARPOCRACY — contexte projet

> Ce fichier est lu automatiquement au début de chaque session Claude Code.
> Il contient tout ce qu'il faut savoir pour reprendre le projet sans re-expliquer.
> **Le mettre à jour à chaque décision structurante.**

---

## 1. Ce qu'est le projet

**Larpocracy** est un site de culture générale appliquée : il apprend à un utilisateur
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

Larpocracy est le manuel de terrain de cette surface d'accroche.

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
- **Design « application »** : fond gris clair, cartes blanches arrondies, ombres
  douces, animations d'entrée. Les jetons sont dans `app/globals.css` (`@theme`) :
  surfaces `canvas`/`surface`/`line`, encres `ink`/`ink-2`/`ink-3`, accents
  `accent`/`gold`/`yes`/`no`, rayons `--radius-*`, ombres `--shadow-*`.
  Le serif Instrument reste réservé aux titres (`display`) — voir décision #017.
- **Chaque domaine a sa teinte** (`lib/theme.ts`), posée en variables CSS `--dom` et
  `--dom-tint` par `domainVars()`, jamais en classes Tailwind générées.
- **Visuels** : 15 photos/œuvres sous licence libre dans `public/visuels/`, crédits
  dans `content/credits.json`, publiés sur `/credits` (décision #019).
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
  page.tsx                accueil
  domaines/               sommaire des 14 domaines
  d/[domaine]/            page d'un domaine
  f/[domaine]/[fiche]/    une fiche
  f/[domaine]/[fiche]/cartes/   le paquet de cartes à retourner
  recherche/              résultats de recherche
  credits/                crédits des visuels
  manifeste/  tarifs/     pages éditoriales
  connexion/ inscription/ compte/    comptes
  auth/actions.ts         Server Actions d'authentification
  auth/confirm/route.ts   cible du lien de confirmation email
  api/search/route.ts     recherche (dynamique — voir les pièges)
components/               Header, Footer, SearchBox, AuthForm, …
  Button/Badge/Progress   primitives (bouton pressable, pastille, barre + anneau)
  icons.tsx               les pictogrammes, dessinés à la main
  DomainCard/FicheCard    les vignettes du catalogue
  StudyModes.tsx          le sélecteur Lire · Cartes · Test d'une fiche
  Flashcards.tsx          le mode Cartes
  Quiz.tsx                le test d'une fiche
lib/
  content.ts              chargement du contenu + index de recherche + `deckOf`
  theme.ts                la teinte de chaque domaine
  visuels.ts              les visuels importés + leurs crédits
  types.ts                types du contenu
  progress.ts             lecture/écriture de la progression
  plans.ts                formules free | pro
  supabase/               clients serveur, navigateur, config
proxy.ts                  rafraîchissement de session (ex-middleware)
content/
  domains.json            les 14 domaines
  credits.json            provenance et licence de chaque visuel
  modules/<id>.json       le contenu, un fichier par domaine
public/visuels/           les 15 visuels (14 domaines + bannière)
supabase/schema.sql       schéma + RLS, à exécuter dans le SQL Editor
docs/                     contexte, atlas, feuille de route, guide, décisions
```

**Pour ajouter un module de contenu** : créer `content/modules/<id>.json`,
l'importer dans `lib/content.ts` et l'ajouter au tableau `moduleFiles`
(import statique volontaire : c'est ce qui garantit que le contenu est
embarqué dans le build).

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
