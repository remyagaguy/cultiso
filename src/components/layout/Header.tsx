"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from 'antd';
import { MegaMenuProducts } from './MegaMenuProducts';
import { MegaMenuSolutions } from './MegaMenuSolutions';
import { MegaMenuResources } from './MegaMenuResources';

export const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection(prev => prev === section ? null : section);
  };
  
  if (pathname === '/cultisia' || pathname === '/cultiplan' || pathname === '/cultiseil') return null;

  return (
    <header className={`border-b border-[rgba(5,40,33,0.06)] sticky top-0 z-50 transition-colors duration-300 ${mobileMenuOpen ? 'bg-white' : 'bg-white/90 backdrop-blur-md'}`}>
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
            
            <div className="group flex items-center">
              <button className="text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-md font-medium px-3.5 py-2 text-[14.5px] flex items-center cursor-default transition-colors">
                Ressources
                <svg className="w-3.5 h-3.5 ml-1.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <MegaMenuResources />
            </div>

            <Link href="/contact" className="text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-md font-medium px-3.5 py-2 text-[14.5px] flex items-center transition-colors">
              Nous contacter
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 z-50">
            {/* Login is hidden on mobile */}
            <div className="hidden lg:block">
              <Link href="/login">
                <Button className="font-bold text-[14px] px-5 h-[40px] bg-[#F1F3F5] hover:bg-[#E5E7EB] border-none text-[#1F2937] rounded-[8px] flex items-center justify-center transition-all">
                  Se connecter
                </Button>
              </Link>
            </div>
            
            {/* Sign Up is visible everywhere */}
            <Link href="/register">
              <Button className="font-bold text-[13px] sm:text-[14px] px-4 sm:px-5 h-[34px] sm:h-[40px] !bg-[#1A1A1A] hover:!bg-[#333333] !text-white border-none shadow-sm rounded-[6px] sm:rounded-[8px] flex items-center justify-center transition-all">
                S'inscrire
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-1.5 -mr-1.5 text-[#052821] hover:bg-[rgba(5,40,33,0.04)] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-[88px] px-6 pb-6 overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col text-[#052821]">
          {/* Produits Accordion */}
          <div className="border-b border-gray-100">
            <button 
              className="w-full flex justify-between items-center py-5 text-[22px] font-bold tracking-tight"
              onClick={() => toggleMobileSection('produits')}
            >
              Produits
              <svg className={`w-5 h-5 transition-transform duration-200 ${openMobileSection === 'produits' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openMobileSection === 'produits' ? 'max-h-[300px] mb-4' : 'max-h-0'}`}>
              <div className="flex flex-col gap-4 pl-4 text-[17px] font-medium text-gray-600">
                <Link href="/cultisia" onClick={() => setMobileMenuOpen(false)}>CultiSia</Link>
                <Link href="/cultiplan" onClick={() => setMobileMenuOpen(false)}>CultiPlan</Link>
                <Link href="/cultiseil" onClick={() => setMobileMenuOpen(false)}>CultiSeil</Link>
                <span className="text-gray-400">CultiShop (Bientôt)</span>
              </div>
            </div>
          </div>

          {/* Solutions Accordion */}
          <div className="border-b border-gray-100">
            <button 
              className="w-full flex justify-between items-center py-5 text-[22px] font-bold tracking-tight"
              onClick={() => toggleMobileSection('solutions')}
            >
              Solutions
              <svg className={`w-5 h-5 transition-transform duration-200 ${openMobileSection === 'solutions' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openMobileSection === 'solutions' ? 'max-h-[300px] mb-4' : 'max-h-0'}`}>
              <div className="flex flex-col gap-4 pl-4 text-[17px] font-medium text-gray-600">
                <Link href="#" onClick={() => setMobileMenuOpen(false)}>Pour les agriculteurs</Link>
                <Link href="#" onClick={() => setMobileMenuOpen(false)}>Pour les coopératives</Link>
              </div>
            </div>
          </div>

          {/* Ressources Accordion */}
          <div className="border-b border-gray-100">
            <button 
              className="w-full flex justify-between items-center py-5 text-[22px] font-bold tracking-tight"
              onClick={() => toggleMobileSection('ressources')}
            >
              Ressources
              <svg className={`w-5 h-5 transition-transform duration-200 ${openMobileSection === 'ressources' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openMobileSection === 'ressources' ? 'max-h-[300px] mb-4' : 'max-h-0'}`}>
              <div className="flex flex-col gap-4 pl-4 text-[17px] font-medium text-gray-600">
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Le Blog</Link>
                <Link href="#" onClick={() => setMobileMenuOpen(false)}>Guides Agrobusiness</Link>
                <Link href="#" onClick={() => setMobileMenuOpen(false)}>Académie Cultiso</Link>
              </div>
            </div>
          </div>

          {/* Simple Links */}
          <Link href="/cours-des-prix" className="block py-5 text-[22px] font-bold tracking-tight border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
            Cours des prix
          </Link>
          
          <Link href="/contact" className="block py-5 text-[22px] font-bold tracking-tight border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
            Nous contacter
          </Link>
          
          {/* Bottom Login Button (Fixed at bottom or just at end of list) */}
          <div className="mt-8">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full h-[56px] font-bold text-[16px] bg-[#F1F3F5] hover:bg-[#E5E7EB] border-none text-[#1F2937] rounded-[12px] flex items-center justify-center transition-all">
                Se connecter
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
