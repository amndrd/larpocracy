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
Pas de Tailwind, pas de base de données, aucune autre dépendance.

```bash
npm install
npm run dev   # http://localhost:3000
```

```
app/
  layout.tsx        la coquille : les polices, les classes du corps de page
  page.tsx          la page — vide sous l'en-tête
  globals.css       toute la feuille de style
  fonts.ts fonts/   PP Neue Montreal et Youth, embarquées
components/         l'en-tête : mot-logo, barre, boutons, point suiveur
docs/               contexte, atlas, feuille de route, décisions
```

> **Le site est reparti de zéro.** Le contenu a été remis à zéro le 26 août 2026
> (décision #022), le design le 28 (décision #027). Ce qu'on trouve aujourd'hui dans
> le dépôt, c'est une page blanche surmontée d'un en-tête — et toute la documentation
> qui dit ce que le site doit devenir. Les comptes, la recherche, la progression et
> les formules sont dans l'historique git, au commit `e15e494` et avant.

### Documentation

| Fichier | Contenu |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Contexte permanent + pièges techniques rencontrés |
| [`docs/CONTEXT.md`](docs/CONTEXT.md) | Vision, positionnement, ton, éthique |
| [`docs/TOPICS.md`](docs/TOPICS.md) | L'atlas des 673 sujets |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | État courant et feuille de route |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | Comment rédiger une fiche |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Journal des décisions |
