import Image from 'next/image';
import Link from 'next/link';

// Données factices pour les articles
const FEATURED_POST = {
  id: 'featured-1',
  category: 'AGRONOMIE',
  date: '15 AOÛT 2026',
  title: 'Optimiser le rendement de votre maïs en saison sèche',
  excerpt: 'Découvrez nos techniques éprouvées d\'irrigation de précision et de gestion des sols pour maximiser votre production même lorsque la pluie se fait rare. Une analyse complète basée sur nos données terrain.',
  imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000&auto=format&fit=crop',
};

const POSTS = [
  {
    id: 1,
    category: 'MARCHÉS',
    date: '3 AOÛT 2026',
    title: 'Analyse des prix : La flambée du soja en Afrique de l\'Ouest',
    excerpt: 'Pourquoi le prix du soja a-t-il augmenté de 40% ce trimestre ? Décryptage des facteurs économiques et opportunités pour les producteurs.',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'ÉLEVAGE',
    date: '2 AOÛT 2026',
    title: 'Aviculture : Réduire le taux de mortalité des poussins',
    excerpt: 'Guide pratique pour les 14 premiers jours critiques. Température, alimentation et protocoles de biosécurité indispensables.',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bf3c49b4064?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'BUSINESS PLAN',
    date: '27 JUIL 2026',
    title: 'Comment structurer votre plan de financement agricole',
    excerpt: 'Les erreurs à éviter face aux banques et comment présenter un prévisionnel financier solide avec le module Cultiplan.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    category: 'AGRONOMIE',
    date: '24 JUIL 2026',
    title: 'Rotation des cultures : Améliorer la fertilité des sols',
    excerpt: 'Planifiez vos cycles sur 3 ans pour réduire l\'utilisation d\'engrais chimiques tout en augmentant vos rendements globaux.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    category: 'TECHNOLOGIE',
    date: '23 JUIL 2026',
    title: 'Les drones agricoles : Gadget ou vrai outil de rentabilité ?',
    excerpt: 'Retour sur investissement de la cartographie par drone pour les exploitations de plus de 50 hectares.',
    imageUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    category: 'AGROALIMENTAIRE',
    date: '14 JUIL 2026',
    title: 'Transformation du manioc : De la racine à l\'export',
    excerpt: 'Étude de cas sur une unité de transformation d\'attiéké et de gari. Normes sanitaires et conditionnement.',
    imageUrl: 'https://images.unsplash.com/photo-1603597402092-7f28ed55f464?q=80&w=600&auto=format&fit=crop',
  },
];

const CATEGORIES = ['TOUT', 'AGRONOMIE', 'MARCHÉS', 'ÉLEVAGE', 'BUSINESS PLAN', 'AGROALIMENTAIRE'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-0 font-manrope">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* En-tête de la page */}
        <div className="mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#052821] font-unbounded mb-4">
            Insights pour l'agrobusiness
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            Guides pratiques, analyses de marché et conseils techniques pour structurer, financer et piloter vos projets agricoles en Afrique.
          </p>
        </div>

        {/* Featured Post (Inspiré de Plain.com - "Meet Sidekick") */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-24 bg-[#F5F8F6] p-8 md:p-12 rounded-[2rem] border border-[#0B5345]/10">
          <div className="w-full md:w-5/12 flex flex-col items-start order-2 md:order-1">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#0B5345] mb-6 uppercase">
              <span>{FEATURED_POST.category}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{FEATURED_POST.date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#052821] font-unbounded mb-4 leading-tight">
              {FEATURED_POST.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {FEATURED_POST.excerpt}
            </p>
            <Link 
              href={`/blog/${FEATURED_POST.id}`}
              className="group flex items-center text-[#22c55e] font-bold text-sm tracking-wider uppercase"
            >
              LIRE LA SUITE 
              <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>
          <div className="w-full md:w-7/12 order-1 md:order-2">
            <div className="relative aspect-[4/3] md:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm">
              <Image 
                src={FEATURED_POST.imageUrl} 
                alt={FEATURED_POST.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#0B5345]/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>

        {/* Barre de filtres (Inspirée de Plain.com) */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded border transition-colors ${
                index === 0 
                  ? 'border-[#0B5345] text-[#0B5345] bg-transparent' 
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 bg-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille d'articles (3 colonnes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-20">
          {POSTS.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full cursor-pointer">
              {/* Image de la carte avec fond clair style Plain */}
              <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-[#F5F8F6] mb-5 border border-gray-100">
                <Image 
                  src={post.imageUrl} 
                  alt={post.title}
                  fill
                  className="object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Contenu de la carte */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#052821] mb-3 uppercase">
                  <span>{post.category}</span>
                  <span className="text-gray-300">•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-[#052821] mb-2 leading-snug group-hover:text-[#D35400] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bouton Load More */}
        <div className="flex justify-center mb-32">
          <button className="px-6 py-2.5 border border-[#22c55e] text-[#22c55e] text-[11px] font-bold uppercase tracking-widest rounded hover:bg-[#22c55e] hover:text-white transition-colors">
            LOAD MORE
          </button>
        </div>

      </div>

      {/* Section CTA Blueprint (Inspirée du bas de page Plain.com) */}
      <div className="relative border-t border-[#0B5345]/10 bg-[#F5F8F6] overflow-hidden py-32">
        {/* Lignes quadrillées (Blueprint) */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #22c55e 1px, transparent 1px), linear-gradient(to bottom, #22c55e 1px, transparent 1px)', 
               backgroundSize: '48px 48px' 
             }}>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F5F8F6]/80 to-transparent pointer-events-none"></div>
        
        {/* Contenu du CTA */}
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#052821] font-unbounded mb-10 leading-tight">
            Rejoignez les agri-preneurs qui s'appuient sur Cultiso pour réussir.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/simulateur" 
              className="w-full sm:w-auto px-8 py-3 bg-[#22c55e] text-white font-bold rounded hover:bg-[#1ea34d] transition-colors text-center text-xs tracking-widest uppercase"
            >
              CRÉER MON BUSINESS PLAN
            </Link>
            <Link 
              href="/solutions" 
              className="w-full sm:w-auto px-8 py-3 border border-[#22c55e] text-[#22c55e] font-bold rounded hover:bg-[#22c55e] hover:text-white transition-colors text-center uppercase text-xs tracking-widest"
            >
              START FOR FREE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
