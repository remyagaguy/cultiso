# Projet : CULTISO (MVP - Module Cultiplan)

**Mission :** Progressive Web App (PWA) d'Intelligence Agrobusiness pour la conquête de la souveraineté alimentaire africaine.
**Mode de fonctionnement :** L'application est centrée sur le module Cultiplan (business plan agricole).

## 1. La Pile Technique (Stack)
*   **Frontend & Framework :** Next.js avec TypeScript strict.
*   **UI / Design :** Librairie Ant Design (Couleurs de marque : Vert `#0B5345`, Orange Latérite `#D35400`, Polices : *Unbounded* pour les titres & *Manrope* pour le corps).
*   **Backend, BDD & Auth :** Supabase (PostgreSQL & Supabase Auth).
*   **Communication API :** REST.
*   **Hébergement & Déploiement :** Vercel.
*   **Infrastructure as Code (IaC) :** Terraform.

## 2. Règles strictes de développement (Contrat Agent)

✅ **TU DOIS (MUST) :**
*   **Architecture Applicative :** Suivre une architecture "Monolithe Modulaire". Isoler le code du module `Cultiplan` pour permettre l'ajout futur des modules `Cultishop`, `Cultisia`, etc.
*   **Approche Mobile-First :** L'interface DOIT être 100% responsive en utilisant le système de grille d'Ant Design.
*   **Mode "PWA - Hors-ligne léger" :** L'UI doit charger rapidement (cache), mais la connexion internet est requise pour les actions de sauvegarde.
*   **Mode Invité (Product-Led Growth) :** L'utilisateur doit pouvoir utiliser le simulateur (Tunnel) sans s'inscrire. Les données sont sauvegardées dans le `LocalStorage`. L'inscription n'est exigée qu'à la fin pour voir les résultats et exporter le PDF (migration du LocalStorage vers Supabase à la création du compte).
*   **Sécurité :** Garantir un Mode Privé strict en V1 (Row Level Security sur Supabase). Les rôles avancés (Cultiseil) sont repoussés à la V2.
*   **Navigation Globale :** Implémenter la navigation avec des Mega Menus pour "Produits" et "Solutions" (structure spécifique : 2 colonnes de texte + 1 Cadre visuel d'appel à l'action sur la droite), et un lien simple "Blog".

🟡 **TU DEVRAIS (SHOULD) :**
*   Utiliser le SDK officiel `@supabase/supabase-js` pour communiquer avec la base de données.
*   Séparer strictement la logique complexe des calculs financiers (rentabilité) de l'interface visuelle.
*   Créer le parcours de création de projet Cultiplan sous forme de **Tunnel pas-à-pas (Wizard)**.
*   Écrire des tests automatisés en parallèle du code.

❌ **TU NE DOIS SOUS AUCUN PRÉTEXTE (MUST NOT) :**
*   Stocker des "secrets" (Clés API, mots de passe) en clair dans le code. Utiliser systématiquement les variables d'environnement.
*   Créer des pages "Tarifs", "Ressources" ou "Témoignages" (Non requis pour ce MVP).
*   Modifier l'architecture validée sans demander l'autorisation expresse de l'utilisateur.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
