import Link from 'next/link';
import { IconCartes, IconLire, IconTest } from './icons';

type Mode = {
  href: string;
  label: string;
  detail: string;
  icon: React.ReactNode;
  actif?: boolean;
};

/**
 * Le sélecteur de mode d'une fiche : lire, réviser, se tester.
 * C'est la promesse du site rendue visible dès le haut de page.
 */
export default function StudyModes({
  domainId,
  cardId,
  sections,
  cartes,
  questions,
  actif = 'lire',
}: {
  domainId: string;
  cardId: string;
  sections: number;
  cartes: number;
  questions: number;
  actif?: 'lire' | 'cartes' | 'test';
}) {
  const base = `/f/${domainId}/${cardId}`;
  const modes: Mode[] = [
    {
      href: actif === 'lire' ? '#lecture' : base,
      label: 'Lire',
      detail: `${sections} section${sections > 1 ? 's' : ''}`,
      icon: <IconLire className="size-5" />,
      actif: actif === 'lire',
    },
  ];
  if (cartes > 0)
    modes.push({
      href: `${base}/cartes`,
      label: 'Cartes',
      detail: `${cartes} à réviser`,
      icon: <IconCartes className="size-5" />,
      actif: actif === 'cartes',
    });
  if (questions > 0)
    modes.push({
      href: actif === 'lire' ? '#test' : `${base}#test`,
      label: 'Test',
      detail: `${questions} question${questions > 1 ? 's' : ''}`,
      icon: <IconTest className="size-5" />,
      actif: actif === 'test',
    });

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {modes.map((m) => (
        <Link
          key={m.label}
          href={m.href}
          aria-current={m.actif ? 'page' : undefined}
          className={
            'card card-lift group flex items-center gap-3.5 p-4 hover:card-lift-on ' +
            (m.actif ? 'border-[var(--dom)]/45 bg-[var(--dom-tint)]' : '')
          }
        >
          <span
            className={
              'grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ' +
              (m.actif
                ? 'bg-[var(--dom)] text-white'
                : 'bg-canvas-2 text-ink-2 group-hover:bg-[var(--dom)] group-hover:text-white')
            }
          >
            {m.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-[0.9375rem] font-semibold text-ink">{m.label}</span>
            <span className="block text-[0.75rem] text-ink-3">{m.detail}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
