import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Un package-lock.json traîne dans le dossier personnel, hors du dépôt :
  // sans cette racine explicite, Turbopack remonte trop haut pour l'inférer.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
