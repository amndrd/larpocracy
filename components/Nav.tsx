import Link from 'next/link';
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

/**
 * La barre de navigation.
 *
 * Chaque entrée est une pastille carrée qui ne montre qu'un pictogramme.
 * L'étiquette est toujours dans le balisage — elle est seulement transparente
 * au repos, jamais retirée : c'est ce qui la rend lisible aux lecteurs
 * d'écran et aux moteurs de recherche.
 *
 * Les enveloppes sont des `div`, comme dans la maquette : leurs largeurs en
 * pourcentage supposent des blocs. Elles tenaient ici par accident, parce que
 * la mise en page les blocifiait ; mieux vaut ne pas en dépendre.
 */
export default function Nav() {
  return (
    <nav className="nav">
      {ENTREES.map(({ href, label, Icone }) => (
        <Link key={href} className="nav_link w-inline-block" href={href}>
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
  );
}
