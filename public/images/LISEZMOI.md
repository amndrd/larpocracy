# Vos images

Déposez ici les fichiers image du site, puis nommez-les dans le JSON du contenu.

- **Domaine** : champ `image` dans `content/domains.json` → `"image": "cave-table.jpg"`
- **Fiche** : champ `image` dans `content/modules/<domaine>.json`
- **Bannière d'accueil** : nommez le fichier `hero.jpg` (ou renseignez `ACCUEIL_IMAGE`
  dans `lib/images.ts`)

Le nom du fichier est libre : c'est le JSON qui fait le lien, pas une convention
implicite. Une image absente n'est pas une erreur — le site affiche simplement
un aplat teinté à la place.

Formats : `.jpg`, `.png`, `.webp`. Visez 1400 px de large et moins de 300 Ko.
