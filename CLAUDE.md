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

> **Le design a été remis à zéro le 28 août 2026 (décision #027).** Tout ce que
> décrivaient les décisions #020 à #026 — jetons « deux lumières », registre des
> studios de design, Tailwind, révélation au défilement — a été retiré. Ce qui suit
> décrit ce qui existe *aujourd'hui*, et rien d'autre.

- **Next.js 16** (App Router) + **TypeScript**. Rien d'autre en dépendance :
  ni Tailwind, ni Supabase, ni bibliothèque d'animation.
- **Le CSS est nu**, dans un seul fichier : `app/globals.css`. Il reprend au
  sélecteur près une maquette statique (`~/Desktop/website`), dont la cascade est
  réglée par un ordre de couches **fixé à la première ligne du fichier** :

  ```
  @layer properties, theme, base, webflow, components, utilities;
  ```

  puis les règles propres au site, **hors couche**, qui l'emportent sur tout.
  Ne pas changer cet ordre sans vérifier le rendu.
- **Deux couleurs, un gris.** Papier `#fbf9ef`, encre `#171412`, gris `#8e827c`
  pour les pictogrammes au repos ; `--orange: #f72` pour l'unique accent.
  S'y ajoute `--vert: #00846a`, la couleur du titre du hero (#029), et
  `--grille-trait`, l'encre à 10 % du papier millimétré du fond (#033).
- **Trois polices, embarquées** (`app/fonts.ts`, `next/font/local`) :
  **PP Neue Montreal** 400 pour le texte, **Youth** 700/900 pour les étiquettes
  et les boutons, **Playfair Display** 400/700 pour le titre du hero et le
  mot-logo (#030).
  Playfair est le substitut libre de PP Editorial Old, la police du modèle,
  qui n'est pas libre en usage commercial (#029). La feuille de style les nomme par leur variable
  (`--font-pp`, `--font-youth`), jamais par leur nom de famille : celui-ci est
  engendré au build.
- **Tout le dessin est en `em`.** Une seule règle met la page à l'échelle de la
  fenêtre — `body { font-size: var(--size-font) }` au-delà de 768 px, où
  `--size-font` interpole entre 768 et 1920 px. Changer une taille en `px` casse
  cette mise à l'échelle.
  **Une seule exception : le volet de la barre**, qui est à l'échelle de la
  *hauteur* de la fenêtre et porte donc son propre `font-size`. À l'intérieur,
  `em` désigne le volet ; pour le situer par rapport au rail, qui suit la
  largeur, ses `top` et `left` sont écrits `calc(x * var(--size-font))`.
- **Deux états dans tout le site.** Le menu mobile, ouvert ou fermé : il n'est
  pas passé en propriété — il est posé en classe `--showMenu` sur le corps de page,
  parce que le CSS commande de là la barre, le voile et le hamburger, qui ne sont
  pas frères dans le balisage. Et le volet de la barre, ouvert au survol d'About
  ou de Features : celui-là reste dans `Nav.tsx`, le CSS n'a rien à savoir en
  dehors du volet lui-même. (Le rideau d'intro en a un troisième, mais il ne
  dure qu'une seconde et demie et meurt avec le composant.)
- **Deux mouvements pilotés à la main**, tous deux en `requestAnimationFrame` :
  le point qui suit le curseur (`components/PointCurseur.tsx`), qui rattrape le
  pointeur d'un sixième de la distance par image ; et le zoom du rideau d'intro
  (`components/RideauIntro.tsx`), qui fait grandir les cases de la grille de
  0,665 à 1 en 800 ms (#033). Ce zoom joue sur `background-size`, **jamais sur
  `transform`** : une mise à l'échelle épaissirait le trait de la grille.
- **La page est prérendue en statique.** Rien n'est dynamique, il n'y a plus
  de session ni de base de données.
- Hébergement **Vercel**. Développement sur `localhost:3000` (`npm run dev`).

### Pièges déjà rencontrés — ne pas les refaire

- **Next 16 a renommé `middleware` en `proxy`.** Il n'y a plus de proxy dans le
  projet, mais si l'on en réintroduit un : fichier `proxy.ts`, fonction `proxy`.
- **`export const dynamic = 'force-static'` vide les paramètres de requête.**
  Une route qui lit `searchParams` ne doit jamais l'utiliser.
- **`params` et `searchParams` sont des `Promise`** : toujours les `await`.
- **`next dev` réécrit un bloc à la fin de ce fichier.** Ne pas le supprimer,
  il se recrée ; le committer avec le reste.
- **Vider `.next` après une suppression de routes.** `npx tsc --noEmit` échoue
  sinon sur des types de routes disparues, que Next avait engendrés au build
  précédent.
- **`.btn-inner` et les enveloppes des pastilles doivent être des `div`.**
  La pastille du bouton est en `inline-block` : un `span` n'y prendrait pas la
  garde en hauteur, et les largeurs en pourcentage ne s'appliqueraient pas.
- **Ne jamais recopier une clé à la main depuis un terminal** : `l` et `1` s'y
  confondent. Copier-coller, toujours.

## 6. Arborescence

```
app/
  layout.tsx        la coquille : les polices, les classes du corps de page
  page.tsx          la page — le hero, son titre, et le manifeste
  globals.css       toute la feuille de style, en sections commentées
  fonts.ts          PP Neue Montreal et Youth, via next/font/local
  fonts/            les cinq .woff2
components/
  Header.tsx        le cadre fixe, et le seul état du site (menu ouvert / fermé)
  Logo.tsx          le mot-logo LarpLvl, sur une seule ligne
  Nav.tsx           les six pastilles de la barre, et l'état du volet
  VoletNav.tsx      le volet déployé au survol d'About et de Features
  volets.ts         ce qu'il contient : six cases par onglet
  icons.tsx         leurs pictogrammes, repris tels quels de la maquette
  MenuToggle.tsx    le bouton Menu / Close — grand écran
  Hamburger.tsx     le bouton hamburger — sous 768 px
  Login.tsx         le lien Login — texte nu, à gauche de l'appel
  Cta.tsx           le bouton d'appel à l'action — « get started »
  PointCurseur.tsx  le point qui suit le curseur
  GrilleFond.tsx    le papier millimétré du fond
  RideauIntro.tsx   le rideau d'intro, et le zoom de sa grille
docs/               contexte, atlas, feuille de route, guide, décisions
```

**Il n'y a plus de contenu.** `content/`, `lib/`, `supabase/` et `public/` ont été
supprimés avec le reste. Le schéma d'une fiche (§ 8) et les quatorze domaines (§ 7)
restent la référence pour quand le contenu reviendra.

**Les six entrées de la barre et les deux boutons du coin pointent vers des adresses
qui n'existent pas encore** : `/contenu`, `/about`, `/features`, `/pricing`, `/news`,
`/contact`, `/connexion`, `/inscription`. C'est volontaire — les pages viendront.

**Pour retrouver la maquette d'origine** : `~/Desktop/website` (HTML + CSS, sans
JavaScript). Son `README.md` dit ce qui en avait été retiré, et ce qui n'y
fonctionnait plus faute de JavaScript.


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

**Au 3 septembre 2026 : un en-tête, un hero sur papier millimétré, un manifeste.**
Le design a été remis à zéro (#027) ; le contenu l'avait déjà été le 26 août (#022).
Ce qui existe : le cadre, le mot-logo, la barre de six pastilles et son volet,
le bouton Menu, les deux boutons du coin (Login et Get started), le point qui
suit le curseur — et, depuis le 1er septembre, le titre du hero, repris cote pour
cote de `moneyincheck.org` (#029). Son texte est désormais « MONEY WELL SPOKEN »,
choisi pour LarpLvl (#031), sur trois lignes (#032).

Depuis le 2 septembre, la page est posée sur la **grille de fond** de
`moneyincheck.org` — deux dégradés croisés, une case de 10,4em — et s'ouvre sur un
**rideau d'intro** dont les cases grandissent depuis le centre jusqu'à rejoindre
celles du fond (#033). Ni les coups d'échecs manuscrits du modèle ni sa vidéo n'ont
été repris. Sous le hero, le **manifeste** dit en deux paragraphes ce que le site
fait — et qu'il n'apprend pas à mentir (#034).

Voir la section « État » en tête de `docs/ROADMAP.md` pour ce qui vient ensuite.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
