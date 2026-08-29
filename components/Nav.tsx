'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import VoletNav from './VoletNav';
import { VOLETS } from './volets';
import {
  IconeAbout,
  IconeContact,
  IconeContenu,
  IconeFeatures,
  IconeNews,
  IconePricing,
} from './icons';

/**
 * Les six entrées de la barre. L'ordre est celui de la navigation du site :
 * le contenu d'abord, la prise de contact en dernier.
 *
 * Content et Pricing sont croisés : chacun porte le pictogramme que la
 * maquette donnait à l'autre. Les noms `IconeContenu` et `IconePricing`
 * disent d'où vient le tracé, plus à quoi il sert.
 */
const ENTREES = [
  { href: '/contenu', label: 'Content', Icone: IconePricing },
  { href: '/about', label: 'About', Icone: IconeAbout },
  { href: '/features', label: 'Features', Icone: IconeFeatures },
  { href: '/pricing', label: 'Pricing', Icone: IconeContenu },
  { href: '/news', label: 'News', Icone: IconeNews },
  { href: '/contact', label: 'Contact us', Icone: IconeContact },
] as const;

/** Les entrées qui ouvrent un volet, dans l'ordre de la barre. */
const AVEC_VOLET = ENTREES.filter(({ href }) => VOLETS[href]);

/**
 * La barre de navigation.
 *
 * Chaque entrée est une pastille carrée qui ne montre qu'un pictogramme.
 * L'étiquette est toujours dans le balisage — elle est seulement transparente
 * au repos, jamais retirée : c'est ce qui la rend lisible aux lecteurs
 * d'écran et aux moteurs de recherche.
 *
 * Deux d'entre elles déploient en plus un volet, à droite. Il tient le second
 * état du site, et il reste ici : le CSS n'a besoin de rien savoir en dehors
 * du volet lui-même, contrairement au menu mobile.
 *
 * La sortie est différée d'un dixième de seconde. Sans ce délai, traverser le
 * vide entre la barre et le volet refermerait ce qu'on allait atteindre.
 *
 * Le volet ne s'ouvre qu'à la souris. Ses liens viennent après les six
 * pastilles dans le balisage : les ouvrir au clavier donnerait un ordre de
 * tabulation qui ne mène nulle part, et la pastille reste de toute façon un
 * lien vers la page entière.
 *
 * Les enveloppes sont des `div`, comme dans la maquette : leurs largeurs en
 * pourcentage supposent des blocs. Elles tenaient ici par accident, parce que
 * la mise en page les blocifiait ; mieux vaut ne pas en dépendre.
 */
export default function Nav() {
  const [volet, setVolet] = useState<string | null>(null);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  const annuler = useCallback(() => {
    if (minuteur.current) clearTimeout(minuteur.current);
    minuteur.current = null;
  }, []);

  const ouvrir = useCallback(
    (href: string) => {
      annuler();
      setVolet(VOLETS[href] ? href : null);
    },
    [annuler],
  );

  const fermerBientot = useCallback(() => {
    annuler();
    minuteur.current = setTimeout(() => setVolet(null), 100);
  }, [annuler]);

  useEffect(() => annuler, [annuler]);

  // Échap referme, comme le menu mobile.
  useEffect(() => {
    if (!volet) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVolet(null);
    };
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [volet]);

  return (
    <>
      <nav className="nav" onMouseLeave={fermerBientot}>
        {ENTREES.map(({ href, label, Icone }) => (
          <Link
            key={href}
            className={`nav_link w-inline-block${VOLETS[href] ? ' --volet' : ''}`}
            href={href}
            onMouseEnter={() => ouvrir(href)}
          >
            <div className="nav_link_btn_inner">
              <div className="nav_link_icon">
                <Icone />
              </div>
              <div className="nav_link_tag">
                <div className="nav_link_tag_title text-youth">{label}</div>
              </div>
              <div className="nav_link_dot" />
            </div>
          </Link>
        ))}
      </nav>

      {AVEC_VOLET.map(({ href, label }) => (
        <VoletNav
          key={href}
          titre={label}
          href={href}
          cases={VOLETS[href]}
          ouvert={volet === href}
          surEntree={annuler}
          surSortie={fermerBientot}
        />
      ))}
    </>
  );
}
