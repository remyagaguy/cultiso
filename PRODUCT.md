# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), React, TailwindCSS, Ant Design, Supabase

## Users

Agriculteurs, entrepreneurs agricoles, et investisseurs en Afrique cherchant Ã  planifier et optimiser la rentabilitÃ© de leurs exploitations. Utilisateurs invitÃ©s (Product-Led Growth) pouvant tester les simulateurs avant de s'inscrire pour des analyses dÃ©taillÃ©es.

## Product Purpose

CULTISO est une Progressive Web App (PWA) d'Intelligence Agrobusiness conÃ§ue pour la conquÃªte de la souverainetÃ© alimentaire africaine. Elle dÃ©bute par un MVP centrÃ© sur le module **Cultiplan** (business plan agricole). L'objectif est de fournir un accÃ¨s rapide, fiable et hors-ligne lÃ©ger Ã  des donnÃ©es cruciales et des outils de planification financiÃ¨re.

## Positioning

La seule plateforme d'agrobusiness africaine "Mobile-First" et "Offline-first lÃ©gÃ¨re" qui permet de concevoir un business plan agricole (Cultiplan) sans friction initiale, en dÃ©montrant sa valeur avant mÃªme de demander une inscription.

## Operating Context

- Connexion internet parfois instable (d'oÃ¹ le besoin de PWA et LocalStorage pour les brouillons).
- Navigation principalement sur tÃ©lÃ©phone mobile.
- Parcours pas-Ã -pas (Tunnel/Wizard) pour rÃ©duire la charge cognitive.

## Capabilities and Constraints

- **Architecture:** Monolithe Modulaire (isoler Cultiplan des futurs modules).
- **Mode InvitÃ©:** FonctionnalitÃ© cruciale. L'Ã©tat est stockÃ© dans le LocalStorage, migration vers Supabase lors de la crÃ©ation du compte.
- **SÃ©curitÃ©:** Row Level Security (RLS) strict via Supabase.
- **Navigation:** Mega Menus spÃ©cifiques pour "Produits" et "Solutions".

## Brand Commitments

- **Couleurs de marque:** Vert forÃªt (`#0B5345`), Orange LatÃ©rite (`#D35400`).
- **Typographie:** *Plus Jakarta Sans*.
- **UI Library:** Ant Design, fortement personnalisÃ©e via Tailwind ou ses propres tokens.

## Evidence on Hand

- IntÃ©gration en temps rÃ©el des prix des marchÃ©s agricoles (via scraping Agridigitale et base de donnÃ©es Supabase).
- Interface "Cours des prix" existante avec graphiques comparatifs gÃ©ographiques et temporels.

## Product Principles

1. **Mobile-First Radical:** L'interface est pensÃ©e pour un Ã©cran de tÃ©lÃ©phone avant tout.
2. **Product-Led Growth:** Apporter de la valeur (simulateur) avant de capturer la valeur (inscription).
3. **ClartÃ© sur la ComplexitÃ©:** Cacher les calculs de rentabilitÃ© complexes derriÃ¨re une interface simple et Ã©tape-par-Ã©tape.

