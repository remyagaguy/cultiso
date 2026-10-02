# Plan d'implémentation 2 : Localisation Intelligente (SoilGrids & ZAE Togo)

## 🎯 Objectif
Simplifier l'expérience utilisateur (UX) en supprimant la sélection manuelle complexe du type de sol. Le système déduira le sol et le climat (pluviométrie) automatiquement à partir de la localisation de la ferme.

## 🛠️ Composants Techniques

### 1. Backend & API Externe (SoilGrids)
L'API REST SoilGrids (ISRIC) permet d'interroger la classification mondiale des sols à une résolution de 250m.
- **Endpoint ciblé :** https://rest.isric.org/soilgrids/v2.0/classification/query?lon={longitude}&lat={latitude}&number_classes=1
- **Fiabilité :** Très élevée pour une planification macro (Agrobusiness plan). Donne la taxonomie WRB (ex: Lixisols, Ferralsols) qui sera traduite en propriétés agronomiques (Capacité au champ, etc.).

### 2. Base de Données Supabase (Zones Agro-écologiques - ZAE)
Création d'une table de référence pour le Togo servant de filet de sécurité (fallback) et fournissant les données climatiques.
- Table cultiplan_zae_togo :
  - zone_id (I à V)
  - 
om_region (Savanes, Kara, Centrale, Plateaux, Maritime)
  - ainfall_min, ainfall_max (mm/an)
  - default_soil_id (Clé étrangère vers cultiplan_soils)

### 3. Geocoding (Localisation vers GPS)
Au lieu de stocker tous les villages du monde dans Supabase (ce qui est lourd et coûteux), nous utiliserons l'API **OpenStreetMap (Nominatim)** (Gratuit) ou **Google Maps Places API** pour autocompléter la saisie de l'utilisateur et récupérer les coordonnées GPS (Latitude / Longitude).

### 4. Interface Utilisateur (ProjectStep.tsx)
- Remplacement du <SelectInput label="Type de sol"> par un champ de recherche intelligent : <LocationAutocomplete label="Où se situe votre exploitation ?">.
- Lorsqu'une localité (ex: "Kpalimé, Togo") est sélectionnée :
  1. On extrait les coordonnées GPS.
  2. On interroge notre nouvelle route API Next.js /api/soil-data?lat=X&lon=Y.
  3. L'API contacte SoilGrids en temps réel et croise avec les ZAE du Togo.
  4. L'état global (SimulatorContext) est mis à jour avec le type de sol et la pluviométrie exacts.
  5. Un petit composant visuel confirme à l'utilisateur : *"✅ Sol détecté : Argileux (Ferralsols) | Climat : Zone IV"*.

## ⚠️ Actions requises
1. Création de la migration SQL pour les ZAE du Togo.
2. Implémentation de l'appel API SoilGrids.
3. Création du composant d'autocomplétion géographique.
