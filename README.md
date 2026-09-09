<h1 align="center">LARPOCRACY</h1>
<p align="center"><em>L'art de tenir la salle.</em></p>

---

**LarpLvl** apprend les codes, le vocabulaire et les références des milieux du
business, du luxe et du pouvoir — pour pouvoir tenir une conversation crédible et
intéressante avec n'importe qui, dans n'importe quel milieu.

Parce qu'une porte professionnelle ne s'ouvre presque jamais sur un CV. Elle s'ouvre
sur une conversation.

### Ce qu'on y trouve

14 domaines, de la cave au conseil d'administration : vin et champagne, costume et
chaussures, montres, jets et yachts, palaces et clubs privés, private equity et
venture capital, groupes de luxe et dynasties, marché de l'art, opéra et littérature,
étiquette et protocole international, conversation et networking, géopolitique et
prononciation, golf et sports, et la théorie du jeu lui-même.

L'inventaire complet — **673 sujets** — est dans [`docs/TOPICS.md`](docs/TOPICS.md).

### Les trois formats signatures

- **Dis ça / Pas ça** — la même idée, formulée par quelqu'un qui sait et par quelqu'un
  qui essaie.
- **La prononciation** — un nom écorché annule tout le reste.
- **Ce qui trahit** — l'anti-manuel de chaque module.

### La ligne

Le site enseigne la connaissance, les codes et l'aisance. Jamais la fraude.
Pas parce que c'est mal vu, mais parce que c'est un mauvais calcul :

> Apprends pour de vrai. C'est moins cher que de faire semblant.

### Technique

**Next.js 16** (App Router) · **TypeScript** · CSS nu · déployé sur **Vercel**.
Pas de Tailwind, pas de base de données. Une seule autre dépendance : **three.js**,
épinglée à r128, pour la liasse de billets du hero — chargée en différé, elle ne pèse
pas sur le premier octet.

```bash
npm install
npm run dev     # http://localhost:3000
npm run verif   # typage + linter + build, à passer avant chaque commit
```

```
app/
  layout.tsx        la coquille : les polices, les métadonnées, le corps de page
  page.tsx          la page — le hero, son titre, sa liasse, et le manifeste
  not-found.tsx     la page servie aux adresses qui n'existent pas encore
  icon.svg          l'icône du site : le L du mot-logo, tracé en chemin
  globals.css       toute la feuille de style, en sections commentées
  fonts.ts fonts/   PP Neue Montreal, Youth et Playfair Display, embarquées
components/         l'en-tête, le fond, le rideau d'intro, la liasse en 3D
public/             le rouleau de billets — repli sans JavaScript de la liasse
docs/               contexte, atlas, feuille de route, guide, décisions
```

> **Le site est reparti de zéro.** Le contenu a été remis à zéro le 26 août 2026
> (décision #022), le design le 28 (décision #027). Ce qu'on trouve aujourd'hui dans le
> dépôt : un en-tête, un hero sur papier millimétré — « MONEY TALKS », et une liasse de
> billets en 3D qui tourne au milieu du titre —, un manifeste en deux paragraphes, et
> toute la documentation qui dit ce que le site doit devenir. Les comptes, la recherche,
> la progression et les formules sont dans l'historique git, au commit `e15e494` et
> avant.

### Documentation

| Fichier | Contenu |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Contexte permanent + pièges techniques rencontrés |
| [`docs/CONTEXT.md`](docs/CONTEXT.md) | Vision, positionnement, ton, éthique |
| [`docs/TOPICS.md`](docs/TOPICS.md) | L'atlas des 673 sujets |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | État courant et feuille de route |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | Comment rédiger une fiche |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Journal des décisions |
