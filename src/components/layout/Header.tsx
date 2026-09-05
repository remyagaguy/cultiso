import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'antd';
import { MegaMenuProducts } from './MegaMenuProducts';
import { MegaMenuSolutions } from './MegaMenuSolutions';

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[rgba(5,40,33,0.06)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="block transition-transform active:scale-[0.96] w-[165px] h-[38px] relative">
              <img 
                src="/logo.png" 
                alt="Cultiso Logo" 
                className="absolute top-1/2 left-0 -translate-y-1/2 w-[195px] max-w-none h-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2 md:space-x-3">
            <div className="group flex items-center">
              <button className="text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-md font-medium px-3.5 py-2 text-[14.5px] flex items-center cursor-default transition-colors">
                Produits
                <svg className="w-3.5 h-3.5 ml-1.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <MegaMenuProducts />
            </div>

            <div className="group flex items-center">
              <button className="text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-md font-medium px-3.5 py-2 text-[14.5px] flex items-center cursor-default transition-colors">
                Solutions
                <svg className="w-3.5 h-3.5 ml-1.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <MegaMenuSolutions />
            </div>

            <Link href="/cours-des-prix" className="text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-md font-medium px-3.5 py-2 text-[14.5px] flex items-center transition-colors">
              Cours des prix
            </Link>
            
            <Link href="/blog" className="text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-md font-medium px-3.5 py-2 text-[14.5px] flex items-center transition-colors">
              Blog
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-[#052821] hover:text-[#D35400] font-semibold text-[14.5px] transition-colors">
              Connexion
            </Link>
            <Link href="/simulateur" className="block group">
              <Button type="primary" className="font-semibold text-[12.5px] px-5 h-[40px] bg-[#D35400] hover:bg-[#E67E22] border-none shadow-sm text-white rounded-[8px] uppercase tracking-[0.05em] flex items-center justify-center transition-transform active:scale-[0.98]">
                Simuler mon business
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
