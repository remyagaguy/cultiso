# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), React, TailwindCSS, Ant Design, Supabase

## Users

Agriculteurs, entrepreneurs agricoles, et investisseurs en Afrique cherchant à planifier et optimiser la rentabilité de leurs exploitations. Utilisateurs invités (Product-Led Growth) pouvant tester les simulateurs avant de s'inscrire pour des analyses détaillées.

## Product Purpose

CULTISO est une Progressive Web App (PWA) d'Intelligence Agrobusiness conçue pour la conquête de la souveraineté alimentaire africaine. Elle débute par un MVP centré sur le module **Cultiplan** (business plan agricole). L'objectif est de fournir un accès rapide, fiable et hors-ligne léger à des données cruciales et des outils de planification financière.

## Positioning

La seule plateforme d'agrobusiness africaine "Mobile-First" et "Offline-first légère" qui permet de concevoir un business plan agricole (Cultiplan) sans friction initiale, en démontrant sa valeur avant même de demander une inscription.

## Operating Context

- Connexion internet parfois instable (d'où le besoin de PWA et LocalStorage pour les brouillons).
- Navigation principalement sur téléphone mobile.
- Parcours pas-à-pas (Tunnel/Wizard) pour réduire la charge cognitive.

## Capabilities and Constraints

- **Architecture:** Monolithe Modulaire (isoler Cultiplan des futurs modules).
- **Mode Invité:** Fonctionnalité cruciale. L'état est stocké dans le LocalStorage, migration vers Supabase lors de la création du compte.
- **Sécurité:** Row Level Security (RLS) strict via Supabase.
- **Navigation:** Mega Menus spécifiques pour "Produits" et "Solutions".

## Brand Commitments

- **Couleurs de marque:** Vert forêt (`#0B5345`), Orange Latérite (`#D35400`).
- **Typographie:** *Unbounded* (titres), *Manrope* (corps de texte).
- **UI Library:** Ant Design, fortement personnalisée via Tailwind ou ses propres tokens.

## Evidence on Hand

- Intégration en temps réel des prix des marchés agricoles (via scraping Agridigitale et base de données Supabase).
- Interface "Cours des prix" existante avec graphiques comparatifs géographiques et temporels.

## Product Principles

1. **Mobile-First Radical:** L'interface est pensée pour un écran de téléphone avant tout.
2. **Product-Led Growth:** Apporter de la valeur (simulateur) avant de capturer la valeur (inscription).
3. **Clarté sur la Complexité:** Cacher les calculs de rentabilité complexes derrière une interface simple et étape-par-étape.
