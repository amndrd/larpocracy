import { IconCartes, IconEclair, IconLire, IconTest } from './icons';

/**
 * L'aperçu produit qui flotte sous la bannière.
 *
 * Le modèle y met une capture d'écran ; on dessine ici l'interface réelle en
 * HTML plutôt qu'une image : rien à re-exporter quand le design bouge, et la
 * bannière reste nette à toutes les résolutions.
 */
export default function HeroPreview() {
  return (
    <div className="panel mx-auto w-full max-w-[58rem] overflow-hidden p-1.5">
      <div className="flex overflow-hidden rounded-[calc(var(--radius-md)-0.25rem)] bg-[#0d0d0d]">
        {/* Colonne latérale */}
        <aside className="hidden w-48 shrink-0 border-r border-line-soft p-4 sm:block">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/10" />
          </div>
          <ul className="mt-6 space-y-1">
            {[
              { i: <IconLire className="size-4" />, l: 'Lire', actif: false },
              { i: <IconCartes className="size-4" />, l: 'Cartes', actif: true },
              { i: <IconTest className="size-4" />, l: 'Test', actif: false },
            ].map((m) => (
              <li
                key={m.l}
                className={
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.8125rem] ' +
                  (m.actif ? 'bg-white/[0.07] text-ink' : 'text-ink-3')
                }
              >
                {m.i}
                {m.l}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl bg-white/[0.04] p-3">
            <p className="flex items-center gap-1.5 text-[0.6875rem] text-ink-3">
              <IconEclair className="size-3" />
              1 230 pts
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-ink/70" />
            </div>
            <p className="mt-2 text-[0.6875rem] text-ink-4">Initié · 270 avant Connaisseur</p>
          </div>
        </aside>

        {/* La carte à retourner */}
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
          <div className="flex items-center justify-between text-[0.75rem] text-ink-3">
            <span className="tabular-nums">4 / 13</span>
            <span>Mélanger</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[30%] rounded-full bg-ink/70" />
          </div>

          <div className="mt-5 flex flex-1 flex-col items-center justify-center rounded-xl bg-white/[0.035] px-6 py-10 ring-1 ring-white/[0.06] ring-inset">
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ink-4">
              Nom propre
            </span>
            <span className="display mt-4 text-[clamp(1.5rem,4vw,2.25rem)]">Krug</span>
            <span className="mt-4 rounded-full bg-white/[0.07] px-3.5 py-1.5 font-mono text-[0.75rem] text-ink-2">
              se prononce « krougue »
            </span>
          </div>

          <div className="mt-4 flex justify-center gap-2.5">
            <span className="rounded-full bg-no-2 px-4 py-2 text-[0.75rem] font-medium text-no">
              À revoir
            </span>
            <span className="rounded-full bg-yes-2 px-4 py-2 text-[0.75rem] font-medium text-yes">
              Je savais
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
