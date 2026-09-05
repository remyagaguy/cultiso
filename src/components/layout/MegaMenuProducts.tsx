import React from 'react';
import Link from 'next/link';

export const MegaMenuProducts = () => {
  return (
    <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[1050px] bg-white border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl hidden group-hover:block transition-all duration-300 z-50 overflow-hidden">
      <div className="flex p-10">
        
        {/* Colonnes des liens (2/3 de la largeur) */}
        <div className="w-[60%] grid grid-cols-2 gap-x-12 gap-y-2 pr-10">
          {/* Colonne 1 */}
          <div>
            <h3 className="text-[11px] font-bold text-gray-500 mb-5 uppercase tracking-[0.1em]">Planification & Vente</h3>
            <div className="space-y-1">
              <Link href="/simulateur" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#22c55e] mt-0.5 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Cultiplan</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Business plan et simulation financière</span>
                </div>
              </Link>
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#22c55e] mt-0.5 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Cultishop</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Boutique en ligne et marché</span>
                </div>
              </Link>
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#22c55e] mt-0.5 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Cultistock</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Gestion des stocks et logistique</span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Colonne 2 */}
          <div>
            <h3 className="text-[11px] font-bold text-gray-500 mb-5 uppercase tracking-[0.1em]">Intelligence & Conseil</h3>
            <div className="space-y-1">
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#22c55e] mt-0.5 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Cultisia</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">IA et analyse prédictive</span>
                </div>
              </Link>
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#22c55e] mt-0.5 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Cultiseil</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Conseil d'experts agricoles</span>
                </div>
              </Link>
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#22c55e] mt-0.5 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Cultigreen</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Pratiques durables et écologie</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Colonne Featured (1/3 de la largeur) */}
        <div className="w-[40%] pl-10 border-l border-gray-100">
          <h3 className="text-[11px] font-bold text-gray-500 mb-5 uppercase tracking-[0.1em]">Featured</h3>
          
          <Link href="/simulateur" className="block group/card">
            {/* Boîte visuelle avec Blueprint (Style Crop Marks) */}
            <div className="relative h-[220px] bg-[#f0fdf4] rounded-xl overflow-hidden mb-6">
              {/* Lignes horizontales */}
              <div className="absolute top-6 left-0 right-0 h-[1px] bg-[#22c55e] opacity-20"></div>
              <div className="absolute bottom-6 left-0 right-0 h-[1px] bg-[#22c55e] opacity-20"></div>
              {/* Lignes verticales */}
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#22c55e] opacity-20"></div>
              <div className="absolute right-6 top-0 bottom-0 w-[1px] bg-[#22c55e] opacity-20"></div>
              
              {/* Contenu de la boîte */}
              <div className="absolute inset-0 pt-12 pl-12 pr-10 flex flex-col items-start">
                <div className="inline-flex bg-[#22c55e] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm mb-3 shadow-sm">
                  NOUVEAUTÉ
                </div>
                <h4 className="text-[22px] font-medium text-[#22c55e] leading-tight">
                  Simulateur <br/>Cultiplan
                </h4>
              </div>
            </div>
            
            {/* Texte sous la boîte */}
            <h4 className="font-bold text-[#052821] text-[16px] mb-1.5 group-hover/card:text-[#22c55e] transition-colors">
              Créez votre business plan
            </h4>
            <p className="text-[14px] text-gray-500 leading-relaxed pr-4">
              Démarrez la simulation financière de votre projet agricole gratuitement.
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
};
