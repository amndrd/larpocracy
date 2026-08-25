import { Fragment, type ReactNode } from 'react';

/**
 * Rendu du balisage léger utilisé dans le contenu : **gras** et *italique*.
 * Produit des éléments React — jamais de HTML injecté, donc le contenu ne peut
 * pas introduire de balise arbitraire.
 */
export function rich(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] !== undefined) parts.push(<strong key={k++}>{m[1]}</strong>);
    else parts.push(<em key={k++}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return parts;
}

/** Un bloc de texte dont les paragraphes sont séparés par une ligne vide. */
export function Paragraphs({ body }: { body: string }) {
  return (
    <>
      {body.split('\n\n').map((par, i) => (
        <p key={i}>{rich(par)}</p>
      ))}
    </>
  );
}
