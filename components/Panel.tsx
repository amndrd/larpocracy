/** Encart titré : lexique, prononciation, Dis ça / Pas ça, vérification. */
export default function Panel({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`my-12 border border-rule ${className ?? ''}`}>
      <h2 className="eyebrow border-b border-rule bg-paper-2 px-5 py-2.5">{label}</h2>
      <div className="p-6">{children}</div>
    </section>
  );
}
