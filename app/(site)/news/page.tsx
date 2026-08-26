import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { formatDate, news } from '@/lib/news';

export const metadata: Metadata = {
  title: 'News',
  description: 'Ce qui change sur LarpLvl : contenu publié, modes ajoutés, décisions prises.',
};

export default function NewsPage() {
  return (
    <>
      <Container className="pt-32 pb-14 text-center sm:pt-40">
        <Reveal>
          <span className="chip">News</span>
          <h1 className="headline mx-auto mt-7 max-w-[18ch] text-[clamp(2.5rem,6vw,4.25rem)]">
            Ce qui change, <span className="headline-dim">et pourquoi.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-3">
            Contenu publié, modes ajoutés, décisions prises. Le journal de bord d&apos;un site
            qui se construit à découvert.
          </p>
        </Reveal>
      </Container>

      <Container className="pb-24">
        {news.length === 0 ? (
          <Reveal delay={80}>
            <div className="card px-8 py-20 text-center">
              <p className="display text-[1.75rem]">Rien à annoncer pour l&apos;instant.</p>
              <p className="mx-auto mt-4 max-w-[50ch] text-[0.9375rem] leading-relaxed text-ink-3">
                La première entrée arrivera avec la première fiche publiée. En attendant, le
                manifeste dit ce que ce site fera, exactement.
              </p>
              <ButtonLink href="/about" variante="secondaire" className="mt-8">
                Lire le manifeste
              </ButtonLink>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.id} delay={Math.min(i, 6) * 90}>
                <article className="card card-lift flex h-full flex-col overflow-hidden hover:card-lift-on">
                  {n.image && (
                    <div className="relative aspect-[16/10] bg-canvas-2">
                      <Image
                        src={n.image.startsWith('/') ? n.image : `/images/${n.image}`}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-[0.75rem] text-ink-3">
                      {n.tag && <span className="chip !py-1 !text-[0.6875rem]">{n.tag}</span>}
                      <time dateTime={n.date}>{formatDate(n.date)}</time>
                    </p>
                    <h2 className="display mt-4 text-[1.25rem]">{n.title}</h2>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-3">
                      {n.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
