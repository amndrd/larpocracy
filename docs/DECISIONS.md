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
