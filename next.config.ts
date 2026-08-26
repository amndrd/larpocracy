import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Un package-lock.json traîne dans le dossier personnel, hors du dépôt :
  // sans cette racine explicite, Turbopack remonte trop haut pour l'inférer.
  turbopack: { root: import.meta.dirname },

  // La navigation est passée en anglais : les anciennes adresses françaises
  // continuent de fonctionner plutôt que de renvoyer un 404.
  async redirects() {
    return [
      { source: '/manifeste', destination: '/about', permanent: true },
      { source: '/tarifs', destination: '/pricing', permanent: true },
    ];
  },
};

export default nextConfig;
