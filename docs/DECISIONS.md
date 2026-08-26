# JOURNAL DES DÉCISIONS

> Append-only. On n'efface pas une décision, on en ajoute une qui la remplace.

---

## 2026-08-25 — #001 Nom du projet
**Larpocracy** (LARP + -cracy). Retenu contre *Maison Larp*, *Larp Society*, *LarpCode*.
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

Le sombre sert mieux Larpocracy que Toko : le noir chaud avec bordeaux et or est le
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
