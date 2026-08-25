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

- **HTML / CSS / JS vanilla.** Aucun framework, aucune dépendance, aucun build.
- Contenu en **JSON** dans `data/` — le contenu est de la donnée, pas du code.
- Progression utilisateur en **localStorage** (pas de compte, pas de backend, pas de RGPD).
- Hébergement : **GitHub Pages** depuis `main`, à la racine.
- Raison du choix : il faut pouvoir ajouter du contenu pendant des mois sans jamais
  se battre contre un toolchain. Une fiche = un objet JSON.

## 6. Arborescence

```
index.html                 Coquille de l'app (SPA à la main, routing par hash)
assets/css/style.css       Tout le style
assets/js/app.js           Routing, rendu, recherche, quiz, progression
data/domains.json          Les 14 domaines + leurs modules
data/modules/<id>.json     Le contenu réel, un fichier par domaine
docs/CONTEXT.md            Vision longue, ton, positionnement
docs/TOPICS.md             L'ATLAS : la liste exhaustive de tous les sujets
docs/ROADMAP.md            Feuille de route par phases
docs/CONTENT-GUIDE.md      Comment rédiger une fiche (schéma + règles)
docs/DECISIONS.md          Journal des décisions (append-only)
```

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
- Ne jamais casser `data/*.json` : le site le charge à chaud. Valider le JSON avant commit
  (`node -e "JSON.parse(require('fs').readFileSync('data/…'))"` ou `python3 -m json.tool`).
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
