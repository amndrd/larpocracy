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

## 2026-08-28 — #027 Table rase du design, et reprise d'une maquette d'en-tête

**Ce qui est retiré.** Tout. Les huit pages de la vitrine, les neuf routes de
l'application, les vingt-huit composants, les dix-huit modules de `lib/`, le contenu,
le schéma Supabase, le proxy de session, et le système de jetons « deux lumières »
arrêté trois jours plus tôt (#026). Le site est réduit à trois fichiers : une
coquille, une page vide, une feuille de style.

Ce n'est pas un abandon des décisions de fond — les quatorze domaines, les principes
de contenu, les 673 sujets, l'éthique restent. C'est le **design** qui repart de zéro,
et lui seul.

**Ce qui le remplace.** L'en-tête d'une maquette statique fournie, reprise au sélecteur
près : un cadre fixe pleine hauteur, transparent aux clics, dont les quatre coins
portent le mot-logo, une barre de six pastilles à mi-hauteur, le bouton Menu, et un
bouton d'appel à l'action. Papier crème `#fbf9ef`, encre `#171412`, PP Neue Montreal
pour le texte et Youth pour les étiquettes.

**Pourquoi en CSS nu.** La maquette tient en cinq feuilles dont la cascade est réglée
au sélecteur près. Tailwind est retiré : le faire régénérer ces règles n'apporterait
qu'un risque de divergence, pour rien. L'ordre des couches — `properties`, `theme`,
`base`, `webflow`, `components`, `utilities`, puis les règles hors couche — est fixé
à la première ligne de `app/globals.css` et **ne doit pas changer sans vérifier le
rendu**.

**Ce qui a été rétabli.** La maquette avait perdu son JavaScript. Trois choses n'y
fonctionnaient donc plus, et sont réécrites ici : le menu mobile (la barre se retire
hors du cadre, le hamburger la rappelle, un voile dépoli passe derrière), le
croisement des deux traits du hamburger, et le point qui suit le curseur — figé, dans
la maquette, à la position de la sauvegarde d'origine.

**Ce qui n'a pas été repris.** Deux éléments de la maquette sont masqués à **toutes**
les largeurs par le cumul de deux règles : le sceau rond (`.brand`) et l'indicateur de
langue (`.lang`). Ils ne sont pas dans le balisage — les recopier n'aurait rien
affiché.

**Le mot-logo.** Le nom change, donc la marque ne peut pas être identique : les
courbes d'origine sont remplacées par du texte en Youth 900, empilé sur deux lignes,
à l'emplacement et à l'échelle de la marque reprise. Du texte plutôt que des courbes :
net à toute taille, et lisible par les moteurs de recherche.

**Vérification.** Les deux rendus ont été comparés côte à côte sur douze largeurs de
360 à 1920 px — position, taille, couleur, rayon, corps, affichage et opacité de
treize éléments : **156 mesures sur 156 identiques**. Le diff pixel des pages
complètes ne montre de différence que dans le mot-logo (0,11 % à 1440 px).

**Ce qui reste ouvert.** Les six entrées de la barre et le bouton d'appel pointent
vers des adresses qui n'existent pas encore. Le libellé du bouton — « book a call
now » — est celui de la maquette : il n'a pas été traduit ni adapté, faute d'une
décision sur ce que le bouton doit déclencher.

## 2026-09-01 — #029 Le titre du hero, repris de moneyincheck.org

*(Le #028 du 1er septembre — « le contenu revient par l'accroche » — a été révoqué
le jour même par 498ca11 : l'accroche n'avait pas été demandée. Le numéro n'est pas
réattribué, pour que les messages de commit restent lisibles.)*

**La demande.** Poser « MONEY IN CHECK » au centre du hero, dans la police, la
couleur et les dimensions de `moneyincheck.org` — ou, à défaut, dans la police
Google Fonts la plus proche.

**La police : Playfair Display, à défaut de PP Editorial Old.** Le modèle compose
son titre en **PP Editorial Old** Regular (Pangram Pangram) : `body` porte
`--font-serif: "PP Editorial Old", "Times New Roman", serif`, et `.hero__title` ne
redéclare pas de famille. Cette police n'est pas libre — gratuite en usage personnel,
payante en usage commercial — et récupérer le `.woff2` sur le serveur du modèle
serait la reprendre sans licence. Elle est donc écartée.

Le substitut est **Playfair Display**, sous licence OFL. Ce n'est pas un choix par
défaut : le modèle l'embarque lui-même, en variable 400–900, à côté de PP Editorial
Old — sans jamais l'appliquer en CSS. Ses auteurs y avaient donc vu le même
remplaçant. Même contraste fort, mêmes empattements à congés, même tenue en
capitales à grande taille. Elle est embarquée comme les deux autres, en
`next/font/local`, sous la variable `--font-editorial`.

**La couleur.** `#00846a`, reprise telle quelle sous le jeton `--vert`. Le fond
reste le papier du site (`#fbf9ef`) : le modèle pose son vert sur un gris `#e9e9e9`,
mais changer le fond dépassait la demande.

**Les dimensions, et pourquoi elles tombent juste.** Les deux sites mettent leur
dessin à l'échelle de la fenêtre, par des chemins différents :

| | modèle | LarpLvl |
|---|---|---|
| unité | `html { font-size: min(100vw/172.8, 100vh/101, 11.111px) }` | `body { font-size: --size-font }`, soit `clamp(768px,100vw,1920px)/90` |
| cadre de référence | 1728 × 1010 px | 1440 px |
| corps du titre | `34rem` | `min(17.708em, 33.66vh)` |

La conversion : `34 × 90 / 172.8 = 17.708em` reproduit le terme de largeur, et
`34 × 100/101 = 33.66vh` le terme de hauteur — celui qui, sur une fenêtre basse,
empêche deux lignes de 378 px de déborder. Le plafond à `11.111px` du modèle et le
`clamp` à 1920 px de LarpLvl coïncident : au-delà, les deux figent le titre à
377,8 px.

Sous 768 px, où `--size-font` ne s'applique pas, le modèle passe à
`clamp(6rem, 19vw, 14rem)` sur un rem de 10 px ; l'em valant alors 16 px, cela
s'écrit `clamp(3.75em, 19vw, 8.75em)`.

L'interlignage vient de la position des deux lignes du modèle — `8.9rem` et
`40.8rem`, soit 31,9rem d'écart pour 34rem de corps : **0,938**. Sous 768 px, 1,05.

**Vérification.** Corps mesuré au navigateur sur quatre fenêtres, contre le calcul
du modèle : 1440 × 900 → 283,3 px (modèle 283,3) · 1920 × 1010 → 340,0 (340,0) ·
1440 × 700 → 235,6 (235,6) · 390 × 844 → 74,1 (74,1). Couleur `rgb(0,132,106)`,
aucun débordement horizontal.

**Ce qui diffère, et qu'aucun réglage ne corrigera.** Playfair Display a une chasse
plus large que PP Editorial Old : à corps égal, les deux lignes occupent nettement
plus de largeur que sur le modèle, où elles laissent de la marge de part et d'autre.
C'est le prix de la substitution, pas une erreur de cote.

**Correctif du même jour : 95 %.** Le titre a été jugé un peu grand et ramené à
95 % — `min(16.823em, 31.98vh)`, et `clamp(3.56em, 18.05vw, 8.31em)` sous 768 px.
L'interlignage étant un rapport, il suit seul. C'est la contrepartie de la chasse
de Playfair : à corps égal, les lignes touchaient presque les bords, là où le modèle
laisse de la marge. À 1440 px, la ligne haute passe de 1329 à 1263 px de large,
soit 88 px de marge de chaque côté. Le rapport aux cotes du modèle est donc
désormais de 0,95, et non de 1.

**Ce qui reste ouvert.** Le titre est celui du modèle, pas celui de LarpLvl. Il tient
lieu de banc d'essai pour le hero : le mot final reste à décider.

## 2026-09-01 — #030 Le mot-logo passe à la serif du titre

**La demande.** Mettre le mot-logo dans la police du titre du hero.

**Ce qui change.** `.ba_logo_word` passe de **Youth 900** à **Playfair Display 400**,
la serif posée en #029. Le mot-logo et le titre parlent désormais la même langue :
c'est ce qui fait tenir une identité, et la page n'a plus deux voix qui se disputent
le haut de l'écran.

**Le resserrement disparaît.** Le `letter-spacing: -0.03em` du mot-logo n'était pas
un choix de style mais un correctif taillé pour Youth, une grasse dont les lettres
se touchent presque. Une serif à empattements posée dans le même resserrement
s'empâte : les empattements se chevauchent, et le mot devient une tache. La valeur
passe donc à `0`. C'est la seule autre modification.

**Ce qui n'a pas bougé.** Le corps (`1.75em`), la largeur du bloc, la position dans
le cadre. Le mot mesure 94 px de large à 1440 px, contre 91 en Youth : la
substitution ne déplace rien autour d'elle. Les étiquettes, les boutons et le
bouton d'appel restent en Youth — la demande portait sur le mot-logo seul.

**Correctif du même jour : le Bold.** Le Regular s'est révélé trop léger à côté du
bouton « GET STARTED », comme prévu ci-dessus. Un second `.woff2` est embarqué —
**Playfair Display 700** — et `editorial` passe d'un fichier unique à un tableau de
deux, comme `youth`. Le mot-logo prend le 700, le titre du hero garde le 400 : une
seule famille, deux graisses, une seule variable CSS.

Le 700 plutôt que le 900 : le contraste de Playfair est déjà fort, et le Black
transforme un mot de sept lettres en pavé. Le mot passe de 94 à 99 px de large à
1440 px — la barre du haut ne bouge pas pour autant.

## 2026-09-01 — #031 Le titre du hero devient « MONEY WELL SPOKEN »

**Le choix.** Le titre n'est plus celui du modèle. « MONEY WELL SPOKEN » dit la
promesse du site en trois mots : *well spoken* veut dire éloquent, et l'oreille
entend *money well spent*. Le site n'apprend pas la finance — il apprend à en
**parler**. C'est le seul titre de la liste qui nomme la conversation, qui est le
produit.

**La réserve, consignée pour mémoire.** Le site couvre quatorze domaines, dont un
seul est l'argent et la finance ; les treize autres sont le vin, les montres, l'art,
l'étiquette, le sport, la géopolitique. « MONEY » en tête de page promet donc un
site de finance et en livre un autre. Des titres sans le mot avaient été proposés —
`WORTH / KNOWING`, `NEVER / OUT OF DEPTH`, `HOLD / THE ROOM`. Le choix a été fait en
connaissance de cause.

**Ce que le changement de texte a imposé.** La largeur d'une ligne est le produit
du corps et du nombre de signes. Mesuré au navigateur, en Playfair Display :

| ligne | largeur, en corps |
|---|---|
| `IN CHECK` | 4.692 × |
| `WELL SPOKEN` | 6.767 × |

Soit 44 % de plus. Le corps de #029 aurait fait déborder la ligne, et le navigateur
l'aurait repliée en deux — trois lignes empilées au lieu de l'escalier à deux.

Les trois termes du corps sont donc multipliés par `4.692 / 6.767 = 0.693` :
`min(11.664em, 22.17vh)` au-dessus de 768 px, `clamp(2.47em, 12.52vw, 5.76em)` en
dessous. Le bloc de texte retrouve **l'empreinte exacte** qu'il avait : 1263 px de
large à 1440 px de fenêtre, 1515 à 1920, 1050 à 1440 × 700, 330 à 390 — les quatre
mesures d'avant, au pixel près. Ce qui change, c'est la hauteur : deux lignes de
187 px au lieu de 269. Le titre est plus large que haut, là où il était carré.

**`white-space: nowrap`.** Ajouté sur `.hero_ligne`. Le découpage en lignes est
celui du balisage, et une fenêtre étroite ne peut plus en replier une dans le dos
du dessin. Sans danger de débordement : le corps suit la largeur de la fenêtre, donc
la ligne reste proportionnée jusqu'au plancher du `clamp` — vérifié jusqu'à 280 px.

**Ce qui reste du modèle.** La couleur `#00846a` et l'interlignage `0.938`, qui est
un rapport et suit le corps tout seul. Les cotes, elles, ne sont plus celles de
`moneyincheck.org` : elles sont celles que ce texte-ci exige pour occuper la même
place. Les commentaires du CSS le disent.

## 2026-09-01 — #032 Le titre passe à trois lignes

**La demande.** Découper « MONEY WELL SPOKEN » en trois lignes plutôt que deux.

**Ce que cela change de fond.** Ce n'est pas qu'un découpage : **ce qui commande le
corps change de nature.**

À deux lignes, la contrainte était la largeur — `WELL SPOKEN` mesure 6.767 fois le
corps, et devait tenir dans la fenêtre. À trois lignes, la ligne la plus large n'est
plus que `SPOKEN`, 3.828 fois le corps : la largeur cesse de contraindre. C'est la
hauteur qui prend le relais, la pile valant `3 × 0.938 = 2.81` fois le corps.

Le corps est donc désormais **commandé par la hauteur de la fenêtre** :
`min(20.63em, 27vh)` au-dessus de 768 px.

**Pourquoi 27vh.** Trois valeurs ont été rendues et comparées à 1440 × 900 :

| | corps | hauteur de la pile | marge latérale |
|---|---|---|---|
| 24vh | 216 px | 68 % | 307 px |
| **27vh** | **243 px** | **76 %** | **255 px** |
| 30vh | 270 px | 84 % | 203 px |

À 30vh la pile bute en haut sur l'en-tête et en bas sur le bouton Menu. À 24vh elle
flotte. 27vh la dégage des deux sans la rapetisser.

**Le terme en `em` devient un plafond.** `20.63em` vaut la largeur qu'avait le bloc
jusqu'ici — 1263 px à 1440 px de fenêtre. Il ne joue plus que sur une fenêtre plus
haute que large (rapport supérieur à 0.849), où la hauteur cesse de contraindre :
un écran en portrait. Ailleurs, c'est `27vh` qui gagne.

**Le garde-fou de hauteur descend aussi sous 768 px.** La branche mobile devient
`min(clamp(4.37em, 22.1vw, 10.18em), 27vh)`. Elle reste commandée par la largeur sur
un téléphone tenu droit — la pile n'y occupe que 32 % de la hauteur — mais le `min()`
la rattrape sur une fenêtre basse. Sans lui, une fenêtre de 767 × 400 aurait débordé :
le passage de deux à trois lignes a multiplié le risque par 1.5, et l'ancienne branche
mobile n'avait aucun terme de hauteur.

**Vérification.** Six fenêtres, corps et largeur mesurés au navigateur, aucun
débordement horizontal : 1440 × 900 → 243 px, 76 % de hauteur · 1920 × 1010 → 273 px,
76 % · 1440 × 700 → 189 px, 76 % · 767 × 400 → 108 px, 85 % (le `min()` de hauteur
joue) · 390 × 844 → 86 px, 32 % · 320 × 568 → 71 px, 39 %.

**Ce qui ne bouge pas.** La couleur `#00846a`, l'interlignage `0.938`, le `nowrap`
des lignes, et le mot-logo.

---

## 2026-09-02 — #033 La grille de fond et le rideau d'intro, repris de moneyincheck.org

**La demande.** Reprendre de `moneyincheck.org` le fond et son animation d'entrée —
sans les « formules chimiques » qui s'y écrivent.

**Ce que sont ces formules.** Des coups d'échecs. Le modèle est le site d'un roman
qui file la métaphore de la partie ; son écran de chargement fait apparaître à la
main `e4`, `e5`, `Nf3`, `Nc6`, `Bc4`… dans une police manuscrite (Liu Jian Mao Cao),
par-dessus une vidéo au trait. **Rien de tout cela n'est repris** : ni les coups, ni
la vidéo, ni la police manuscrite. Ils appartiennent au sujet du modèle, pas au nôtre.
Ce qui est repris, c'est la mécanique — la grille, et son zoom.

### La grille

Deux dégradés croisés, pas d'image : chacun est un trait d'un pixel suivi de
transparent, répété à la taille d'une case.

| | modèle | ici |
|---|---|---|
| Trait | `rgba(0,0,0,.1)`, 1 px | `rgb(23 20 18 / 10%)`, 1 px — l'encre du site |
| Case | `20rem` | `10.4em` |
| Origine | `calc(50vw - 70rem)` / `10rem` | `calc(50vw - 5.2em)` / `5.2em` |
| Téléphone | `25vw` | `25vw` |

**Pourquoi 10,4em.** Le rem du modèle vaut `min(100vw / 172.8, 100vh / 101, 11.111px)`,
soit **8,33 px** à 1440 px de fenêtre : sa case de 20rem mesure donc 166 px. Notre
corps de page — `--size-font` — vaut 16 px à la même largeur : 166 / 16 = **10,4em**.
La case fait la même chose à l'écran, et suit la fenêtre comme tout le reste du dessin.

**Pourquoi le décalage d'une demi-case.** Il pose le *centre* d'une case au milieu de
la fenêtre, et non un trait : le titre du hero ne se fait pas barrer verticalement.

**Pourquoi `50vw` et non `50%`.** Pour que la valeur calculée reste en pixels. Le
rideau relit les cotes de la grille au chargement, par `getComputedStyle` ; un
pourcentage y survit tel quel, et il ne saurait pas quoi en faire.

**Pourquoi `vw` sous 768 px.** Sous ce seuil, le corps de page cesse de suivre la
fenêtre — il est figé à 14 px. Une case en `em` y garderait sa taille de grand écran :
deux cases et demie en travers d'un téléphone. Le modèle fait le même choix.

### Le rideau

Une page de papier millimétré posée devant le site, dont les cases grandissent depuis
le centre de la fenêtre jusqu'à rejoindre **exactement** celles de la grille de fond.
Le rideau s'efface alors, et la page est déjà en place derrière : rien ne saute.

Les cotes sont celles du modèle, relevées dans son script : échelle de départ
**0,665** en largeur et **0,7** en hauteur, zoom de **800 ms**, sur la cubique
`t < 0.5 ? 4t³ : 1 - (-2t + 2)³ / 2` — accélérée à l'entrée, freinée à la sortie.

**Le zoom joue sur `background-size`, jamais sur `transform`.** C'est le point
technique de toute l'affaire. Une mise à l'échelle grossirait le trait avec les
cases, et le fond cesserait d'être du papier technique pour devenir un damier qui
enfle. En faisant grandir les cases pendant que le trait reste à un pixel, on obtient
ce que fait une caméra qui avance : les lignes s'écartent, elles ne s'épaississent pas.

L'origine se rapproche du centre dans la même proportion que les cases grandissent —
`origine = centre + échelle × (origine au repos − centre)` — sans quoi la grille se
déploierait depuis le coin supérieur gauche.

**Ce qui déclenche la levée.** `document.fonts.ready`, jamais avant 600 ms ni après
2 s. C'est la raison d'être du rideau au-delà du décor : le titre du hero est en
Playfair, et sans lui on le verrait sauter de la police de secours à la sienne. Le
modèle attendait de la même façon — mais sa vidéo, et sur 2,6 s / 4 s.

**Trois garde-fous.**

1. **Rendu par le serveur**, et non monté après coup : autrement la page s'afficherait
   le temps d'une image avant d'être recouverte, ce qui est pire que pas de rideau.
2. **`noscript`** : sans JavaScript personne ne lève le rideau, et il masquerait le
   site pour de bon. Une règle dans un `noscript` le retire — vérifié, moteur coupé.
3. **`prefers-reduced-motion`** : ni rideau ni zoom. Le CSS le masque — avant React,
   donc sans l'image de trop — et le composant se contente de le retirer du balisage.

Le défilement est bloqué tant que le rideau est là, et rendu à la fin du zoom : la
page est déjà en place derrière, et une molette la ferait défiler sans que rien ne
bouge à l'écran. Le modèle fait de même.

**Vérification.** Rendu au navigateur, cotes relevées image par image à 1440 × 900 :
la case part de 110,656 px (0,665 × 166,4), passe par 121,4 puis 154,6, arrive à
166,400 px — la cote exacte de la grille de fond, à laquelle elle se superpose sans
écart — puis le rideau est retiré du balisage. Moteur JavaScript coupé : rideau
`display: none`, site lisible.

---

## 2026-09-03 — #034 Le manifeste, sous le hero

**La demande.** Un texte sous le hero, dans la veine de celui du modèle, au thème de
LarpLvl, et dans la même police.

**Ce qu'il dit.** Deux paragraphes, et une seule idée par paragraphe. Le premier pose
le problème — on entre dans une pièce sans en connaître les règles, et la conversation
passe sans nous. Le second pose la réponse, et la limite : *« On n'apprend pas ici à
mentir : on apprend à savoir. »* Cette phrase n'est pas une formule ; c'est le
principe § 4.5 du projet — zéro fraude — écrit en clair sur la page d'accueil, là où
un visiteur le lit avant de s'inscrire. La sobriété (§ 4.4) est nommée dans la même
phrase que le vocabulaire et les références, et non après : elle en fait partie.

Le modèle parlait d'argent et d'échecs. Rien de son texte n'est traduit ni décalqué —
seule la forme est reprise : deux paragraphes centrés, à la serif du titre, larges.

**La police.** Playfair Display en Regular, c'est-à-dire la serif du titre du hero
(#029) — la demande le voulait. Le modèle pose son manifeste en **200**, un gras que
nous n'embarquons pas : la fonte du site ne porte que 400 et 700.

**Les cotes, converties comme au #033.** Le rem du modèle vaut 8,33 px à 1440 px de
fenêtre, le nôtre 16.

| | modèle | conversion | ici |
|---|---|---|---|
| Corps | 9,6rem = 80 px | 80 / 16 | 5em, puis **4,28em** |
| Interligne | 13rem = 108 px | 108 / 80 | **1,354** |
| Largeur | 166,1rem = 1384 px | 1384 / 16 | 86,5em, puis **74em** |
| Écart des paragraphes | 13rem | une interligne | **1,354em** |

**Deux écarts au modèle, et ils viennent tous deux de notre en-tête**, qu'il n'a pas.

Rendu à 86,5em, le bloc mesure 1384 px et passe **sous le rail des six pastilles**,
qui court de 32 à 96 px sur la gauche — mesuré au navigateur. Il est ramené à **74em**,
soit 1184 px à 1440 px de fenêtre : 128 px de garde de chaque côté, donc 32 px après
le rail.

Le corps suit dans la même proportion, faute de quoi la ligne se serait raccourcie de
quinze pour cent. Le modèle pose 9,6 sur 166,1, soit **5,78 %** de la largeur du bloc ;
5,78 % de 74em font **4,28em**. Une ligne compte ainsi les mêmes signes que la sienne :
17,4 cadratins contre 17,3.

**Le corps est porté par les paragraphes, pas par la section**, pour que la largeur en
`em` de celle-ci reste comptée sur le corps de page et non sur elle-même.

**Sur téléphone**, le corps de page est figé à 14 px et 4,28em y vaudrait encore 60 px
sur 375 px de large. Il repasse en `vw`, borné des deux côtés — `clamp(1.7em, 7vw,
3.2em)`, soit 24 à 45 px. Le modèle fait de même, entre 24 et 46 px. La garde se
resserre, et le rail a cédé la place au hamburger : plus rien à dégager.

**Vérification.** Rendu au navigateur à 1440 × 900 et à 390 × 844 : le bloc dégage le
rail des deux côtés, tombe sur la grille, et aucun débordement horizontal.

---

## 2026-09-04 — #035 Le rouleau de billets, au centre du titre

**La demande.** Poser l'image `money-roll.png` au centre du titre du hero, comme sur
`moneyincheck.org`.

**Ce que fait le modèle, exactement.** Son image du hero n'est pas un cavalier
d'échecs *à côté* du titre : c'est un cavalier taillé dans une liasse de billets,
posé **par-dessus** les lettres — `z-index: 2` contre `1` pour le titre. Le mot est
partiellement couvert, et c'est l'effet voulu. Notre rouleau est l'autre moitié de la
même idée, et il prend la même place.

**Le corps du titre devient un jeton.** `--corps-titre`, posé sur `.hero`. Le titre
s'en sert pour son `font-size`, le rouleau pour sa `height`. Ils ne peuvent donc plus
se désolidariser : le rouleau tombe sur le même mot à toute taille de fenêtre. Aucune
valeur du titre n'a changé au passage.

**La cote : 1,62 corps de titre, et non les 1,71 du modèle.** Mesures relevées sur son
image (`horse.webp`, extraite du préchargement en base64 de sa page) :

| | modèle | ici |
|---|---|---|
| Fichier | 2427 × 1762 | 420 × 594 |
| Sujet visible dans le fichier | 644 × 1162 — 26,5 % × 65,9 % | 416 × 589 — tout le fichier |
| Rapport du sujet | **0,554** | **0,706** |
| Boîte affichée à 1440 px | 1011 × 733 | — |
| Sujet affiché | 268 × 484 px | 278 × 394 px |
| Hauteur, en corps de titre | 1,71 | **1,62** |
| Largeur, en part de la ligne la plus large | 29,9 % | **29,9 %** |

Son cavalier est beaucoup plus étroit que notre rouleau — 0,554 de rapport contre
0,706. **Les deux proportions ne peuvent pas coïncider à la fois** : à hauteur égale
le rouleau est un quart plus large, à largeur égale il est plus court.

C'est la **largeur** qui est retenue, parce que c'est elle qui décide de ce qui reste
lisible du mot couvert. À 1,71 corps, le rouleau mangeait « WELL » en entier ; à 1,62,
le `W` et le `LL` ressortent, et le titre se lit encore. La hauteur suit — 1,62 corps
au lieu de 1,71, un écart de cinq pour cent que l'œil ne relève pas.

**Le chargement.** L'image est la plus grande chose peinte au premier écran : c'est
elle que mesure le LCP. Trois conséquences.

1. `fetchPriority="high"` et `decoding="async"` — les marques que le modèle met sur
   la sienne.
2. **Le PNG passe en WebP** : 358 ko à 79 ko, 4,5 fois moins, pour un écart
   quadratique moyen de **1,57 sur 255** mesuré sur les seuls pixels opaques, et une
   couche alpha identique au bit près. (Mesurer l'écart sur toute l'image donnerait
   35 sur 255, mais c'est un artefact : dans les zones transparentes le RVB ne veut
   rien dire, et l'encodeur y met ce qu'il veut.) Le PNG d'origine reste dans
   l'historique, au commit `fd75b99`.
3. **Le rideau d'intro (#033) attend le rouleau**, en plus des polices. Sans cela il
   apparaîtrait après coup au milieu du titre. `decode()` et non `complete` : l'un dit
   que l'image est prête à être peinte, l'autre seulement qu'elle est téléchargée. Une
   image en erreur ne bloque pas le rideau.

**Une réserve, à connaître.** Le fichier fait 420 × 594 et s'affiche à 278 × 394 points
à 1440 px de fenêtre — soit **556 × 788 pixels sur un écran à double densité**. La
source est donc en deçà de ce qu'un écran Retina demande, d'un facteur 1,33 : le
rouleau y est légèrement adouci. Rien ne le corrige côté code — il faudrait une source
plus grande. C'est aussi pourquoi le WebP est encodé en q95 et non plus bas.

**Vérification.** Six fenêtres, mesurées au navigateur après l'intro. La part de la
ligne la plus large vaut **29,9 % partout** — 1920 × 1010, 1440 × 900, 1440 × 700,
767 × 400, 390 × 844, 320 × 568 — l'écart au centre du titre est nul au dixième de
point près, et aucune ne déborde horizontalement. Sur téléphone, le sujet fait 1,15
corps de large contre 1,0 pour celui du modèle : la proportion mobile est déjà la
sienne, rien n'a eu à être repris.

## 2026-09-06 — #036 Le titre du hero devient « MONEY TALKS »

**La demande.** Un titre en deux mots, avec « money ».

**Le choix.** « MONEY TALKS », contre « MONEY SPOKEN », « SPEAK MONEY » et
« MONEY FLUENT ». C'est l'idiome, et c'est le plus percutant des quatre : deux mots
que personne n'a besoin de lire deux fois.

**La réserve, assumée.** L'idiome dit que l'argent parle à votre place — ce que le
manifeste, deux écrans plus bas, dément explicitement : « On n'apprend pas ici à
mentir : on apprend à savoir. » Le titre pose donc le cliché, et le manifeste
répond. C'est une tension voulue, pas un oubli ; elle ne tient que tant que le
manifeste reste sous le hero (#034).

**Ce que le changement de texte casse.** Trois cotes, toutes dérivées de la ligne la
plus large, qui n'est plus « SPOKEN » mais « MONEY » :

| | « MONEY WELL SPOKEN » | « MONEY TALKS » |
|---|---|---|
| Lignes | 3 | **2** |
| Ligne la plus large | SPOKEN, 3,828 corps | **MONEY, 3,502 corps** |
| Hauteur de la pile | 2,81 corps | **1,88 corps** |

Le rapport des deux mots vaut **1,093**, et c'est lui qui commande tout le reste.

**1 — Le corps retrouve celui du modèle.** À trois lignes, c'était la hauteur qui
touchait les bords en premier, d'où `27vh` (#032). À deux lignes la pile ne fait plus
que 1,88 corps : le titre ne remplissait plus que 50,6 % de la hauteur. Il repasse à
`31.5vh`, qui n'est pas une valeur trouvée à l'œil — `moneyincheck.org` écrit son
titre, deux lignes comme le nôtre à nouveau, en 34rem, et son rem vaut 8,33 px à
1440 px de fenêtre. Soit 283 px, soit 31,5 % d'une fenêtre de 900. Le titre reprend
donc exactement la proportion du modèle, que le passage à trois lignes avait quittée.

**2 — Le plafond en `em` monte de 20.63 à 22.55.** Il tient le bloc à la largeur qui
a toujours été la sienne, 78,97em — 1263 px à 1440 px de fenêtre. Comme la ligne la
plus large a rétréci de 1,093, le corps qui la tient à cette largeur monte d'autant.
Le plafond ne joue que sur une fenêtre plus haute que large.

**3 — Les cotes mobiles montent du même facteur.** Sous 768 px c'est la largeur qui
commande : `clamp(4.37em, 22.1vw, 10.18em)` devient `clamp(4.78em, 24.16vw, 11.13em)`,
ce qui rend au bloc les 84,6 % de la fenêtre qu'il occupait à trois lignes — il était
tombé à 77,4 %. Le `27vh` du terme mobile ne bouge pas : il ne joue que sur un
téléphone couché, où il tient déjà le titre à distance de la barre du haut.

**4 — Le rouleau redescend à 1,48 corps.** La règle de #035 n'a pas changé : c'est la
largeur du rouleau qui est tenue, à 29,9 % de la ligne la plus large, parce que c'est
elle qui décide de ce qui reste lisible du mot couvert. Mais la ligne a rétréci : à
1,62 corps le rouleau était monté à 32,7 %. 1,48 rend les 29,9 %.

**Ce que le rouleau couvre désormais.** Le centre du titre n'est plus le milieu d'une
ligne mais l'entre-deux : le rouleau ne couvre plus un mot, il mord sur les deux — le
bas de « MONEY », le haut de « TALKS ». Le `N` et le `L` disparaissent, `MO·EY` et
`TA·KS` se lisent encore.

**Vérification.** Huit fenêtres, mesurées au navigateur après l'intro.

| Fenêtre | Corps | En hauteur | Pile | « MONEY » en largeur | Rouleau / ligne |
|---|---|---|---|---|---|
| 1920 × 1010 | 318,1 px | 31,5 % | 59,1 % | 58,0 % | 29,9 % |
| 1440 × 900 | 283,5 px | 31,5 % | 59,1 % | 68,9 % | 29,9 % |
| 1440 × 700 | 220,5 px | 31,5 % | 59,1 % | 53,6 % | 29,9 % |
| 1280 × 800 | 252,0 px | 31,5 % | 59,1 % | 68,9 % | 29,9 % |
| 1024 × 1366 | 256,6 px | 18,8 % | 35,2 % | 87,7 % | 29,9 % |
| 767 × 400 | 108,0 px | 27,0 % | 56,7 % | 49,3 % | 29,9 % |
| 390 × 844 | 94,2 px | 11,2 % | 23,4 % | 84,6 % | 29,9 % |
| 320 × 568 | 77,3 px | 13,6 % | 28,6 % | 84,6 % | 29,9 % |

Le rouleau tient les 29,9 % partout, et aucune fenêtre ne déborde horizontalement.
Les deux dernières lignes sont commandées par le terme en `vw`, la cinquième par le
plafond en `em`, les autres par les `31.5vh`.

**Une réserve, à connaître.** À 1024 × 1366 — la seule fenêtre où le plafond en `em`
commande — le `M` de « MONEY » commence à 63 px et le rail de pastilles finit à 67 :
l'empattement les effleure. Ce n'est pas une régression, le plafond conservant la
largeur du bloc au pixel près : « SPOKEN » commençait déjà à 63 px sur cette fenêtre.
Le corriger demanderait de baisser le plafond, donc de rétrécir le titre en portrait.
Laissé tel quel.

## 2026-09-06 — #037 L'apparition du rouleau, une fois le rideau levé

**La demande.** Une animation d'apparition sur le rouleau de billets du hero.

**Le mouvement.** Le rouleau part à 0,9 de sa taille et six centièmes de sa hauteur
plus bas, transparent ; il arrive en place, opaque, en 640 ms — après 240 ms de
retard. Il grandit et monte, donc, dans le sens du zoom du rideau qui vient
d'avancer vers la page (#033) : c'est le même geste, poursuivi. Durées et courbe
sont les jetons du site, `--duration-lg`, `--duration-xs` et `--ease` ; rien n'a été
ajouté au vocabulaire.

**L'ordre voulu.** Le rideau se lève sur le titre seul, puis le rouleau se pose
dessus. C'est ce que le retard de 240 ms achète : sans lui, le rouleau paraîtrait
pendant que le rideau s'efface encore, et les deux mouvements se mangeraient.

**Le déclencheur : le rideau, par le combinateur de frères.** `.rideau` précède
`.page` dans le balisage et prend la classe `--fini` au terme de son zoom. Le
sélecteur `.rideau:not(.--fini) ~ .page .hero_rouleau` suffit donc à tout dire. Ni
état nouveau, ni composant client, ni balisage supplémentaire : le site en garde
deux, comme avant.

**Une transition, et non une animation.** C'est le point qui compte, et il n'est pas
affaire de goût. Le rideau est **retiré du balisage 420 ms après avoir pris sa
classe**, alors que le mouvement en dure 880. Une `animation` portée par ce sélecteur
mourrait avec lui : le rouleau sauterait à sa place au milieu de sa course. Une
`transition` appartient à la règle de base, qui ne cesse jamais de s'appliquer — une
fois partie, elle va au bout. Relevé au navigateur : à 1889 ms le rideau a disparu du
DOM, le rouleau est à 0,69 d'opacité, et il finit sa course jusqu'à 1,0 à 2323 ms.

**Le corollaire, et les deux replis.** Le sélecteur dit *quand cacher*, jamais *quand
montrer*. Là où il n'y a pas de rideau, il ne s'applique pas et le rouleau est visible
par défaut. Restent les deux cas où le rideau est présent sans jamais se lever :

1. **Moins de mouvement.** Le rideau est masqué en CSS mais reste dans le balisage le
   temps d'une image, avant que React ne le retire : sans règle, le rouleau
   clignoterait. Le bloc `prefers-reduced-motion` le pose donc visible et sans
   transition. Vérifié : opacité 1 sur tous les relevés, aucune valeur intermédiaire.
2. **Sans JavaScript.** Le rideau y est pour toujours, et rien ne viendra lui poser
   `--fini` : le rouleau ne paraîtrait jamais. Le bloc `noscript` qui masquait déjà le
   rideau le rend donc aussi. Il l'emporte à spécificité égale en venant après la
   feuille de style dans le document. Vérifié navigateur JavaScript coupé : opacité 1,
   boîte de 297 × 420.

**Le coût, à connaître.** Le rouleau est l'élément que mesure le LCP (#035), et un
élément à `opacity: 0` n'est pas candidat. Le LCP recule donc du retard plus une part
de la transition — de l'ordre de 400 ms — sur un chargement déjà commandé par le
rideau, qui tient entre 600 et 2000 ms. C'est le prix de l'ordre voulu ; il est
accepté ici parce que le rideau domine déjà la mesure. Si le rideau tombait un jour,
il faudrait rouvrir la question.
