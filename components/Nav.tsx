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
 */
const ENTREES = [
  { href: '/contenu', label: 'Contenu', Icone: IconeContenu },
  { href: '/about', label: 'About', Icone: IconeAbout },
  { href: '/features', label: 'Features', Icone: IconeFeatures },
  { href: '/pricing', label: 'Pricing', Icone: IconePricing },
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
 */
export default function Nav() {
  return (
    <nav className="nav">
      {ENTREES.map(({ href, label, Icone }) => (
        <Link key={href} className="nav_link w-inline-block" href={href}>
          <span className="nav_link_btn_inner">
            <span className="nav_link_icon">
              <Icone />
            </span>
            <span className="nav_link_tag">
              <span className="nav_link_tag_title text-youth">{label}</span>
            </span>
            <span className="nav_link_dot" />
          </span>
        </Link>
      ))}
    </nav>
  );
}
