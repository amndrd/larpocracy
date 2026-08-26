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
      // Le contenu est passé sous /app avec la séparation vitrine / application.
      { source: '/domaines', destination: '/app', permanent: true },
      { source: '/d/:chemin*', destination: '/app/d/:chemin*', permanent: true },
      { source: '/f/:chemin*', destination: '/app/f/:chemin*', permanent: true },
      { source: '/compte', destination: '/app/compte', permanent: true },
      { source: '/recherche', destination: '/app/recherche', permanent: true },
    ];
  },
};

export default nextConfig;
