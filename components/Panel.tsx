import { clsx } from '@/lib/clsx';

/** Encart titré : lexique, prononciation, Dis ça / Pas ça, vérification. */
export default function Panel({
  label,
  id,
  children,
  className,
  bodyClassName,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section id={id} className={clsx('card my-8 overflow-hidden scroll-mt-24', className)}>
      <h2 className="eyebrow border-b border-line-soft bg-canvas-2 px-5 py-3">{label}</h2>
      <div className={clsx('p-5 sm:p-6', bodyClassName)}>{children}</div>
    </section>
  );
}
