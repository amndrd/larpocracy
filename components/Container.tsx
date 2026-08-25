import { clsx } from '@/lib/clsx';

/** Gouttière commune à toutes les pages. `narrow` pour le corps d'article. */
export default function Container({
  children,
  narrow = false,
  className,
}: {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-6 md:px-10',
        narrow ? 'max-w-[46rem]' : 'max-w-[74rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}
