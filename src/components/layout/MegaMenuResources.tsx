import React from 'react';
import Link from 'next/link';

export const MegaMenuResources = () => {
  return (
    <div className="absolute top-[calc(100%+10px)] left-1/2 before:absolute before:-top-5 before:left-0 before:w-full before:h-5 before:bg-transparent before:content-[''] -translate-x-1/2 w-[800px] bg-white border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl hidden group-hover:block transition-all duration-300 z-50 overflow-hidden">
      <div className="flex p-10">
        
        {/* Colonnes des liens (2/3 de la largeur) */}
        <div className="w-[60%] grid grid-cols-2 gap-x-8 gap-y-2 pr-10">
          {/* Colonne 1 */}
          <div>
            <h3 className="text-[11px] font-bold text-gray-500 mb-5 uppercase tracking-[0.1em]">S'informer</h3>
            <div className="space-y-1">
              <Link href="/blog" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#D35400] mt-0.5 mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Le Blog</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Actualités et conseils</span>
                </div>
              </Link>
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#D35400] mt-0.5 mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Guides Agrobusiness</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Tutoriels et modèles gratuits</span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Colonne 2 */}
          <div>
            <h3 className="text-[11px] font-bold text-gray-500 mb-5 uppercase tracking-[0.1em]">Se former</h3>
            <div className="space-y-1">
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#D35400] mt-0.5 mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Académie Cultiso</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Vidéos et micro-learning</span>
                </div>
              </Link>
              <Link href="#" className="group/link flex items-start p-3 -mx-3 rounded-xl hover:bg-[#F5F8F6] transition-colors">
                <div className="text-[#D35400] mt-0.5 mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div>
                  <span className="font-bold text-[#052821] block text-[15px] mb-0.5">Cas Clients</span>
                  <span className="text-[14px] text-gray-500 leading-snug block">Témoignages et réussites</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Colonne Featured (1/3 de la largeur) */}
        <div className="w-[40%] pl-10 border-l border-gray-100 flex flex-col justify-center">
          <Link href="/blog" className="block group/card">
            <div className="relative h-[160px] bg-[#FFF2E5] rounded-xl overflow-hidden mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D35400]/10 to-transparent"></div>
              <svg className="w-16 h-16 text-[#D35400] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            
            <h4 className="font-bold text-[#052821] text-[16px] mb-1.5 group-hover/card:text-[#D35400] transition-colors">
              Le guide complet de l'Agrobusiness 2026
            </h4>
            <p className="text-[14px] text-gray-500 leading-relaxed">
              Découvrez les 10 stratégies pour rentabiliser votre exploitation cette année.
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
};
