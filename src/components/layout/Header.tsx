"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from 'antd';
import { MegaMenuProducts } from './MegaMenuProducts';
import { MegaMenuSolutions } from './MegaMenuSolutions';

export const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (pathname === '/cultisia' || pathname === '/cultiplan' || pathname === '/cultiseil') return null;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[rgba(5,40,33,0.06)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center z-50">
            <Link href="/" className="block transition-transform active:scale-[0.96] w-[165px] h-[38px] relative" onClick={() => setMobileMenuOpen(false)}>
              <img 
                src="/logo.png" 
                alt="Cultiso Logo" 
                className="absolute top-1/2 left-0 -translate-y-1/2 w-[195px] max-w-none h-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
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

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/login" className="text-[#052821] hover:text-[#D35400] font-semibold text-[14.5px] transition-colors">
              Connexion
            </Link>
            <Link href="/simulateur" className="block group">
              <Button type="primary" className="font-semibold text-[12.5px] px-5 h-[40px] bg-[#D35400] hover:bg-[#E67E22] border-none shadow-sm text-white rounded-[8px] uppercase tracking-[0.05em] flex items-center justify-center transition-transform active:scale-[0.98]">
                Simuler mon business
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden z-50 p-2 -mr-2 text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-24 px-6 pb-6 overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-6 text-lg font-medium text-[#052821]">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Produits</span>
            <Link href="/cultisia" className="pl-3 py-2 border-l-2 border-transparent hover:border-[#D35400] hover:text-[#D35400] transition-colors" onClick={() => setMobileMenuOpen(false)}>CultiSia (Agronome Virtuel)</Link>
            <Link href="/cultiplan" className="pl-3 py-2 border-l-2 border-transparent hover:border-[#D35400] hover:text-[#D35400] transition-colors" onClick={() => setMobileMenuOpen(false)}>CultiPlan (Business Plan)</Link>
            <Link href="/cultiseil" className="pl-3 py-2 border-l-2 border-transparent hover:border-[#D35400] hover:text-[#D35400] transition-colors" onClick={() => setMobileMenuOpen(false)}>CultiSeil (Agronomie Précise)</Link>
            <span className="pl-3 py-2 text-gray-400">CultiShop (Bientôt)</span>
          </div>

          <div className="w-full h-px bg-gray-100 my-2"></div>
          
          <Link href="/cours-des-prix" className="hover:text-[#D35400] transition-colors" onClick={() => setMobileMenuOpen(false)}>Cours des prix</Link>
          <Link href="/blog" className="hover:text-[#D35400] transition-colors" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link href="/login" className="hover:text-[#D35400] transition-colors" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>
          
          <Link href="/simulateur" className="mt-4" onClick={() => setMobileMenuOpen(false)}>
            <Button type="primary" className="w-full h-[50px] font-semibold text-[14px] bg-[#D35400] hover:bg-[#E67E22] border-none text-white rounded-[12px] uppercase tracking-[0.05em] flex items-center justify-center">
              Simuler mon business
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
