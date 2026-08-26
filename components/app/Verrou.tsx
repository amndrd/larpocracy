import { ButtonLink } from '@/components/Button';
import { IconCadenas, IconCartes, IconLire, IconTest } from '@/components/icons';

/**
 * L'écran de déblocage d'une fiche fermée.
 *
 * Il annonce ce que la fiche contient — sections, cartes, questions — sans
 * jamais en livrer le texte : le contenu verrouillé ne part pas dans le HTML,
 * c'est pour cela que les pages de l'application sont rendues à la demande.
 */
export default function Verrou({
  sections,
  cartes,
  questions,
}: {
  sections: number;
  cartes: number;
  questions: number;
}) {
  const dedans = [
    { icone: <IconLire className="size-4" />, n: sections, mot: sections > 1 ? 'sections' : 'section' },
    { icone: <IconCartes className="size-4" />, n: cartes, mot: 'cartes à réviser' },
    { icone: <IconTest className="size-4" />, n: questions, mot: questions > 1 ? 'questions' : 'question' },
  ].filter((d) => d.n > 0);

  return (
    <div className="card mt-6 overflow-hidden">
      <div className="border-b border-line-soft px-6 py-8 text-center sm:px-10 sm:py-10">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-gold-2 text-gold">
          <IconCadenas className="size-5" />
        </span>
        <h2 className="headline mt-6 text-[clamp(1.5rem,3.5vw,2rem)]">
          Cette fiche demande la formule Pro.
        </h2>
        <p className="mx-auto mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-3">
          Une partie du contenu reste ouverte à tous, et le restera. Le reste est réservé aux
          comptes Pro — c&apos;est ce qui finance l&apos;écriture du suivant.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/pricing" taille="lg">
            Débloquer tout le contenu
          </ButtonLink>
          <ButtonLink href="/app" taille="lg" variante="secondaire">
            Retour au tableau de bord
          </ButtonLink>
        </div>
      </div>

      {dedans.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-6 py-5">
          {dedans.map((d) => (
            <span key={d.mot} className="flex items-center gap-2 text-[0.8125rem] text-ink-3">
              {d.icone}
              <span className="tabular-nums text-ink-2">{d.n}</span> {d.mot}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
