# FEUILLE DE ROUTE — Larpocracy

---

## ÉTAT AU 25 AOÛT 2026

**Phase en cours : Phase 2 — le noyau utile.**
**Socle technique : refondu.** Next.js 16 + Supabase + Vercel.

| Élément | État |
|---|---|
| Repo public | ✅ github.com/amndrd/larpocracy |
| Documentation de contexte | ✅ |
| Atlas des 673 sujets | ✅ |
| Application Next.js sur localhost:3000 | ✅ |
| Design clair, registre Apple / Quizlet, barre flottante | ✅ refonte du 26 août |
| Points, rangs, séries, distinctions | ✅ schéma à rejouer dans Supabase |
| Pages de contenu prérendues + recherche | ✅ |
| Comptes Supabase (auth + RLS) | ✅ code prêt — clés à renseigner |
| Progression liée au compte | ✅ code prêt — clés à renseigner |
| Page formules (free / pro) | ✅ facturation non branchée |
| Déploiement Vercel | ⏳ en attente de connexion au compte |
| Mode Cartes (révision par retournement) | ✅ |
| Images | ⏳ à déposer dans `public/images/` |
| Modules de contenu remplis | **0 — contenu remis à zéro le 26 août (#022)** |

**Pour activer les comptes** : créer un projet Supabase, exécuter
`supabase/schema.sql` dans le SQL Editor, puis renseigner `NEXT_PUBLIC_SUPABASE_URL`
et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local` (voir `.env.example`) et dans les
variables d'environnement Vercel.

**Prochaine action** : reconstruire le contenu domaine par domaine —
voir « Pour ajouter un domaine » dans `CLAUDE.md`.

**Ancienne note de contenu** : les modules P0 du Domaine 6 (Business) et du
Domaine 11 (Conversation & Réseau) — les deux qui servent le plus vite en situation
réelle.

## Principe directeur

On ne construit pas une encyclopédie. On construit un **manuel de terrain**.
La question à se poser avant chaque fiche : *« est-ce que ça sert dans les 90 secondes
où quelqu'un décide s'il a envie de continuer à te parler ? »*

Ordre de remplissage : **fréquence d'usage réel**, pas exhaustivité.
Un module sur le champagne sert plus souvent qu'un module sur les yachts.

---

## PHASE 1 — Socle *(fait)*

- [x] Nom, positionnement, principes éditoriaux
- [x] Repo GitHub public, commits atomiques poussés à chaque modification
- [x] Documentation permanente (`CLAUDE.md`, `docs/`)
- [x] Atlas complet des sujets (`docs/TOPICS.md`)
- [x] Architecture technique : statique, JSON, zéro dépendance
- [x] Coquille du site : accueil, 14 domaines, routing par hash
- [x] Moteur de fiche : sections, termes, prononciation, Dis ça/Pas ça, quiz
- [x] Recherche instantanée
- [x] Progression en localStorage
- [x] Déploiement GitHub Pages

## PHASE 2 — Le noyau utile *(en cours)*

L'objectif : qu'un utilisateur puisse survivre à **un dîner d'affaires et un cocktail**.

- [~] **Cave & Table** — champagne ✅, vin fondations, commander au restaurant, Michelin
- [~] **Codes & Étiquette** — la table ✅, protocole, codes par pays
- [~] **Business & Finance** — VC ✅, lire une entreprise, valorisation, PE, négociation
- [~] **Vestiaire** — le costume ✅, dress codes, chaussures
- [ ] **Conversation & Réseau** — small talk, storytelling, se présenter, follow-up
- [ ] **Méta-Larp** — ce qui trahit, ce qui fonctionne, éthique
- [ ] **Monde** — le module prononciation (fort potentiel, très partageable)

Critère de sortie de phase : 40 fiches publiées, 7 domaines ouverts.

## PHASE 3 — Élargissement

- [ ] **Horlogerie & Joaillerie** — fondations, maisons, pièces à reconnaître
- [ ] **Pouvoir & Réseaux** — groupes de luxe, qui possède quoi, gatekeepers
- [ ] **Art & Marché** — histoire express, marché, galeries, enchères
- [ ] **Lieux** — palaces, clubs, calendrier mondain
- [ ] **Machines** — jets, automobile, yachts
- [ ] **Culture** — opéra, littérature, cinéma, philosophie
- [ ] **Sport & Loisirs** — golf en priorité absolue (le plus rentable en business)

Critère de sortie : 120 fiches, 14 domaines ouverts, aucun domaine vide.

## PHASE 4 — Profondeur

- [ ] Passer tous les modules P0 au niveau 2 et 3
- [ ] Lexique global inter-domaines (1 000+ termes)
- [ ] Module prononciation complet avec audio
- [ ] Anecdotes : 100 histoires de 90 secondes prêtes à raconter
- [ ] Fiches « 5 minutes avant » pour 20 situations types
- [ ] Comparateurs et arbres (qui possède quoi)

## PHASE 5 — Outils

- [ ] Parcours guidés (Dîner d'affaires, Premier gala, Lever des fonds, Client du Golfe, Week-end à la campagne)
- [x] Mode Cartes : révision par retournement, tri « su » / « à revoir »
- [ ] Mode révision par répétition espacée
- [ ] Simulations à choix multiples avec conséquences
- [x] Score et progression jouée : points, sept rangs, série, distinctions
- [ ] Quiz chronométré, classement personnel
- [ ] Briefing sur mesure selon l'événement
- [ ] Export PDF / cheat sheets imprimables
- [ ] PWA installable, mode hors ligne
- [ ] Import/export de la progression

## PHASE 6 — Ouverture *(optionnel, à trancher)*

- [ ] Version anglaise
- [ ] Contribution externe encadrée
- [ ] Newsletter
- [ ] Domaine propre

---

## Suivi des 14 domaines

| # | Domaine | Sujets à l'atlas | Fiches publiées | Priorité |
|---|---------|:---:|:---:|:---:|
| 1 | Cave & Table | 77 | 2 | P0 |
| 2 | Vestiaire | 53 | 1 | P0 |
| 3 | Horlogerie & Joaillerie | 34 | 0 | P1 |
| 4 | Machines | 42 | 0 | P1 |
| 5 | Lieux | 42 | 0 | P1 |
| 6 | Business & Finance | 110 | 1 | P0 |
| 7 | Pouvoir & Réseaux | 38 | 0 | P1 |
| 8 | Art & Marché | 37 | 0 | P1 |
| 9 | Culture | 43 | 0 | P1 |
| 10 | Codes & Étiquette | 50 | 1 | P0 |
| 11 | Conversation & Réseau | 47 | 0 | P0 |
| 12 | Monde | 27 | 0 | P0 |
| 13 | Sport & Loisirs | 42 | 0 | P1 |
| 14 | Méta-Larp | 31 | 0 | P0 |

*(Les compteurs se mettent à jour à chaque module publié.)*

---

## Rythme de travail proposé

Une session = **un module complet** (4 à 8 fiches sur un même sujet), pas des fiches
éparpillées. Un module fini est utilisable ; trois modules à moitié faits ne le sont pas.

Chaque session :
1. Choisir le prochain module dans la Phase en cours
2. L'écrire en entier dans `data/modules/<domaine>.json`
3. Valider le JSON
4. Mettre à jour les compteurs de ce fichier
5. Commit + push
