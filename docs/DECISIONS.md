# JOURNAL DES DÉCISIONS

> Append-only. On n'efface pas une décision, on en ajoute une qui la remplace.

---

## 2026-08-25 — #001 Nom du projet
**LarpLvl** (LARP + -cracy). Retenu contre *Maison Larp*, *Larp Society*, *LarpCode*.
Raison : dit exactement ce que fait le site, mémorable, porte l'auto-dérision nécessaire
pour que le concept ne soit pas grotesque. Baseline : « L'art de tenir la salle. »

## 2026-08-25 — #002 Langue
**Français**, avec équivalent anglais systématique sur les termes techniques.
Raison : densité et nuance en priorité ; une version bilingue complète aurait divisé
la vitesse de production par deux pour un bénéfice différé. L'anglais reste possible
en Phase 6 sans refonte (le contenu est déjà séparé du code).

## 2026-08-25 — #003 Stack
**HTML/CSS/JS vanilla, contenu en JSON, GitHub Pages, aucune dépendance.**
Raison : ce projet est un projet de contenu sur plusieurs années. Tout toolchain
(build, framework, CMS) devient une dette qui détourne du travail réel. Une fiche
doit être un objet JSON qu'on ajoute en 30 secondes.
Conséquence acceptée : pas de rendu serveur, SEO limité. Acceptable pour l'instant.

## 2026-08-25 — #004 Pas de compte utilisateur
Progression en **localStorage** uniquement. Pas de backend, pas de base, pas de RGPD,
pas d'inscription. Raison : la friction d'inscription tuerait l'usage, et la valeur du
site est dans le contenu, pas dans le suivi.

## 2026-08-25 — #005 Ligne éthique
Le site enseigne la culture, les codes et l'aisance. **Jamais la fraude** : ni faux
diplômes, ni fausses références, ni usurpation. Argument tenu explicitement dans le
domaine Méta-Larp, y compris sous son angle cynique : un mensonge vérifiable est le
seul faux pas irréparable.

## 2026-08-25 — #006 Exactitude factuelle
Aucun fait inventé, aucun chiffre approximatif présenté comme précis. En cas de doute,
on coupe. Raison : un site qui apprend à bluffer avec de fausses informations envoie
son utilisateur se faire corriger en public. C'est l'exact opposé du produit.

## 2026-08-25 — #007 Format signature
**Dis ça / Pas ça** est le format identitaire du site, présent dans chaque fiche.
Le « pas ça » doit être une erreur réaliste et intelligente, jamais une caricature.

## 2026-08-25 — #008 Ordre de production
On remplit par **fréquence d'usage réel**, pas par exhaustivité ni par ordre
alphabétique. Le champagne avant les yachts. Le golf avant la chasse.

## 2026-08-25 — #009 Rythme git
**Un commit par modification, poussé immédiatement.** Messages en français, à
l'impératif, préfixés du scope (`contenu:`, `site:`, `docs:`, `data:`).
Demande explicite du porteur du projet.

## 2026-08-25 — #010 Passage à Next.js (remplace #003)
Le site statique vanilla est remplacé par **Next.js 16 (App Router) + TypeScript +
Tailwind v4**, déployé sur **Vercel**.
Raison : il faut des comptes utilisateurs et, plus tard, un abonnement — donc un
serveur. La décision #003 (« zéro build ») était juste tant que le site n'était que du
contenu ; elle ne l'est plus dès qu'il y a des sessions et une base de données.
Bénéfice non prévu : les pages de contenu sont désormais prérendues, ce qui règle le
problème de référencement acté comme accepté en #003.
Ce qui ne change pas : le contenu reste du **JSON séparé du code**. Une fiche reste un
objet qu'on ajoute sans toucher au rendu.

## 2026-08-25 — #011 Design repris de zéro, thème clair
Direction **éditoriale** : fond blanc cassé (#fbfaf7), Instrument Serif à fort
contraste en titrage, Inter en labeur, filets 1px, grille, accent rouge d'encre.
Raison : le site est fait de textes longs et denses. Le thème sombre précédent était
élégant mais fatigant en lecture soutenue, et le doré appliqué à chaque gras rendait
le corps de texte illisible.

## 2026-08-25 — #012 Supabase pour l'auth et la base
**Supabase** (Postgres + Auth) plutôt que Clerk+Neon ou Auth.js+Neon.
Raison : un seul service pour l'authentification, la base et la sécurité (RLS), et un
branchement Stripe propre le moment venu.
Sécurité : la clé publique est exposée au navigateur — c'est prévu. La protection
repose entièrement sur les **policies RLS** de `supabase/schema.sql`, jamais sur le
secret de la clé. La clé `service_role` ne doit apparaître nulle part dans le dépôt.

## 2026-08-25 — #013 Progression liée au compte
La progression quitte le `localStorage` pour la table `card_progress`.
Raison : elle suit l'utilisateur d'un appareil à l'autre, et elle prépare les
fonctionnalités de révision.
Conséquence assumée : sans compte, la progression n'est plus mémorisée du tout. Le
contenu, lui, reste intégralement lisible sans connexion — c'est le point important.

## 2026-08-25 — #014 Abonnement : rien derrière un paiement aujourd'hui
Le champ `plan` (`free` | `pro`) existe en base et une page `/tarifs` annonce la
formule à venir, mais **aucune facturation n'est branchée**.
Raison : 5 fiches publiées sur 673 sujets. Faire payer maintenant reviendrait à vendre
une promesse.
Engagement pris publiquement sur la page : **aucune fiche déjà publiée ne passera
derrière un paiement.** Plus simple à tenir, plus honnête à annoncer.

## 2026-08-26 — #015 Pas de confirmation d'email à l'inscription
La confirmation d'adresse est **désactivée** dans Supabase.
Raison : le SMTP par défaut de Supabase est plafonné à quelques envois par heure —
il déclenche `email rate limit exceeded` dès le deuxième test et ne tient pas devant
de vrais visiteurs. Vérifier l'adresse n'apporte rien aujourd'hui : le compte ne sert
qu'à mémoriser la progression, et il n'y a aucune donnée sensible.
Conséquences assumées :
- les adresses ne sont pas vérifiées ;
- **la réinitialisation de mot de passe ne fonctionne pas** tant qu'aucun SMTP n'est
  branché — c'est la vraie limite de ce choix, à lever avant d'ouvrir largement.
À reprendre quand l'abonnement arrivera : brancher Resend (gratuit jusqu'à 3 000
emails/mois), puis réactiver la confirmation. Le code gère déjà les deux cas : si
`signUp` ne renvoie pas de session, l'écran affiche « vérifiez votre boîte mail ».

## 2026-08-26 — #016 Messages d'erreur d'authentification traduits
Les erreurs Supabase remontaient brutes et en anglais jusqu'à l'écran
(« email rate limit exceeded »). Elles passent par `lib/auth-errors.ts`.
Le repli n'expose jamais la chaîne technique d'origine : elle n'aide pas
l'utilisateur et renseigne inutilement sur l'infrastructure.
Un email inconnu et un mot de passe faux donnent volontairement le **même**
message : les distinguer révélerait quelles adresses ont un compte.

## 2026-08-26 — #017 Refonte du design : de l'éditorial à l'application
Le site abandonne le thème « papier » (blanc cassé, filets 1px, angles vifs, aucune
image, aucune animation) pour un design d'**application d'apprentissage** : fond gris
très clair, cartes blanches à coins arrondis, ombres douces, mouvement, et une photo
par domaine.
Raison : le contenu était présenté comme un long texte à lire alors que le produit est
un outil d'entraînement. Un catalogue de cartes annonce ce qu'on peut *faire* d'une
fiche ; un article ne l'annonce pas.
Ce qui **ne** change **pas** : le serif Instrument reste sur les titres. C'est la
signature du projet, et c'est ce qui empêche le site de ressembler à n'importe quelle
application d'apprentissage. L'anglo-saxonisme du modèle s'arrête au comportement.
Chaque domaine porte sa propre teinte (`lib/theme.ts`), exposée en variables CSS
`--dom` / `--dom-tint` plutôt qu'en classes : Tailwind ne peut pas voir quatorze jeux
de classes construits dynamiquement.

## 2026-08-26 — #018 Mode Cartes (révision par retournement)
Une fiche n'est plus seulement lisible : son lexique et ses noms propres se rejouent
en paquet de cartes sur `/f/<domaine>/<fiche>/cartes`. Recto le terme, verso la
définition ; pour un nom propre, le verso porte la prononciation — c'est exactement
ce que le principe n°3 du projet demande d'entraîner.
On juge « je savais » / « à revoir », et l'écran de fin ne repropose que les ratées.
Le paquet est dérivé du contenu existant (`deckOf`) : aucun champ à ajouter au JSON,
aucune fiche à réécrire. Une fiche sans lexique ni nom n'a pas de paquet, et le mode
n'est alors pas proposé.

## 2026-08-26 — #019 Visuels : Wikimedia Commons et Art Institute, licences vérifiables
Les 15 visuels (14 domaines + bannière) viennent de **Wikimedia Commons** et de
l'**Art Institute of Chicago**, exclusivement sous licence libre.
Raison du choix de la source : c'est la seule où la licence, l'auteur et l'URL
d'origine sont récupérables **par API** — donc vérifiables et consignables. Un site
qui exige « zéro fait inventé » ne peut pas illustrer avec des images dont il ne sait
pas d'où elles viennent.
Les crédits sont dans `content/credits.json` et publiés sur `/credits`.
Deux domaines (Conversation, Codes) sont illustrés par des **peintures en domaine
public** plutôt que par des photographies : aucune photo libre convenable n'existait,
et une scène de conversation peinte au XVIIe sert le sujet mieux qu'un cliché de
banque d'images.
Piège rencontré : `upload.wikimedia.org` ne sert que les largeurs de vignette déjà
en cache et renvoie **400** sur les autres. Il faut télécharger la taille fournie par
l'API et redimensionner localement.

## 2026-08-26 — #020 Interface sombre, inspirée de Toko
Référence explicite : le projet **Toko — Online Language Learning** (Halo Lab,
Behance). Ce qu'on lui emprunte, et ce qu'on refuse.

**Emprunté** : le fond sombre chaud (noir brun, jamais noir pur), la carte comme
unité, les pilules partout, le bento à cellules inégales, les cartes numérotées
`01 02 03`, la piste horizontale, les gros titres très serrés, les compteurs de
progression visibles, et le motif filaire à nœuds reliés.

**Refusé** : l'orange `#FF562B`, qui est une couleur d'application grand public et
détruirait le positionnement ; les illustrations au trait, qui n'ont de sens chez
Toko que parce qu'aucune photo n'illustre « aller faire les courses en espagnol » —
nos sujets, eux, se photographient ; et la grotesque en titre, remplacée par
Instrument Serif.

Le sombre sert mieux LarpLvl que Toko : le noir chaud avec bordeaux et or est le
registre du luxe et du pouvoir, et les visuels (Versailles, la galerie de musée, les
rouages, la cave) y gagnent beaucoup par rapport au fond blanc.
Conséquence assumée : la refonte claire du matin est remplacée, pas complétée.

Détail technique : sur fond sombre, l'élévation ne vient plus de l'ombre mais de la
**surface** — une carte est plus claire que le fond. `--shadow-*` ne sert plus qu'aux
éléments flottants. Les teintes de domaine ont été reprises (plus claires, un peu
désaturées) : les valeurs calées pour du blanc vibraient sur le noir.
La police d'interface passe d'Inter à **Inter Tight** : le resserrement est ce qui
donne à Toko sa densité, et il tient à côté du serif.

## 2026-08-26 — #021 Gamification : points, rangs, séries, distinctions
Le site affiche des points, un rang, une série de jours et six distinctions.
**Aucun point n'est offert, aucune monnaie n'est inventée** : 10 points par fiche
lue, 5 par bonne réponse, 2 par carte sue. C'est la seule forme acceptable ici — un
compteur qui monte sans qu'on ait appris serait exactement le contraire de ce que le
site enseigne.
Sept rangs, d'`Invité` à `Maître de maison`.

Deux ajouts au schéma, à **rejouer dans Supabase** (`supabase/schema.sql`) :
- `card_progress.cards_known` / `cards_total` — le mode Cartes produisait un résultat
  qui n'était pas conservé ;
- table `activity_days` — une ligne par jour actif. Nécessaire parce que
  `card_progress.read_at` ne garde que la **dernière** lecture d'une fiche : relire
  un ancien module écraserait la date et fausserait la série.

Tant que le SQL n'est pas rejoué, le site fonctionne : la série vaut 0 et les cartes
ne comptent pas de points. Aucune erreur visible.
Les compteurs de l'en-tête passent par `/api/bilan` plutôt que par le rendu serveur :
lire la session dans le header basculerait tout le site en dynamique (voir #017).

## 2026-08-26 — #022 Table rase du contenu
`content/domains.json` repasse à `[]`, `content/modules/` est vidé, les 15 visuels et
la page `/credits` sont supprimés. Le contenu sera reconstruit **étape par étape**.
Raison : les 5 fiches et les 14 domaines étaient une démonstration ; le vrai contenu
part d'une autre base. Rien n'est perdu — tout est dans l'historique git.

Conséquence traitée : **chaque page gère l'état vide** plutôt que de casser. Accueil,
catalogue, pied de page et compteurs affichent « le contenu arrive » au lieu de
compter jusqu'à zéro. Le site reste présentable pendant toute la phase de
remplissage, ce qui est la condition pour qu'elle soit tenable.

Les images changent de régime : elles vivent dans `public/images/`, y sont déposées à
la main, et sont **déclarées** dans le JSON (`"image": "fichier.jpg"`). Pas de
convention de nom implicite : elle produirait une image cassée dès qu'un fichier
manque, et Next ne peut pas vérifier l'existence d'un fichier au rendu. Sans image
déclarée, un aplat à la teinte du domaine prend la place.

## 2026-08-26 — #023 Retour au clair, registre Apple / Quizlet, barre flottante
Troisième et dernier réglage visuel de la journée. Le sombre inspiré de Toko (#020)
est remplacé par un **clair** : gris `#f5f5f7`, cartes blanches, grands rayons,
ombres larges et douces.
Ce qui survit de #020 : la structure (bento, cartes numérotées, piste horizontale,
pilules), la gamification, Inter Tight, et le motif filaire de l'accueil.
Ce qui survit depuis le début : Instrument Serif sur les titres.

La navigation devient une **barre flottante** détachée du bord haut, en verre dépoli,
avec logo, Contenu, Tarifs, une loupe qui déplie la recherche, puis Connexion et
S'inscrire. Sur mobile, un panneau se déplie sous la barre.

Deux pièges rencontrés, tous deux consignés dans `CLAUDE.md` :
- `backdrop-filter` déclaré dans un `@utility` Tailwind v4 **ne s'applique pas** —
  la propriété est pilotée par les variables internes de Tailwind. Il faut passer par
  `backdrop-blur-*` et `backdrop-saturate-*`. Le menu mobile était translucide sans
  flou, et le texte de la page se lisait au travers.
- La barre étant `fixed`, elle sort du flux : `<main>` porte un `pt-20 sm:pt-24`,
  sans quoi les titres passent dessous.

## 2026-08-26 — #024 Le site devient LarpLvl, et prend le registre de fora.so
**Nom** : Larpocracy devient **LarpLvl**. Le dépôt, lui, reste
`github.com/amndrd/larpocracy` — renommer un dépôt public casse les liens entrants
pour un gain nul.

**Design** : référence explicite, `fora.so`. Relevé sur le site puis reproduit —
noir pur `#000`, blanc chaud `#fff3f0` (jamais `#fff`), secondaires à 80 % et 65 %,
filets à 10 %, panneaux `rgba(23,23,23,.85)` cernés d'un filet clair intérieur,
rayon dominant 16 px, ombre unique et diffuse `0 1px 32px rgba(0,0,0,.35)`.
Le dégradé de bannière est un radial de crépuscule, transposé du modèle
(`200% 83% at 50% 0`, ardoise → gris-bleu → rose fané).

Composition reprise : tout est **centré** en bannière, chaque section s'ouvre sur une
pastille, et le titre tient sur deux temps dont **le second s'éteint**
(`headline-dim`) — c'est la signature typographique du modèle.
Typographie : graisse 400, interlettre −0.04 em, interligne 1.15.

**Conséquence assumée : Instrument Serif est retiré.** Le serif avait survécu à trois
refontes et faisait l'identité du projet, mais le modèle est intégralement en
grotesque et le nouveau nom, plus court et plus technique, s'en accommode mieux.
C'est réversible en un commit si le serif manque.

**Mouvement** : le modèle n'utilise **aucune animation CSS** — tout est déclenché au
défilement (`will-change: transform` sur une centaine d'éléments) avec une courbe
`cubic-bezier(0.44, 0, 0.56, 1)`, reprise ici en `--ease-fora`. On reproduit la figure
avec `components/Reveal.tsx` (IntersectionObserver, fondu + remontée de 24 px, cascade
par `delay`). L'état initial vit dans la feuille de style plutôt que dans une classe :
sinon le bloc clignoterait avant l'hydratation.

**Navigation en anglais** : Contenu · About · Features · Pricing · News, puis Login et
Get started. Trois pages nouvelles (`/about` reprend le manifeste, `/features`,
`/news`), et `/tarifs` devient `/pricing`. Les anciennes adresses redirigent en 308
depuis `next.config.ts` plutôt que de renvoyer un 404.
Le contenu des fiches reste en français : c'est la langue du produit, l'anglais ne
sert qu'à la barre, comme sur la plupart des sites du même registre.

**Le journal de bord** (`content/news.json`) est vide, comme le reste du contenu, et
s'alimente entrée par entrée.

## 2026-08-26 — #025 Vitrine et application séparées, contenu freemium
Modèle repris de Figma : le visiteur arrive sur une page de vente, crée un compte, et
**entre alors dans une application** qui ne ressemble pas à la vitrine.

**Deux mondes, deux châssis.**
- `app/(site)/**` — la vitrine. Prérendue en statique, barre flottante, pied de page.
- `app/app/**` — l'application. Rendue à la demande, barre latérale, session requise.

Le contraste est le but : c'est lui qui fait sentir qu'on est entré quelque part.
Un compte déjà connecté qui arrive sur `/` est envoyé sur `/app` — la redirection vit
dans `proxy.ts` et non dans la page, sinon la vitrine entière basculerait en dynamique.

**Freemium.** Une fiche porte `"free": true` et s'ouvre à tous, ou demande la formule
Pro. Pas de règle dérivée du niveau ou du rang dans le domaine : une règle implicite
se retournerait contre soi le jour où une fiche de bases mériterait d'être l'appât
payant. Le choix est explicite, fiche par fiche.

**Le point technique qui commande tout le reste** : un contenu verrouillé ne doit
jamais partir dans le HTML. Masquer visuellement ne suffit pas — la source reste
lisible. Donc :
- `app/app/**` est `dynamic = 'force-dynamic'` : le rendu connaît la formule ;
- la page de fiche **coupe avant** de rendre sections, lexique et test, elle ne les
  cache pas ;
- le mode Cartes d'une fiche fermée renvoie sur la fiche, qui porte le verrou ;
- `search(q, limit, plan)` écarte les termes et prononciations des fiches
  verrouillées. Les titres restent trouvables : un titre ne livre rien.

Vérifié en conditions réelles avec un contenu d'essai portant des marqueurs :
aucun des cinq marqueurs secrets n'apparaissait dans le HTML de la fiche fermée.

**Ce que cette décision remplace.** #014 promettait qu'« aucune fiche déjà publiée ne
passera derrière un paiement ». Le contenu ayant été remis à zéro (#022), aucune fiche
publiée n'est verrouillée rétroactivement — la promesse n'est pas rompue, elle est
reformulée : **une fiche publiée comme libre le reste**. C'est écrit sur la page
Pricing, qui répond aussi à la question directement.

**Stripe n'est pas branché.** Tout le verrouillage, les écrans de déblocage et la
bascule `free → pro` côté base sont en place ; le bouton mène à un écran d'attente.
`PRIX_PRO` (`lib/plans.ts`) vaut `—` : aucun prix inventé ne traîne dans une page, il
reste une ligne à changer le jour où le montant est arrêté.

**Mode démo.** Sans clés Supabase, l'application s'ouvre entièrement, n'enregistre
rien et l'annonce dans la barre latérale. Sans cela le site serait mort en local.

## 2026-08-27 — #026 La vitrine passe au jour, dans le registre des studios de design

**Le point de départ.** Une demande de reprendre le design d'un site de studio de
création admiré. On ne recopie pas le code d'autrui : ce qui est repris ici est le
**registre** — une grammaire visuelle, qui n'appartient à personne. L'implémentation
est écrite de zéro. Ce que le modèle affiche de sa propre marque (son enseigne, ses
références clientes, ses textes) n'est pas transposé.

**Ce que le registre demande, et qui est fait :**

| Geste | Chez nous |
|---|---|
| Fond blanc, très grandes respirations | `.vitrine`, sections à `py-28` |
| Titres énormes, serrés, interligne < 1 | `@utility mega` (`-0.045em`, `0.92`) |
| Sections numérotées 01–04 | La méthode, les raisons d'écrire |
| Filets nus plutôt que cartes | `border-line` partout, plus de panneaux |
| Un bandeau de mots en boucle | `components/Ruban.tsx` |
| Un index qui se décale au survol | `@utility ligne` / `ligne-on` |
| L'enseigne géante en pied de page | `Footer`, `clamp(3.5rem, 18vw, 17rem)` |

**Le jour et la nuit coexistent.** La vitrine est claire, l'application reste sombre.
C'est #025 poussé à son terme : le contraste des deux châssis devient un contraste de
lumière, et l'on *voit* qu'on entre quelque part en se connectant.

Techniquement, tout tient dans un seul bloc CSS parce que les composants ne nomment
plus aucune couleur en dur. Les aplats discrets passaient par des `bg-white/[0.06]`
littéraux — ils passent désormais par trois jetons, `--color-veil`, `--color-edge` et
`--color-glass`, que `.vitrine` redéfinit pour son seul sous-arbre. Tailwind v4 émet
bien `var(--color-ink)` et non la valeur littérale : la redéfinition portée par une
classe suffit donc à tout inverser, sans variante `dark:` nulle part.

Le rebond du défilement découvrirait le noir du `body` : `html:has(.vitrine)` le
repeint en blanc.

**Ce qui remplace les témoignages.** Le registre réserve une section aux paroles de
clients. Nous n'en avons pas, et un témoignage inventé contredirait le principe n° 6.
C'est le format signature **« Dis ça / Pas ça »** qui occupe la place — il enseigne
au lieu de flatter, et ne coûte aucune affirmation invérifiable. Même raison pour le
bandeau de logos du héros : rien n'y remplace une preuve qu'on n'a pas.

**La barre de navigation.** Elle cesse d'être une pilule flottante (#024) : pleine
largeur, transparente sur le héros, elle ne prend son papier et son filet qu'une fois
qu'on a défilé de douze pixels. Onglets : Contenu · About · Features · Pricing ·
News · Contact us, puis **Login** et **Get started**. La recherche quitte la vitrine —
elle vit dans `AppShell`, où le contenu se trouve.

**L'enseigne.** Le monogramme disparaît : le nom seul, très serré, suivi d'un point
d'accent. Le modèle compose la sienne en PP Neue Montreal, sous licence commerciale :
ni embarquable ni redistribuable ici. Inter Tight, déjà chargée, en est la voisine la
plus proche dans le libre, et c'est l'interlettrage qui fait l'essentiel du caractère.
Si l'on veut s'en approcher davantage un jour, Switzer (Fontshare, libre d'usage
commercial) est le meilleur candidat, via `next/font/local`.

**`/contact`.** Nouvelle page, pour le nouvel onglet. Son adresse e-mail vaut `null`
tant qu'elle n'est pas arrêtée, et le bloc ne s'affiche alors pas : mieux vaut une
page sans e-mail qu'un lien mort — ou qu'une adresse personnelle publiée sans qu'on
l'ait décidé. Une ligne à changer le jour venu.

**`lib/catalogue.ts`.** Les quatorze domaines annoncés. Ce n'est pas du contenu :
`content/domains.json` reste la source de vérité de ce qui est *publié*, et la page
recoupe les deux pour ne marquer « Ouvert » que ce qui existe. Le programme ne peut
donc jamais laisser croire qu'une fiche est là quand elle ne l'est pas.
