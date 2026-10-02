# Historique des discussions et décisions (Session Vibe Coding)

## 26 Septembre 2026 - Moteur Agronomique (AquaCrop)

**Utilisateur :** Constate que le système actuel de Cultiplan (sans modèle de prédiction de rendement) est factice et demande une analyse pour intégrer une véritable modélisation agronomique.
**IA :** Analyse le code (logic.ts), confirme que le système actuel demande le rendement manuellement (ce qui est dangereux pour un Business Plan), et propose une stratégie en 3 temps (MVP paramétrique, base de données Supabase, algorithme de prédiction heuristique).
**Utilisateur :** Indique avoir téléchargé le logiciel AquaCrop de la FAO et l'avoir extrait dans Cloud/LOGICIEL/. Demande si ça peut aider.
**IA :** Valide fortement l'idée. Propose l'Option "MVP Rapide" : écrire un script pour extraire directement l'intelligence d'AquaCrop (fichiers .CRO et .SOL) afin d'alimenter la base de données sans faire tourner le lourd moteur Windows dans l'app web.
**Utilisateur :** Approuve l'Option MVP Rapide et note la différence avec la base de données RAG (non structurée) créée précédemment. Demande comment bien structurer celle-ci.
**IA :** Explique la différence (RAG vs SQL relationnel), teste le script d'extraction Python sur le Maïs, et présente le plan (créer des tables cultiplan_crops et cultiplan_soils dans Supabase).
**Utilisateur :** Valide le plan ("C'est bon").
**IA :** Exécute le script complet sur 29 cultures et 14 sols d'AquaCrop, génère les fichiers JSON et génère le fichier de migration SQL (20260926_aquacrop_data.sql).
**Utilisateur :** Demande si toutes les données ont bien été extraites (pas seulement le maïs et le manioc) et génère le fichier complet. Ensuite, l'utilisateur exécute le SQL dans Supabase et rencontre un message d'alerte sur la sécurité RLS.
**IA :** Confirme que 29 cultures et 14 sols ont été extraits. Indique à l'utilisateur de cliquer sur "Run and enable RLS" (mode privé strict) mais lui fournit les requêtes SQL pour autoriser la lecture (SELECT) des données agronomiques à l'application.
**Utilisateur :** Confirme avoir exécuté les codes SQL et demande de passer à la suite.
**IA :** Rédige le Plan d'implémentation pour modifier le frontend (UI, contexte et logique). Demande validation de l'UX (remplacement des champs libres par des sélecteurs liés à la base de données).
**Utilisateur :** Demande où sont stockés les plans d'implémentation depuis le début, afin d'avoir un historique. Demande d'intégrer cette règle au fichier Process de vibe coding.md.
**IA :** Crée le dossier docs/architecture/plans/, met à jour le fichier Process de vibe coding.md avec la nouvelle règle (11.bis), déplace le plan actuel dans le projet, puis exécute le code (création de pi.ts, modification de ProjectStep.tsx, SalesStep.tsx, etc.).
**Utilisateur :** Précise qu'il faut TOUT sauvegarder (pas juste les plans, mais aussi les questions/réponses) et que les plans doivent être numérotés séquentiellement (Plan d'implémentation 1, 2, etc.).
**IA :** Met à jour la règle dans Process de vibe coding.md, renomme le plan actuel en Plan d'implémentation 1.md, et crée ce fichier d'historique pour documenter les échanges.

**Utilisateur :** Souhaite simplifier l'UX en évitant à l'utilisateur de deviner son type de sol ou son climat. Demande s'il vaut mieux utiliser des images satellitaires ou intégrer une base de données des zones agro-écologiques (particulièrement au Togo).
**IA :** (En cours de réponse) Analyse les deux approches et recommande la base de données des zones agro-écologiques pour le MVP, tout en gardant l'imagerie spatiale pour une V2.

**Utilisateur :** Demande de retirer la contrainte Offline-first. Demande si l'API SoilGrids est fiable via GPS et, si oui, demande de l'implÃ©menter. Approuve l'ajout des 5 zones (ZAE) du Togo. Demande s'il faut intÃ©grer une carte complÃ¨te des villages et cantons dans la base de donnÃ©es.
**IA :** Retire la rÃ¨gle Offline-first des documents AGENTS.md et PRODUCT.md. Confirme la fiabilitÃ© de SoilGrids (Standard mondial ISRIC) pour un business plan. DÃ©conseille de stocker tous les villages du monde dans la base de donnÃ©es (trop lourd) et propose d'utiliser une API de Geocoding (OpenStreetMap ou Google) pour obtenir les coordonnÃ©es GPS, puis d'interroger SoilGrids avec ces coordonnÃ©es. RÃ©dige le Plan d'implÃ©mentation 2.

**Utilisateur :** Valide le Plan 2. S'inquiÃ¨te des limites de stockage de la version gratuite de Supabase et demande s'il est possible d'hÃ©berger une base de donnÃ©es ailleurs gratuitement et de la lier via API.
**IA :** (En cours de rÃ©ponse) Rassure sur la taille d'une BDD relationnelle (500Mo = des millions de lignes) mais propose des alternatives gratuites (Turso, Neon, TiDB, ou Google Sheets pour les donnÃ©es statiques) en expliquant l'architecture (Next.js en intermÃ©diaire). Ensuite, passe Ã  l'implÃ©mentation du Plan 2.

**Utilisateur :** Demande si des bases de donnÃ©es hÃ©bergÃ©es ailleurs et liÃ©es par API doivent Ãªtre du mÃªme type que Supabase. Demande un rappel du type de base de donnÃ©es de Supabase et une explication des diffÃ©rents types de bases de donnÃ©es, avec leurs avantages et inconvÃ©nients.
**IA :** (En cours de rÃ©ponse) Explique le concept d'abstraction des APIs (Next.js traduit tout en JSON, donc les bases peuvent Ãªtre de types diffÃ©rents). Rappelle que Supabase est une base de donnÃ©es SQL Relationnelle (PostgreSQL). Fournit un comparatif dÃ©taillÃ© entre SQL (Relationnel), NoSQL (Document), et les Tableurs (Google Sheets), en listant les pour et les contre de chacun.

**Utilisateur :** Demande si l'on peut utiliser Cloudflare D1 pour stocker les articles.
**IA :** (En cours de rÃ©ponse) Valide fortement l'idÃ©e. Explique que Cloudflare D1 (basÃ© sur SQLite Ã  l'Edge) est le candidat idÃ©al pour des articles (beaucoup de lectures, peu d'Ã©critures) grÃ¢ce Ã  sa rapiditÃ© mondiale et son quota gratuit extrÃªmement gÃ©nÃ©reux (5 millions de lectures/jour).

**Utilisateur :** Pense qu'il faut un abonnement payant sur Vercel pour accepter des paiements sur le site, et demande s'il est possible de contourner cela en passant par Cloudflare pour les paiements.
**IA :** (En cours de rÃ©ponse) Corrige l'idÃ©e reÃ§ue : Vercel n'exige aucun abonnement payant pour traiter des paiements techniquement. Les paiements sont gÃ©rÃ©s par des passerelles tierces (Paystack, Stripe, FedaPay) avec lesquelles Vercel n'interfÃ¨re pas. PrÃ©cise toutefois que les CGU du plan gratuit Vercel (Hobby) sont techniquement rÃ©servÃ©es aux projets non-commerciaux, mais que pour le MVP, aucun blocage technique n'empÃªche de recevoir de l'argent.

**Utilisateur :** Demande s'il est techniquement possible de scinder les services (ex: Frontend sur Vercel, et logique de paiement sur Cloudflare) mÃªme si ce n'est pas obligatoire pour l'instant.
**IA :** (En cours de rÃ©ponse) Confirme que c'est tout Ã  fait possible et que c'est une excellente pratique d'architecture appelÃ©e 'Microservices'. Explique comment le Frontend (Next.js sur Vercel) peut appeler une API indÃ©pendante hÃ©bergÃ©e sur Cloudflare Workers pour traiter une tÃ¢che spÃ©cifique (comme les paiements ou la gestion d'un blog), permettant d'isoler la sÃ©curitÃ© et de profiter des quotas gratuits de chaque plateforme.

**Utilisateur :** Signale avoir tÃ©lÃ©chargÃ© le logiciel DSSAT (dans le dossier Cloud/LOGICIEL) et demande en quoi il peut Ãªtre utile au projet.
**IA :** (En cours de rÃ©ponse) Identifie DSSAT (Decision Support System for Agrotechnology Transfer) comme l'un des modÃ¨les agronomiques les plus complets au monde. Explique que contrairement Ã  AquaCrop (orientÃ© eau), DSSAT excelle dans la modÃ©lisation de l'impact des engrais (Azote, Phosphore) et des cycles de croissance prÃ©cis. Note que le dossier contient l'installateur, et propose de l'utiliser pour extraire les coefficients gÃ©nÃ©tiques des cultures afin d'enrichir le moteur agronomique de Cultiso (ex: impacter le rendement en fonction des dÃ©penses en engrais OPEX).

**Utilisateur :** Indique avoir installÃ© DSSAT. Prend de la hauteur sur le projet et demande si la notion de 'modÃ©lisation' doit s'appliquer Ã  toutes les sections du simulateur (Production animale, Transformation, Ã‰tude de marchÃ©, StratÃ©gie marketing, Ã‰tude financiÃ¨re). Demande s'il est sur la bonne voie.
**IA :** (En cours de rÃ©ponse) Valide la vision globale mais clarifie la diffÃ©rence entre la modÃ©lisation bio-physique (complexe, comme DSSAT) et la modÃ©lisation financiÃ¨re/business (basÃ©e sur des rÃ¨gles mÃ©tier et de l'arithmÃ©tique). Explique que pour l'Ã©levage et la transformation, des rÃ¨gles mathÃ©matiques simples (Indice de Consommation) suffisent. Pour le marketing et la finance, il s'agit de construire un 'SystÃ¨me Expert' (gÃ©nÃ©ration automatique de tableaux de bord financiers, de P&L) plutÃ´t que d'utiliser des logiciels scientifiques externes.

**Utilisateur :** Valide l'extraction de DSSAT. PrÃ©cise que sa vision de la 'modÃ©lisation' pour le marketing/finance consiste Ã  empÃªcher l'IA d'halluciner. Il souhaite que l'IA croise la base de donnÃ©es interne avec des recherches web pour produire des analyses de synthÃ¨se fiables (ex: Analyse SWOT). Souligne Ã©galement que la base RAG actuelle est dÃ©sordonnÃ©e et doit Ãªtre restructurÃ©e.
**IA :** (En cours de rÃ©ponse) PrÃ©pare le script Python pour extraire les Cultivars de DSSAT. Valide la vision de l'utilisateur sur la limitation des hallucinations de l'IA (en utilisant des 'Structured Outputs' et en limitant le RAG aux documents rÃ©glementaires, tout en gardant les donnÃ©es chiffrÃ©es en SQL strict).

**Utilisateur :** RedÃ©finit la stratÃ©gie de l'intelligence mÃ©tier de Cultiso en 3 axes majeurs :
1. Ã‰tude de marchÃ© : L'IA doit faire des recherches web en temps rÃ©el sur l'idÃ©e du projet, gÃ©nÃ©rer une analyse PESTEL et les 5 Forces de Porter, puis croiser ces rÃ©sultats avec la base de donnÃ©es interne pour synthÃ©tiser un SWOT prÃ©cis.
2. BudgÃ©tisation : Les budgets actuels sont trop basiques. Ils doivent Ãªtre dÃ©taillÃ©s ligne par ligne (ex: lister chaque outil) de maniÃ¨re dynamique, en s'adaptant Ã  la nature et Ã  la taille du projet.
3. Restructuration du RAG : Le RAG ne contient pas de prix mais des connaissances expertes. Il faut extraire ces paramÃ¨tres clÃ©s (vÃ©gÃ©tal, animal, transformation) depuis le RAG pour les structurer dans la base de donnÃ©es afin de rÃ©aliser des simulations d'expert.
**IA :** (En cours de rÃ©ponse) Valide intÃ©gralement cette architecture trÃ¨s mature (Data Extraction Pipeline, Dynamic Budgeting, Web-Augmented Market Analysis) et propose de formaliser cela dans le Plan d'implÃ©mentation 3.

**Utilisateur :** Demande si l'extraction des donnÃ©es du RAG vers Supabase (pour Cultiplan) risque d'affecter Cultisia.
**IA :** (En cours de rÃ©ponse) Rassure l'utilisateur : l'extraction est non-destructive (elle ne fait que 'lire' et copier les paramÃ¨tres). De plus, explique que cela va grandement amÃ©liorer Cultisia. Cultisia pourra utiliser la base SQL pour obtenir des chiffres stricts et sans erreur (prix, rendements) tout en continuant d'utiliser le RAG pour le contexte qualitatif (conseils, lois, astuces).

**Utilisateur :** Donne le feu vert pour coder le script d'extraction intelligent du RAG.
**IA :** (En cours de rÃ©ponse) Localise le dossier Cloud/RAG_Cultiso contenant les PDFs (Ã©levage, irrigation, transformation). PrÃ©pare un script Python (extract_rag.py) utilisant l'API Gemini (Structured Outputs) pour lire ces PDFs non structurÃ©s et en extraire des paramÃ¨tres stricts (ex: rations alimentaires, rendements) au format JSON, prÃªts Ã  Ãªtre insÃ©rÃ©s dans Supabase.
