# GUIDE DE RÉDACTION

## Le schéma d'une fiche (normatif)

```json
{
  "id": "champagne-maisons",
  "title": "Maisons, vignerons et cuvées de prestige",
  "level": 1,
  "minutes": 7,
  "image": "champagne.jpg",
  "summary": "Une phrase qui dit ce que la fiche débloque concrètement.",

  "sections": [
    { "h": "Titre de section", "body": "Texte. **gras** et *italique* supportés." }
  ],

  "terms": [
    { "t": "Blanc de blancs", "d": "Définition courte.", "en": "Équivalent anglais" }
  ],

  "names": [
    { "n": "Krug", "say": "krougue", "d": "Ce qu'il faut en savoir en une ligne." }
  ],

  "sayThis": ["Formulation qui passe."],
  "notThis": ["Formulation qui trahit."],

  "quiz": [
    { "q": "Question ?", "a": ["Choix 1", "Choix 2", "Choix 3"], "ok": 1,
      "why": "Explication systématique, même quand c'est juste." }
  ]
}
```

Champs obligatoires : `id`, `title`, `level`, `summary`, `sections`.
`image` désigne un fichier de `public/images/` — facultatif, et jamais deviné :
si le champ est absent, le site n'affiche simplement pas d'image.
Tout le reste est optionnel mais **fortement** recommandé — une fiche sans
`sayThis`/`notThis` rate le cœur du produit.

## Les niveaux

| Niveau | Nom | Contenu |
|---|---|---|
| 1 | Bases | Ce qu'il faut pour ne pas être perdu. Vocabulaire, repères. |
| 2 | Aisance | Ce qu'il faut pour participer. Nuances, opinions défendables. |
| 3 | Connaisseur | Ce qui fait qu'un vrai connaisseur te reconnaît comme un pair. |

Une fiche de niveau 3 doit contenir au moins une information que 95 % des gens
du milieu ignorent. Sinon, elle est de niveau 2.

## Les règles d'écriture

**1. Chaque fiche doit produire une phrase prononçable.**
Si après lecture l'utilisateur ne peut pas dire une phrase en soirée, la fiche a échoué.
Test : lire la fiche, puis se demander « qu'est-ce que je dis, exactement ? »

**2. Le fait avant le commentaire.**
« Le classement de 1855 n'a été révisé qu'une fois, en 1973, pour Mouton Rothschild »
bat « le classement de 1855 est un système fascinant ».

**3. Le chiffre, ou rien.**
Pas de « très cher », pas de « énorme ». Un ordre de grandeur ou le silence.
Si le chiffre est incertain, écrire « de l'ordre de » — jamais inventer une précision.

**4. Aucun fait non vérifié.**
En cas de doute : couper. Le site perd moins à ne rien dire qu'à faire dire une bêtise
à son utilisateur dans une pièce pleine de gens qui savent.

**5. La phonétique sur chaque nom qui peut être écorché.**
Format simple et français : `Moët` → `mo-ette`. Pas d'API phonétique.

**6. Dis ça / Pas ça : l'opposition doit être réaliste.**
Le « pas ça » ne doit pas être une caricature. Il doit être ce que dirait quelqu'un
d'intelligent qui n'a simplement pas les codes. Sinon ça n'apprend rien.

Mauvais : *Pas ça — « J'adore le champ' de luxe frérot »*
Bon : *Pas ça — « J'ai pris une bouteille de Dom Pérignon, c'est le meilleur champagne. »*
(Parce que l'erreur n'est pas le vocabulaire, c'est de confondre notoriété et hiérarchie.)

**7. Le quiz explique toujours.**
Même la bonne réponse a droit à son `why`. Le quiz est un support d'apprentissage,
pas une évaluation.

**8. Densité.**
Une section = une idée. Pas d'introduction, pas de conclusion, pas de transition.
On entre directement dans le sujet.

**9. Pas de superlatifs sur le milieu décrit.**
Le site n'admire pas. Il explique. « Le Ritz est un palace parisien » — pas
« Le Ritz est le temple absolu du luxe à la française ».

**10. Toujours dire ce qui trahit.**
Chaque module doit contenir au moins un piège identifié.

## Vocabulaire du site

| On écrit | Pas |
|---|---|
| une fiche | un article, un post |
| un module | un chapitre |
| un domaine | une catégorie |
| Dis ça / Pas ça | Do & Don't |
| ce qui trahit | les erreurs de débutant |

## Checklist avant commit

- [ ] JSON valide (`python3 -m json.tool data/modules/xxx.json > /dev/null`)
- [ ] `id` unique dans tout le projet
- [ ] Au moins une entrée `sayThis` et une `notThis`
- [ ] Chaque nom propre étranger a sa phonétique dans `names`
- [ ] Aucun chiffre inventé
- [ ] Au moins deux questions de quiz
- [ ] Le module est déclaré dans `data/domains.json`
- [ ] Compteurs mis à jour dans `docs/ROADMAP.md`
