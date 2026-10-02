# Plan d'implémentation 3 : Architecture de l'Intelligence Métier (SWOT, Budget & RAG)

## 🎯 Objectif
Transformer CULTISO d'un simple calculateur en un véritable **Expert Agrobusiness** capable de générer des études de marché poussées (recherche web), des budgets dynamiques détaillés, et de s'appuyer sur une base de données structurée issue des connaissances agronomiques.

## 🛠️ Composants Techniques & Stratégiques

### 1. Le Pipeline d'Étude de Marché (PESTEL ➔ Porter ➔ SWOT)
L'IA ne doit plus deviner. Elle doit chercher et analyser.
- **Étape 1 : Web Search API.** Lorsqu'un utilisateur saisit son projet (ex: "Élevage de poulets locaux au Togo"), le backend déclenche une recherche web en temps réel (via l'outil intégré de l'IA ou une API comme Tavily/SerpApi) pour capter les tendances actuelles.
- **Étape 2 : Analyse intermédiaire (LLM).** L'IA traite les résultats du web pour générer :
  - L'analyse **PESTEL** (Politique, Économique, Social, Tech, Environnement, Légal).
  - Les **5 Forces de Porter** (Intensité concurrentielle, Nouveaux entrants, Substituts, Fournisseurs, Clients).
- **Étape 3 : Synthèse SWOT (Croisement des données).** L'IA croise le PESTEL/Porter avec les données de notre base de données (ex: coûts des intrants, contraintes de la zone agroécologique) pour générer une Matrice SWOT précise et non-hallucinée.

### 2. Le Moteur de Budget Dynamique Détaillé
Fini le budget figé du type "Équipements = 100 000". 
- **Structure de données :** Le budget sera une liste dynamique d'objets ([{ item: "Tracteur", qte: 1, pu: 15000000 }, { item: "Machettes", qte: 10, pu: 2000 }]).
- **Génération par l'IA :** En fonction de la superficie (ex: 50 hectares), de la culture (ex: Maïs) et de la Zone, l'IA générera une **liste de courses exhaustive** pré-remplie.
- **UX :** L'utilisateur pourra modifier les quantités, supprimer ou ajouter des lignes. Le total s'ajustera automatiquement.

### 3. Restructuration du RAG (Extraction vers SQL)
Les documents bruts (RAG) contiennent l'expertise, mais le moteur a besoin de variables calculables.
- **Le processus :** Nous allons créer un script d'Intelligence Artificielle de traitement de masse (Data Pipeline).
- Ce script lira les documents du RAG (guides d'élevage, manuels de transformation).
- Il **extraira** les paramètres clés (ex: Indice de Consommation pour la volaille, rendement d'extraction pour le beurre de karité, normes phytosanitaires).
- Il **insérera** ces paramètres dans nos tables SQL (Supabase) pour qu'ils soient utilisés mathématiquement par notre simulateur.

## ⚠️ Actions requises
1. **Extraction RAG ➔ SQL :** Créer le script Python utilisant l'API IA pour lire les textes de la base de connaissances actuelle et les structurer en JSON/SQL.
2. **Refonte des UI de Budget :** Remplacer les champs simples (Capex/Opex) par des tableaux dynamiques éditables.
3. **Création de la route API Market :** Coder l'orchestrateur (Web Search ➔ PESTEL ➔ Porter ➔ SWOT) dans le backend Next.js.
