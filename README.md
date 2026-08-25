<h1 align="center">LARPOCRACY</h1>
<p align="center"><em>L'art de tenir la salle.</em></p>

---

**Larpocracy** apprend les codes, le vocabulaire et les références des milieux du
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

**Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** · **Supabase**
(auth + Postgres) · déployé sur **Vercel**.

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés Supabase
npm run dev                  # http://localhost:3000
```

Le site fonctionne **sans** clés Supabase : l'authentification se désactive
d'elle-même et tout le contenu reste accessible.

Pour activer les comptes : créer un projet Supabase, exécuter
[`supabase/schema.sql`](supabase/schema.sql) dans le SQL Editor, renseigner
`.env.local`.

```
app/                  pages et routes (App Router)
components/           Header, SearchBox, Quiz, AuthForm, …
lib/content.ts        chargement du contenu + index de recherche
lib/supabase/         clients serveur et navigateur
proxy.ts              rafraîchissement de session
content/modules/      le contenu, un fichier JSON par domaine
supabase/schema.sql   schéma et Row Level Security
docs/                 contexte, atlas, feuille de route, décisions
```

Le contenu est de la donnée, pas du code : une fiche est un objet JSON.

### Documentation

| Fichier | Contenu |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Contexte permanent + pièges techniques rencontrés |
| [`docs/CONTEXT.md`](docs/CONTEXT.md) | Vision, positionnement, ton, éthique |
| [`docs/TOPICS.md`](docs/TOPICS.md) | L'atlas des 673 sujets |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | État courant et feuille de route |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | Comment rédiger une fiche |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Journal des décisions |
