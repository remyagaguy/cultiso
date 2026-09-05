import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#052821] text-white px-6 py-16 md:py-24 mt-auto">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="block w-[165px] h-[38px] relative">
            <img 
              src="/logo.png" 
              alt="Cultiso Logo" 
              className="absolute top-1/2 left-0 -translate-y-1/2 w-[195px] max-w-none h-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-[15px] text-gray-400 font-manrope leading-relaxed max-w-sm">
            Intelligence Agrobusiness pour la conquête de la souveraineté alimentaire africaine.
          </p>
          <div className="pt-2 flex items-center gap-5">
            {/* Social Icons */}
            <a href="https://www.linkedin.com/company/cultiso" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.facebook.com/cultiso" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.398h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 3.398h-2.33v6.479C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="https://whatsapp.com/channel/0029VaB5rz57oQhm5fFmdi3h" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-[14px]">
              <svg className="w-[22px] h-[22px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              Rejoindre la communauté
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-[15px]">Produits</h4>
          <ul className="space-y-4 text-[14px] text-gray-400 font-manrope">
            <li><Link href="/simulateur" className="hover:text-white transition-colors">Cultiplan</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Cultisia</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Cultiseil</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Cultishop</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-[15px]">Ressources</h4>
          <ul className="space-y-4 text-[14px] text-gray-400 font-manrope">
            <li><Link href="#" className="hover:text-white transition-colors">Le Blog</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Guides pratiques</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Cas clients</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Centre d'aide</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-[15px]">Société</h4>
          <ul className="space-y-4 text-[14px] text-gray-400 font-manrope">
            <li><Link href="#" className="hover:text-white transition-colors">À propos</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Carrières</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Partenaires</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-500 font-manrope">
        <p>© {new Date().getFullYear()} Cultiso. Tous droits réservés.</p>
        <div className="flex space-x-6">
          <Link href="#" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialité</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">CGV</Link>
        </div>
      </div>
    </footer>
  );
};
