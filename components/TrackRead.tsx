'use client';

import { useEffect, useRef } from 'react';

/**
 * Signale la lecture d'une fiche une seule fois par montage.
 * Silencieux : si personne n'est connecté, l'action serveur ne fait rien.
 */
export default function TrackRead({
  domainId,
  cardId,
  onRead,
}: {
  domainId: string;
  cardId: string;
  onRead: (domainId: string, cardId: string) => Promise<void>;
}) {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    void onRead(domainId, cardId).catch(() => {
      /* la progression n'est pas critique : un échec ne doit rien casser */
    });
  }, [domainId, cardId, onRead]);

  return null;
}
