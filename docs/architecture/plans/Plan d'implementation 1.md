# Intégration du Moteur Agronomique (AquaCrop) dans Cultiplan

L'objectif de cette implémentation est de remplacer la saisie manuelle du rendement par un calcul prévisionnel basé sur les paramètres agronomiques extraits d'AquaCrop (Base de données Supabase cultiplan_crops et cultiplan_soils).

## User Review Required
> [!IMPORTANT]
> **Changement du Parcours Utilisateur (UX)** : L'utilisateur ne saisira plus son rendement manuellement. L'application le calculera. Cela change fondamentalement la façon dont le simulateur fonctionne. Merci de valider ces étapes.

## Proposed Changes

### 1. Types & État Global
#### [MODIFY] src/lib/simulator/types.ts
- Ajouter les sélections cropId (culture) et soilId (sol) dans l'interface ProjectInfo.
- Créer un nouveau type AgronomicParameters pour stocker les facteurs (température, cycle, HIo) dans l'état, de sorte que l'application puisse les utiliser même hors ligne après les avoir récupérés.

### 2. Le Moteur de Calcul
#### [NEW] src/lib/simulator/agronomicEngine.ts
- Créer un script qui contient la formule simplifiée : 
  Rendement = Productivité de l'eau * (Jours de cycle / 10) * Facteur de sol * Surface
- Ce moteur prendra en entrée la culture, le sol et la surface pour sortir un rendement en tonnes.

#### [MODIFY] src/lib/simulator/logic.ts
- Intégrer le résultat du moteur agronomique au calcul des revenus (calculateRevenue), au lieu de lire bêtement la saisie de l'utilisateur.

### 3. Interface Utilisateur (Le Tunnel / Wizard)
#### [MODIFY] src/components/simulator/steps/ProjectStep.tsx
- Remplacer le simple champ "Type de culture" par deux listes déroulantes (Select) :
  1. **Sélection de la Culture** (Maïs, Manioc, etc. récupérés depuis Supabase).
  2. **Type de Sol** (Argileux, Sableux, etc. récupérés depuis Supabase).

#### [MODIFY] src/components/simulator/steps/SalesStep.tsx
- Rendre le champ "Rendement espéré" **en lecture seule (disabled)** ou le transformer en un simple affichage dynamique.
- Ajouter une mention type : *"?? Rendement prévisionnel calculé par le moteur agronomique Cultiso selon votre sol et votre culture"*.

### 4. Récupération des Données (Supabase)
#### [NEW] src/lib/simulator/api.ts (ou équivalent)
- Ajouter des fonctions etchCrops() et etchSoils() qui font un SELECT sur Supabase grâce à la policy RLS (anonyme) que nous avons configurée, afin d'alimenter les menus déroulants du ProjectStep.

## Verification Plan
1. Lancer le serveur de développement.
2. Naviguer dans le simulateur en tant qu'invité.
3. Vérifier que les menus déroulants affichent bien le Maïs, le Manioc, etc.
4. Vérifier qu'en choisissant Maïs + Argile + 10 hectares, le rendement se calcule tout seul à l'étape "Ventes".
