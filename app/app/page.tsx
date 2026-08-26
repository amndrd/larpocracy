import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import DomainCard from '@/components/DomainCard';
import { ButtonLink } from '@/components/Button';
import { IconCadenas, IconEclair, IconFlamme, IconFleche, IconLire, IconTrophee } from '@/components/icons';
import { allCards, domains, getCards, stats } from '@/lib/content';
import { countFree } from '@/lib/access';
import { getActivityDays, getProgress } from '@/lib/progress';
import { getSession } from '@/lib/session';
import { bilan } from '@/lib/stats';

export const metadata: Metadata = { title: 'Tableau de bord' };

export default async function AppHome() {
  const [session, progress, jours] = await Promise.all([
    getSession(),
    getProgress(),
    getActivityDays(),
  ]);
  const b = bilan(progress, jours);
  const vide = domains.length === 0;

  // La dernière fiche ouverte, pour proposer de reprendre où on s'est arrêté.
  const derniere = [...progress].sort((a, b2) => b2.read_at.localeCompare(a.read_at))[0];
  const reprise = derniere
    ? allCards().find(({ card }) => card.id === derniere.card_id)
    : undefined;

  const libres = domains.reduce((a, d) => a + countFree(getCards(d.id)), 0);

  const compteurs = [
    { icone: <IconEclair className="size-4" />, valeur: b.xp.toLocaleString('fr-FR'), label: 'points' },
    { icone: <IconTrophee className="size-4" />, valeur: b.rang.actuel.nom, label: 'rang' },
    { icone: <IconFlamme className="size-4" />, valeur: String(b.serie), label: b.serie > 1 ? 'jours d’affilée' : 'jour d’affilée' },
    { icone: <IconLire className="size-4" />, valeur: `${b.fiches}`, label: `sur ${b.fichesTotal} fiches` },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <header>
        <p className="chip">Tableau de bord</p>
        <h1 className="headline mt-5 text-[clamp(1.875rem,4vw,2.75rem)]">
          Bonjour {session.nom}.{' '}
          <span className="headline-dim">
            {b.fiches === 0 ? 'On commence quelque part.' : 'On reprend où vous en étiez.'}
          </span>
        </h1>
      </header>

      {/* Compteurs */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {compteurs.map((c) => (
          <div key={c.label} className="card p-5">
            <span className="grid size-9 place-items-center rounded-full bg-white/[0.06] text-ink-2">
              {c.icone}
            </span>
            <p className="display mt-5 text-[1.75rem] leading-none">{c.valeur}</p>
            <p className="mt-1.5 text-[0.75rem] text-ink-3">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Reprendre */}
      {reprise && (
        <Link
          href={`/app/f/${reprise.domain.id}/${reprise.card.id}`}
          className="card card-lift mt-3 flex items-center gap-4 p-5 hover:card-lift-on"
        >
          <span className="min-w-0 flex-1">
            <span className="text-[0.75rem] text-ink-3">Reprendre</span>
            <span className="display mt-1 block truncate text-[1.125rem]">
              {reprise.card.title}
            </span>
          </span>
          <IconFleche className="size-4 shrink-0 text-ink-3" />
        </Link>
      )}

      {/* Formule */}
      {session.plan === 'free' && !session.demo && !vide && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-md bg-white/[0.04] p-5 ring-1 ring-white/[0.08] ring-inset">
          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-3">
            <IconCadenas className="mr-2 inline size-4 -translate-y-px" />
            Vous lisez la formule Libre : {libres} fiche{libres > 1 ? 's' : ''} ouverte
            {libres > 1 ? 's' : ''} sur {stats.cards}. La formule Pro déverrouille le reste.
          </p>
          <ButtonLink href="/pricing" taille="sm">
            Voir les formules
          </ButtonLink>
        </div>
      )}

      {/* Catalogue */}
      <h2 className="headline mt-12 text-[1.5rem]">Les domaines</h2>
      <div className="mt-5">
        {vide ? (
          <div className="card px-8 py-20 text-center">
            <p className="display text-[1.5rem]">Le contenu arrive.</p>
            <p className="mx-auto mt-4 max-w-[50ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Les domaines et les fiches se remplissent un par un. Votre compte, lui, est déjà
              prêt : la progression démarrera à la première fiche publiée.
            </p>
            <ButtonLink href="/news" variante="secondaire" className="mt-8">
              Suivre les nouvelles
            </ButtonLink>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {domains.map((d, i) => (
              <DomainCard key={d.id} d={d} index={i} plan={session.plan} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
