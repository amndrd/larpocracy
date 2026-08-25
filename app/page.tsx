import Link from 'next/link';
import Container from '@/components/Container';
import DomainGrid from '@/components/DomainGrid';
import { domains, stats } from '@/lib/content';

export default function Home() {
  return (
    <>
      {/* ---------- Ouverture ---------- */}
      <section className="border-b border-rule">
        <Container className="grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-8">
            <p className="eyebrow">Culture générale appliquée</p>
            <h1 className="display mt-6 text-[clamp(2.75rem,7vw,5.25rem)]">
              Une porte ne s&apos;ouvre
              <br />
              jamais sur un CV.
              <br />
              <em className="italic text-accent">
                Elle s&apos;ouvre sur une conversation.
              </em>
            </h1>
            <p className="mt-8 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-2">
              Larpocracy enseigne les codes, le vocabulaire et les références des milieux
              du business, du luxe et du pouvoir. Pour avoir quelque chose à dire — de
              juste — à n&apos;importe qui, dans n&apos;importe quelle pièce.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/domaines"
                className="border border-ink bg-ink px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:bg-transparent hover:text-ink"
              >
                Explorer les domaines
              </Link>
              <Link
                href="/manifeste"
                className="border border-rule px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                Le manifeste
              </Link>
            </div>
          </div>

          {/* Colonne de chiffres, alignée en pied de grille */}
          <div className="flex gap-10 self-end md:col-span-4 md:flex-col md:gap-8 md:border-l md:border-rule md:pl-10">
            {[
              { n: stats.domains, l: 'Domaines' },
              { n: stats.topics, l: 'Sujets cartographiés' },
              { n: stats.cards, l: 'Fiches publiées' },
            ].map((s) => (
              <div key={s.l}>
                <div className="display text-[2.5rem] leading-none">{s.n}</div>
                <div className="eyebrow mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Le format signature ---------- */}
      <section className="border-b border-rule">
        <Container className="py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Le principe</p>
              <h2 className="display mt-4 text-[2.25rem]">Dis ça. Pas ça.</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
                Le format signature du site : la même idée, formulée par quelqu&apos;un qui
                sait, et par quelqu&apos;un qui essaie. La différence n&apos;est presque
                jamais le vocabulaire.
              </p>
            </div>

            <div className="grid gap-px bg-rule md:col-span-8 md:grid-cols-2">
              <div className="bg-paper p-7">
                <p className="eyebrow text-yes">Dis ça</p>
                <ul className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  <li>« Vous avez du champagne de vigneron ? »</li>
                  <li>« Je ne connais pas du tout — racontez-moi. »</li>
                  <li>« Vous levez à combien, pre ou post ? »</li>
                </ul>
              </div>
              <div className="bg-paper p-7">
                <p className="eyebrow text-no">Pas ça</p>
                <ul className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  <li>« Prenez du Dom Pérignon, c&apos;est le meilleur champagne. »</li>
                  <li>« Ah oui, bien sûr, j&apos;en ai beaucoup entendu parler. »</li>
                  <li>« Cette bouteille doit valoir dans les 300 €, non ? »</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Les domaines ---------- */}
      <section>
        <Container className="py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Les domaines</p>
              <h2 className="display mt-4 text-[2.25rem]">
                De la cave au conseil d&apos;administration
              </h2>
            </div>
            <Link
              href="/domaines"
              className="link hover:link-hover text-[0.875rem]"
            >
              Voir les {stats.domains} domaines
            </Link>
          </div>
          <DomainGrid list={domains.slice(0, 6)} />
        </Container>
      </section>
    </>
  );
}
