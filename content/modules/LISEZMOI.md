# Les modules de contenu

Un fichier par domaine : `content/modules/<id-du-domaine>.json`.

```json
{
  "domain": "cave-table",
  "cards": [ { "id": "…", "title": "…", "level": 1, "summary": "…", "sections": [] } ]
}
```

Le schéma complet d'une fiche est dans `docs/CONTENT-GUIDE.md`.

**Après avoir créé le fichier**, il faut l'importer dans `lib/content.ts` et
l'ajouter au tableau `moduleFiles`. L'import est statique volontairement :
c'est ce qui garantit que le contenu est embarqué dans le build sur Vercel.
