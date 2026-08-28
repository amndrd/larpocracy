import localFont from 'next/font/local';

/**
 * Les deux polices du dessin, embarquées avec le site.
 *
 * `next/font/local` les précharge et fige leurs métriques : le texte ne
 * saute pas au chargement. Chacune expose une variable CSS — c'est par elle
 * que la feuille de style les nomme, jamais par leur nom de famille réel,
 * qui est engendré au build.
 */

/** Le corps de texte : la grotesque neutre de la page. */
export const pp = localFont({
  src: './fonts/pp-neue-montreal-400.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-pp',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

/** La grasse des étiquettes, des boutons et du mot-logo. */
export const youth = localFont({
  src: [
    { path: './fonts/youth-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/youth-900.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-youth',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});
