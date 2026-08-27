import Link from 'next/link';
import Container from './Container';
import { stats } from '@/lib/content';

const PLAN = [
  { href: '/app', label: 'Contenu' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact us' },
];

const COMPTE = [
  { href: '/connexion', label: 'Login' },
  { href: '/inscription', label: 'Get started' },
];

/**
 * Le pied du registre : les colonnes de liens d'abord, puis le nom en très
 * grand qui ferme la page. L'enseigne y est reprise en toutes lettres, à la
 * taille du bloc — c'est la signature qu'on laisse en sortant.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="max-w-[30ch] text-[1.25rem] leading-snug tracking-[-0.03em] text-ink">
              Apprends pour de vrai. C’est moins cher que de faire semblant.
            </p>
            <p className="mt-6 text-[0.8125rem] text-ink-4">
              {stats.cards > 0
                ? `${stats.cards} fiche${stats.cards > 1 ? 's' : ''} · ${stats.domains} domaine${stats.domains > 1 ? 's' : ''} ouvert${stats.domains > 1 ? 's' : ''} · ${stats.topics} sujets cartographiés`
                : 'Le contenu arrive, domaine par domaine.'}
            </p>
          </div>

          <Colonne titre="Le site" liens={PLAN} />

          <div>
            <p className="eyebrow">Votre compte</p>
            <ul className="mt-5 space-y-2.5">
              {COMPTE.map((l) => (
                <li key={l.href}>
                  <Lien href={l.href}>{l.label}</Lien>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/amndrd/larpocracy"
                  className="souligne text-[0.875rem] text-ink-3 transition-colors duration-[400ms] ease-[var(--ease-fora)] hover:text-ink hover:souligne-on"
                >
                  Code source
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* L'enseigne pleine largeur. Décorative : le nom est déjà dans la
          barre du haut, un lecteur d'écran ne doit pas l'entendre deux fois. */}
      <div aria-hidden className="overflow-hidden border-t border-line px-5 sm:px-7 lg:px-10">
        <p className="mega w-full py-8 text-center text-[clamp(3.5rem,18vw,17rem)] leading-none text-ink select-none">
          LarpLvl<span className="text-accent">.</span>
        </p>
      </div>

      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-[0.75rem] text-ink-4">
        <p>© {new Date().getFullYear()} LarpLvl</p>
        <p>On enseigne la culture et les codes. Jamais l’usurpation.</p>
      </Container>
    </footer>
  );
}

function Colonne({ titre, liens }: { titre: string; liens: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow">{titre}</p>
      <ul className="mt-5 space-y-2.5">
        {liens.map((l) => (
          <li key={l.href}>
            <Lien href={l.href}>{l.label}</Lien>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Lien({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="souligne text-[0.875rem] text-ink-3 transition-colors duration-[400ms] ease-[var(--ease-fora)] hover:text-ink hover:souligne-on"
    >
      {children}
    </Link>
  );
}
