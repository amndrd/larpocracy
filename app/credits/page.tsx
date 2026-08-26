import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container';
import { domains } from '@/lib/content';
import { CREDITS, HERO, visuelOf } from '@/lib/visuels';

export const metadata: Metadata = {
  title: 'Crédits visuels',
  description:
    'Tous les visuels du site sont sous licence libre. Auteur, licence et source pour chacun.',
};

/** Ordre d'affichage : la bannière d'accueil, puis les domaines dans l'ordre. */
const ENTREES = ['_hero', ...domains.map((d) => d.id)];

export default function CreditsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-[56ch]">
        <p className="eyebrow">Crédits</p>
        <h1 className="display mt-3 text-[clamp(2.25rem,5vw,3.25rem)]">Les visuels</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
          Chaque image du site est sous licence libre, et sa provenance est vérifiable.
          C&apos;est la même exigence que pour le contenu : rien qu&apos;on ne puisse sourcer.
        </p>
      </header>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ENTREES.map((id, i) => {
          const c = CREDITS[id];
          if (!c) return null;
          const visuel = id === '_hero' ? HERO : visuelOf(id);
          const domaine = domains.find((d) => d.id === id);

          return (
            <li
              key={id}
              style={{ animationDelay: `${Math.min(i, 9) * 45}ms` }}
              className="card animate-fade-up overflow-hidden"
            >
              {visuel && (
                <div className="relative aspect-[16/10] bg-canvas-2">
                  <Image
                    src={visuel}
                    alt={c.titre}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <p className="eyebrow">{domaine ? domaine.title : "Bannière d'accueil"}</p>
                <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-ink">{c.titre}</p>
                {c.auteur && <p className="mt-1.5 text-[0.8125rem] text-ink-2">{c.auteur}</p>}
                <p className="mt-3 flex flex-wrap items-center gap-2 text-[0.75rem] text-ink-3">
                  <span className="rounded-full bg-canvas-2 px-2.5 py-1 font-medium">
                    {c.licence}
                  </span>
                  <a href={c.source} className="link hover:link-hover">
                    Source
                  </a>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
