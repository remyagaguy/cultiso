import { Button } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center">
        {/* --- 1. HERO SECTION --- */}
        <section className="relative w-full px-6 pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-28 flex items-center bg-[#052821] overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#052821] via-[#052821]/90 to-[#052821]/20 z-10"></div>
            <img 
              src="/hero-bg.jpeg" 
              alt="Agriculteur dans une serre" 
              className="w-full h-full object-cover object-right md:object-center" 
            />
          </div>

          <div className="max-w-[1200px] w-full mx-auto relative z-20">
            <div className="max-w-[850px] space-y-8">
              
              <h1 className="text-[clamp(40px,9vw,72px)] font-unbounded font-bold text-white leading-[1.05] tracking-[-0.03em]">
                <span className="sm:whitespace-nowrap">L'agribusiness africain,</span> <br className="hidden sm:block" />
                <span className="text-[#D35400] sm:whitespace-nowrap">sans improvisation.</span>
              </h1>
              
              <p className="text-[17px] md:text-[19px] leading-[1.5] text-white/95 font-manrope text-justify">
                Repérer les meilleures <span className="text-[#F39C12] font-semibold">opportunités d'investissement</span>, stimuler la <span className="text-[#F39C12] font-semibold">rentabilité financière</span> de vos projets avant d'investir, produire <span className="text-[#F39C12] font-semibold">sans improvisation</span> et vendre vos récoltes au <span className="text-[#F39C12] font-semibold">meilleur prix</span> :
                <span className="block mt-4 md:mt-0 md:inline">
                  {' '}c'est ce que Cultiso vous permet de faire grâce à un <span className="text-[#F39C12] font-semibold">ensemble d'outils</span> conçus pour vous accompagner dans la mise en place et la gestion de vos projets agricoles.
                </span>
              </p>
              
              <div className="pt-6 flex flex-col lg:flex-row lg:items-center gap-5">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <Link href="/cultiplan" className="w-full sm:w-auto group">
                    <button className="w-full sm:w-auto px-8 h-[52px] text-[15.5px] font-semibold bg-[#22c55e] hover:bg-[#1fb254] text-white rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      Simuler mon business
                    </button>
                  </Link>
                  <Link href="/cours-des-prix" className="w-full sm:w-auto group">
                    <button className="w-full sm:w-auto px-8 h-[52px] text-[15.5px] font-semibold bg-[rgba(17,70,51,0.5)] hover:bg-[rgba(17,70,51,0.8)] backdrop-blur-md text-white border border-white/10 rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      Voir le cours des prix
                    </button>
                  </Link>
                </div>
                
                {/* Réassurance */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 text-white/80 text-[14.5px] font-manrope font-medium mt-1 lg:mt-0">
                  <div className="flex items-center justify-center w-6 h-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
                    <svg className="w-3.5 h-3.5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Simulation 100% gratuite</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 2. WORKFLOW SECTION --- */}
        <section className="w-full bg-white px-6 py-20 lg:py-32 border-t border-[#052821]/10">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center max-w-[700px] mx-auto mb-20">
              <h2 className="text-[clamp(28px,3vw,40px)] font-unbounded font-bold text-[#052821] mb-6 tracking-[-0.02em]">
                De l'idée à la commercialisation
              </h2>
              <p className="text-[17px] text-gray-600 font-manrope text-justify">
                Un flux de travail continu pour sécuriser chaque étape de votre production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (desktop only) */}
              <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-gray-200 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 bg-[#052821] text-white rounded-xl flex items-center justify-center font-bold text-xl font-unbounded mb-6 shadow-md ring-4 ring-[#052821]/10">1</div>
                <h4 className="font-bold text-[#052821] text-[18px] mb-2">Cultiplan</h4>
                <p className="text-gray-600 text-[14px]">Étudiez le marché, évaluez la rentabilité et générez votre business plan avant d'investir.</p>
              </div>

              {/* Step 2 (Highlighted) */}
              <div className="relative z-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 bg-[#D35400] text-white rounded-xl flex items-center justify-center font-bold text-xl font-unbounded mb-6 shadow-md ring-4 ring-[#D35400]/20">2</div>
                <h4 className="font-bold text-[#052821] text-[18px] mb-2">Cultisia</h4>
                <p className="text-gray-600 text-[14px]">Bénéficiez de recommandations expertes via notre IA agronomique pour optimiser vos rendements.</p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 bg-[#052821] text-white rounded-xl flex items-center justify-center font-bold text-xl font-unbounded mb-6 shadow-md ring-4 ring-[#052821]/10">3</div>
                <h4 className="font-bold text-[#052821] text-[18px] mb-2">Cultiseil</h4>
                <p className="text-gray-600 text-[14px]">Faites-vous accompagner par nos experts et consultants certifiés pour sécuriser vos pratiques.</p>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 bg-[#D35400] text-white rounded-xl flex items-center justify-center font-bold text-xl font-unbounded mb-6 shadow-md ring-4 ring-[#D35400]/20">4</div>
                <h4 className="font-bold text-[#052821] text-[18px] mb-2">Cultishop</h4>
                <p className="text-gray-600 text-[14px]">Achetez vos intrants au meilleur prix et vendez vos récoltes directement sur notre marketplace.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4.1 CULTIPLAN (VERT) --- */}
        <section className="w-full bg-[#DEF7F2] px-6 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Content Column */}
              <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-10">
                <div className="flex items-center gap-2 mb-6">
                  <img src="/favicon.png" alt="Cultiso" className="w-10 h-10 object-contain" />
                  <span className="font-unbounded font-bold text-[#052821] text-lg tracking-tight">Cultiplan</span>
                </div>
                
                <h2 className="text-[clamp(32px,4vw,48px)] font-unbounded font-bold text-[#052821] leading-[1.1] mb-6">
                  Étudiez le marché avant d'investir
                </h2>
                
                <p className="text-[17px] text-gray-600 font-manrope mb-10 leading-relaxed max-w-lg">
                  Analysez la faisabilité et la rentabilité financière de votre projet agrobusiness. CultiPlan génère automatiquement votre plan d'affaires sur-mesure grâce à l'Intelligence Artificielle.
                </p>
                
                {/* Checkmarks */}
                <div className="flex flex-col gap-5 mb-10 w-full">

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Génération automatique de Business Plan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Simulateur de rentabilité financière IA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Export PDF professionnel</span>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/cultiplan" className="bg-[#052821] hover:bg-[#0a4237] text-white px-7 h-[48px] rounded-xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#052821]/20 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Lancer CultiPlan
                  </Link>
                  <Link href="/cultima" className="bg-transparent border-2 border-[#052821]/20 text-[#052821] hover:border-[#052821] px-7 h-[48px] rounded-xl font-bold text-[15px] transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                    Gérer mon business
                  </Link>
                </div>
              </div>

              {/* 3D Mockup Column */}
              <div className="w-full lg:w-[55%] relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                <div className="w-full max-w-[680px] transition-transform duration-700 ease-out" 
                     style={{ transform: 'rotateY(-8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}>
                  
                  {/* Cultiplan Business Plan Dashboard */}
                  <div className="bg-[#DEF7F2] rounded-2xl border border-gray-200 shadow-2xl shadow-[#052821]/10 w-full flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#052821] to-[#0a4237]">
                      <div className="flex items-center gap-3">
                        <span className="font-unbounded font-bold text-white text-sm">Cultiplan</span>
                        <span className="text-[10px] text-white/60 font-medium">Business Plan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-2.5 py-1 bg-[#D35400] rounded-md text-[10px] font-bold text-white flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          Exporter PDF
                        </button>
                        <div className="w-7 h-7 rounded-full bg-[#DEF7F2]/20 text-white flex items-center justify-center text-[10px] font-bold">KA</div>
                      </div>
                    </div>
                    {/* Project Header */}
                    <div className="px-5 py-4 border-b border-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#052821] text-[15px] mb-0.5">Culture de Tomate — Région Maritime</div>
                          <div className="text-[11px] text-gray-500 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              Avépozo, Togo
                            </span>
                            <span>2 hectares</span>
                            <span>Cycle: 90 jours</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-[10px] font-bold text-green-600">Viable</span>
                        </div>
                      </div>
                    </div>
                    {/* Big ROI */}
                    <div className="px-5 pt-4 pb-3">
                      <div className="bg-gradient-to-br from-[#D35400]/5 to-[#F39C12]/5 border border-[#D35400]/15 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Marge nette prévisionnelle</div>
                          <div className="text-2xl font-black text-[#052821] font-unbounded tracking-tight">12 450 000 <span className="text-sm text-gray-400 font-bold">FCFA</span></div>
                        </div>
                        <div className="flex flex-col items-center">
                          {/* Donut chart simulation */}
                          <div className="relative w-16 h-16">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#D35400" strokeWidth="3" strokeDasharray="64 100" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[11px] font-black text-[#D35400]">+145%</span>
                            </div>
                          </div>
                          <span className="text-[8px] font-bold text-gray-400 mt-1">ROI</span>
                        </div>
                      </div>
                    </div>
                    {/* KPI Grid */}
                    <div className="px-5 pb-3 grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Chiffre d{"'"}affaires</div>
                        <div className="text-[15px] font-black text-[#052821]">21.0M <span className="text-[9px] text-gray-400">F</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Charges totales</div>
                        <div className="text-[15px] font-black text-[#052821]">8.55M <span className="text-[9px] text-gray-400">F</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Point mort</div>
                        <div className="text-[15px] font-black text-[#052821]">J+38</div>
                      </div>
                    </div>
                    {/* Breakdown Bars */}
                    <div className="px-5 pb-4">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Répartition des charges</div>
                      <div className="space-y-2.5">
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="font-bold text-[#052821]">Intrants & Semences</span>
                            <span className="font-bold text-[#D35400]">45%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-100"><div className="h-full bg-[#D35400] rounded-full" style={{width: "45%"}}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="font-bold text-[#052821]">Main d{"'"}œuvre</span>
                            <span className="font-bold text-[#E67E22]">35%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-100"><div className="h-full bg-[#E67E22] rounded-full" style={{width: "35%"}}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="font-bold text-[#052821]">Logistique & Divers</span>
                            <span className="font-bold text-[#F39C12]">20%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-100"><div className="h-full bg-[#F39C12] rounded-full" style={{width: "20%"}}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

{/* --- 4.2 CULTISIA (ORANGE) --- */}
        <section className="w-full bg-white px-6 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              
              {/* Content Column */}
              <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-10">
                <div className="flex items-center gap-2 mb-6">
                  <img src="/favicon.png" alt="Cultiso" className="w-10 h-10 object-contain" />
                  <span className="font-unbounded font-bold text-[#D35400] text-lg tracking-tight">Cultisia</span>
                </div>
                
                <h2 className="text-[clamp(32px,4vw,48px)] font-unbounded font-bold text-[#052821] leading-[1.1] mb-6">
                  Votre ingénieur agronome en poche
                </h2>
                
                <p className="text-[17px] text-gray-600 font-manrope mb-10 leading-relaxed max-w-lg">
                  Cultisia est l'intelligence artificielle au cœur de notre application. Posez-lui vos questions, parlez-lui de vos projets, et laissez-la vous guider simplement, étape par étape, sans jargon technique complexe.
                </p>
                
                {/* Checkmarks */}
                <div className="flex flex-col gap-5 mb-10 w-full">

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Assistance disponible 24h/24 et 7j/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Réponses simples et adaptées à votre réalité</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Orientation vers les bons outils et experts</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/cultisia" className="bg-[#D35400] hover:bg-[#b54700] text-white px-7 h-[48px] rounded-xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#D35400]/20 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Discuter avec Cultisia
                  </Link>
                </div>
              </div>

              {/* 3D Mockup Column */}
              <div className="w-full lg:w-[55%] relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                <div className="w-full max-w-[680px] transition-transform duration-700 ease-out" 
                     style={{ transform: 'rotateY(8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}>
                  
                  {/* Cultisia Dashboard Mockup */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-[#052821]/10 w-full flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[52px] bg-[#052821] flex flex-col items-center py-4 gap-4 flex-shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mt-auto">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                    </div>
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-w-0">
                      {/* Top Bar */}
                      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-unbounded font-bold text-[#052821] text-sm">Cultisia</span>
                          <span className="text-[10px] text-gray-400 font-medium">Intelligence Marché</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-[10px] font-bold">Live</span>
                          <div className="w-7 h-7 rounded-full bg-[#052821] text-white flex items-center justify-center text-[10px] font-bold">AK</div>
                        </div>
                      </div>
                      {/* KPI Row */}
                      <div className="px-5 pt-4 pb-3 grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Tomate Ronde</div>
                          <div className="text-lg font-black text-[#052821]">450 <span className="text-[10px] text-gray-400 font-bold">F/kg</span></div>
                          <div className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 mt-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                            +12.5%
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Maïs Blanc</div>
                          <div className="text-lg font-black text-[#052821]">280 <span className="text-[10px] text-gray-400 font-bold">F/kg</span></div>
                          <div className="text-[10px] font-bold text-red-500 flex items-center gap-0.5 mt-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                            -3.2%
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Piment Frais</div>
                          <div className="text-lg font-black text-[#052821]">1 200 <span className="text-[10px] text-gray-400 font-bold">F/kg</span></div>
                          <div className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 mt-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                            +8.1%
                          </div>
                        </div>
                      </div>
                      {/* Chart */}
                      <div className="px-5 pb-3">
                        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-[11px] font-bold text-[#052821]">Évolution des prix — Lomé</div>
                            <div className="flex gap-1">
                              <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-bold text-gray-500">7j</span>
                              <span className="px-2 py-0.5 bg-[#052821] rounded text-[9px] font-bold text-white">30j</span>
                              <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-bold text-gray-500">90j</span>
                            </div>
                          </div>
                          <div className="h-[100px] w-full relative">
                            <svg viewBox="0 0 500 100" preserveAspectRatio="none" className="w-full h-full">
                              <defs>
                                <linearGradient id="cultisia-grad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
                                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path d="M0,85 C30,80 60,75 100,70 C140,65 170,80 210,55 C250,30 290,60 330,35 C370,15 420,25 460,10 L500,5 L500,100 L0,100 Z" fill="url(#cultisia-grad)" />
                              <path d="M0,85 C30,80 60,75 100,70 C140,65 170,80 210,55 C250,30 290,60 330,35 C370,15 420,25 460,10 L500,5" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                              <circle cx="460" cy="10" r="4" fill="#22c55e" />
                              <circle cx="460" cy="10" r="7" fill="#22c55e" fillOpacity="0.2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* Table */}
                      <div className="px-5 pb-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Marchés à surveiller</div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between bg-green-50/50 border border-green-100 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-[11px] font-bold text-[#052821]">Lomé — Grand Marché</span>
                            </div>
                            <span className="text-[10px] font-bold text-green-600">Forte demande</span>
                          </div>
                          <div className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                              <span className="text-[11px] font-bold text-[#052821]">Kara — Marché Central</span>
                            </div>
                            <span className="text-[10px] font-bold text-orange-500">Modéré</span>
                          </div>
                          <div className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                              <span className="text-[11px] font-bold text-[#052821]">Sokodé — Gare routière</span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-500">Stable</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 4.3 CULTIMA (BEIGE) --- */}
        <section className="w-full bg-[#fdf8f5] px-6 py-20 lg:py-32 overflow-hidden border-t border-[#D35400]/10">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              {/* Content Column */}
              <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-10">
                <div className="flex items-center gap-2 mb-6">
                  <img src="/favicon.png" alt="Cultiso" className="w-10 h-10 object-contain" />
                  <span className="font-unbounded font-bold text-[#D35400] text-lg tracking-tight">Cultima</span>
                </div>
                
                <h2 className="text-[clamp(32px,4vw,48px)] font-unbounded font-bold text-[#052821] leading-[1.1] mb-6">
                  Gérez votre business au quotidien
                </h2>
                
                <p className="text-[17px] text-gray-600 font-manrope mb-10 leading-relaxed max-w-lg">
                  Prenez le contrôle total de votre business agricole. De la gestion des finances à la formulation de provendes en passant par le calendrier des semis, Cultima est votre tableau de bord ERP complet.
                </p>
                
                {/* Checkmarks */}
                <div className="flex flex-col gap-5 mb-10 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Suivi financier & Trésorerie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Calendrier de Semis & Récoltes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Formulation de Provendes (Élevage)</span>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/cultima" className="bg-[#D35400] hover:bg-[#b54700] text-white px-7 h-[48px] rounded-xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#D35400]/20 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Lancer Cultima
                  </Link>
                </div>
              </div>

              {/* 3D Mockup Column */}
              <div className="w-full lg:w-[55%] relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                <div className="w-full max-w-[680px] transition-transform duration-700 ease-out" 
                     style={{ transform: 'rotateY(8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}>
                  
                  {/* Cultima ERP Dashboard */}
                  <div className="bg-white rounded-2xl border border-[#D35400]/20 shadow-2xl shadow-[#D35400]/10 w-full flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white to-[#fdf8f5]">
                      <div className="flex items-center gap-3">
                        <span className="font-unbounded font-bold text-[#D35400] text-sm">Cultima</span>
                        <span className="text-[10px] text-gray-500 font-medium">Tableau de bord</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#D35400]/10 text-[#D35400] flex items-center justify-center text-[10px] font-bold">KA</div>
                      </div>
                    </div>
                    {/* Dashboard Content */}
                    <div className="p-5 flex flex-col gap-4 bg-gray-50/50">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Trésorerie</div>
                          <div className="text-[18px] font-bold text-[#052821]">1,250,000 F</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Dépenses (Mois)</div>
                          <div className="text-[18px] font-bold text-red-500">- 450,000 F</div>
                        </div>
                        <div className="bg-[#D35400]/10 p-3 rounded-xl border border-[#D35400]/20 shadow-sm">
                          <div className="text-[10px] text-[#D35400] font-bold mb-1 uppercase tracking-wider">Ventes (Mois)</div>
                          <div className="text-[18px] font-bold text-[#D35400]">+ 800,000 F</div>
                        </div>
                      </div>
                      
                      {/* Tâches du jour */}
                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                        <h4 className="text-[13px] font-bold text-[#052821] mb-3">Tâches du jour (Semis)</h4>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#D35400]" />
                            <span className="text-[12px] font-medium text-gray-700">Semer Tomate (Parcelle A)</span>
                            <span className="ml-auto text-[10px] font-bold px-2 py-1 bg-green-100 text-green-700 rounded">Urgent</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#D35400]" />
                            <span className="text-[12px] font-medium text-gray-700">Vérifier système d'irrigation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4.4 CULTISEIL (VERT) --- */}
        <section className="w-full bg-[#DEF7F2] px-6 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Content Column */}
              <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-10">
                <div className="flex items-center gap-2 mb-6">
                  <img src="/favicon.png" alt="Cultiso" className="w-10 h-10 object-contain" />
                  <span className="font-unbounded font-bold text-[#052821] text-lg tracking-tight">Cultiseil</span>
                </div>
                
                <h2 className="text-[clamp(32px,4vw,48px)] font-unbounded font-bold text-[#052821] leading-[1.1] mb-6">
                  Produisez avec précision
                </h2>
                
                <p className="text-[17px] text-gray-600 font-manrope mb-10 leading-relaxed max-w-lg">
                  L'outil indispensable sur le terrain. Identifiez les maladies de vos plantes, analysez l'état de vos sols et adaptez vos traitements agricoles grâce à nos algorithmes et données météorologiques locales.
                </p>
                
                {/* Checkmarks */}
                <div className="flex flex-col gap-5 mb-10 w-full">

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Diagnostic visuel des maladies et ravageurs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Analyse des sols et conseils de fertilisation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Prévisions météo et alertes climatiques locales</span>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/cultiseil" className="bg-[#052821] hover:bg-[#0a4237] text-white px-7 h-[48px] rounded-xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#052821]/20 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Démarrer un diagnostic
                  </Link>
                </div>
              </div>

              {/* 3D Mockup Column */}
              <div className="w-full lg:w-[55%] relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                <div className="w-full max-w-[680px] transition-transform duration-700 ease-out" 
                     style={{ transform: 'rotateY(-8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}>
                  
                  {/* Cultiseil Advisory Dashboard */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-[#052821]/10 w-full flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[52px] bg-[#052821] flex flex-col items-center py-4 gap-4 flex-shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mt-auto">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                    </div>
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-w-0">
                      {/* Top Bar */}
                      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-unbounded font-bold text-[#052821] text-sm">Cultiseil</span>
                          <span className="text-[10px] text-gray-400 font-medium">Accompagnement Technique</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="px-2 py-1 bg-red-50 border border-red-100 rounded-md text-[10px] font-bold text-red-600 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                            2 alertes
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#052821] text-white flex items-center justify-center text-[10px] font-bold">FA</div>
                        </div>
                      </div>
                      {/* Farm Profile + Weather */}
                      <div className="px-5 pt-4 pb-3 grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#052821]/10 flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#052821]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </div>
                            <div>
                              <div className="font-bold text-[#052821] text-[11px]">Ferme d{"'"}Avépozo</div>
                              <div className="text-[9px] text-gray-500">Production Mixte • 2 ha</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-xl font-black text-[#052821]">32°C</div>
                            <div className="text-[9px] text-gray-500 font-bold">Humid. 78%</div>
                          </div>
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="bg-red-50 border border-red-100 rounded-md px-2 py-1">
                              <div className="text-[9px] font-bold text-red-600 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                Alerte sanitaire
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Itinerary Timeline */}
                      <div className="px-5 pb-3">
                        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-[11px] font-bold text-[#052821]">Itinéraire Technique — Jour 42/90</div>
                            <div className="text-[10px] font-bold text-[#052821] bg-[#052821]/10 px-2 py-0.5 rounded">47%</div>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-200 mb-4">
                            <div className="h-full bg-gradient-to-r from-[#052821] to-[#22c55e] rounded-full" style={{width: "47%"}}></div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2.5 opacity-50">
                              <div className="w-4 h-4 rounded bg-[#052821] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <div className="text-[11px] font-bold text-gray-500 line-through">Irrigation matinale — 6h00</div>
                            </div>
                            <div className="flex items-start gap-2.5 bg-red-50/80 -mx-2 px-2 py-1.5 rounded-lg border border-red-100">
                              <div className="w-4 h-4 rounded border-2 border-red-400 flex-shrink-0 mt-0.5"></div>
                              <div>
                                <div className="text-[11px] font-bold text-red-600">Contrôle Préventif</div>
                                <div className="text-[9px] text-gray-500 mt-0.5">Vérifier l{"'"}apparition de tâches sur les feuilles.</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                              <div className="text-[11px] font-bold text-gray-600">Application d{"'"}engrais foliaire — 15h00</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Expert Chat Preview */}
                      <div className="px-5 pb-4">
                        <div className="bg-[#052821]/5 rounded-xl border border-[#052821]/10 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-[#052821] text-white flex items-center justify-center text-[8px] font-bold">Dr</div>
                            <div>
                              <span className="text-[10px] font-bold text-[#052821]">Dr. Kofi Mensah</span>
                              <span className="text-[9px] text-gray-500 ml-1">• Agronome certifié</span>
                            </div>
                            <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                          <div className="bg-white rounded-lg p-2 border border-[#052821]/10 text-[10px] text-gray-600 leading-relaxed">
                            {"\""}Les tâches observées correspondent à une septoriose précoce. Je recommande un traitement fongique immédiat.{"\""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

{/* --- 4.5 CULTISHOP (ORANGE) --- */}
        <section className="w-full bg-white px-6 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              
              {/* Content Column */}
              <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-10">
                <div className="flex items-center gap-2 mb-6">
                  <img src="/favicon.png" alt="Cultiso" className="w-10 h-10 object-contain" />
                  <span className="font-unbounded font-bold text-[#D35400] text-lg tracking-tight">Cultishop</span>
                </div>
                
                <h2 className="text-[clamp(32px,4vw,48px)] font-unbounded font-bold text-[#052821] leading-[1.1] mb-6">
                  Vendez et achetez mieux
                </h2>
                
                <p className="text-[17px] text-gray-600 font-manrope mb-10 leading-relaxed max-w-lg">
                  Accédez à des fournisseurs d'intrants et d'équipements fiables pour sécuriser vos approvisionnements.
                </p>
                
                {/* Checkmarks */}
                <div className="flex flex-col gap-5 mb-10 w-full">

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Achat d'intrants et d'équipements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Commande simplifiée</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D35400] flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#052821] font-bold text-[15px] leading-tight">Mise en relation avec des fournisseurs fiables</span>
                  </div>
                </div>
                
                                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/cultishop" className="bg-[#D35400] hover:bg-[#b54700] text-white px-7 h-[48px] rounded-xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#D35400]/20 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    Acheter des intrants
                  </Link>
                  <Link href="/cultishop" className="bg-transparent border-2 border-[#D35400]/20 text-[#D35400] hover:border-[#D35400] px-7 h-[48px] rounded-xl font-bold text-[15px] transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Vendre mes récoltes
                  </Link>
                </div>
              </div>

              {/* 3D Mockup Column */}
              <div className="w-full lg:w-[55%] relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                <div className="w-full max-w-[680px] transition-transform duration-700 ease-out" 
                     style={{ transform: 'rotateY(8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}>
                  
                  {/* Cultishop Marketplace Dashboard */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-[#052821]/10 w-full flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-unbounded font-bold text-[#052821] text-sm">Cultishop</span>
                        <span className="text-[10px] text-gray-400 font-medium">Marketplace B2B</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[10px] text-gray-500 w-[140px]">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                          Rechercher...
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#052821] text-white flex items-center justify-center text-[10px] font-bold">AK</div>
                      </div>
                    </div>
                    {/* Tabs */}
                    <div className="px-5 pt-3 pb-0 flex gap-1 border-b border-gray-100">
                      <div className="px-3 py-2 bg-[#052821] text-white rounded-t-lg text-[10px] font-bold">Offres reçues</div>
                      <div className="px-3 py-2 text-gray-500 text-[10px] font-bold hover:bg-gray-50 rounded-t-lg">Mes annonces</div>
                      <div className="px-3 py-2 text-gray-500 text-[10px] font-bold hover:bg-gray-50 rounded-t-lg">Intrants</div>
                    </div>
                    {/* Best Offer Card */}
                    <div className="px-5 pt-4 pb-3">
                      <div className="bg-green-50/60 rounded-xl border border-green-200 p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#D35400] text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-bl-lg">Meilleure offre</div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#052821] flex items-center justify-center font-bold text-xs text-white">SR</div>
                          <div>
                            <div className="font-bold text-[#052821] text-[13px]">Supermarché Ramco</div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              Acheteur vérifié • Lomé
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3 bg-white rounded-lg p-2.5 border border-[#052821]/10">
                          <div>
                            <div className="text-[9px] text-gray-500 mb-0.5">Demande</div>
                            <div className="font-bold text-[#052821] text-[11px]">12 T. de Maïs</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-gray-500 mb-0.5">Prix proposé</div>
                            <div className="font-bold text-green-600 text-[11px]">450 F/kg</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-gray-500 mb-0.5">Valeur totale</div>
                            <div className="font-bold text-[#052821] text-[11px]">5.4M FCFA</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-[#052821] hover:bg-[#0a4237] text-white font-bold py-2 rounded-lg text-[11px] transition-colors">Accepter l{"'"}offre</button>
                          <button className="flex-1 bg-white border border-gray-200 text-[#052821] font-bold py-2 rounded-lg text-[11px] transition-colors">Négocier</button>
                        </div>
                      </div>
                    </div>
                    {/* Other Offers */}
                    <div className="px-5 pb-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Autres offres (3)</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-[10px]">CK</div>
                            <div>
                              <div className="font-bold text-[#052821] text-[11px]">Coop. de Kpalimé</div>
                              <div className="text-[9px] text-gray-500">5 Tonnes • 420 F/kg</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#052821] bg-[#052821]/10 px-2 py-0.5 rounded">2.1M F</span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-[10px]">HA</div>
                            <div>
                              <div className="font-bold text-[#052821] text-[11px]">Hôtel Agbodrafo</div>
                              <div className="text-[9px] text-gray-500">2 Tonnes • 480 F/kg</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#052821] bg-[#052821]/10 px-2 py-0.5 rounded">960K F</span>
                        </div>
                      </div>
                    </div>
                    {/* Transaction Status */}
                    <div className="px-5 pb-4">
                      <div className="bg-[#052821]/5 rounded-xl border border-[#052821]/10 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                          <span className="text-[10px] font-bold text-[#052821]">Paiement sécurisé Cultiso</span>
                        </div>
                        <span className="text-[10px] font-bold text-green-600">Escrow activé</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

<section className="w-full bg-[#DEF7F2] px-6 py-24 lg:py-32">
          <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
            
            <h2 className="text-[clamp(32px,5vw,56px)] font-unbounded font-bold text-[#052821] leading-[1.1] mb-6 tracking-[-0.02em]">
              Prêt à structurer votre projet agricole ?
            </h2>
            
            <p className="text-[17px] md:text-[19px] text-[#052821]/80 font-manrope mb-12 max-w-[600px] leading-relaxed">
              Découvrez la puissance de Cultiplan sans créer de compte. Calculez votre rentabilité en quelques minutes et prenez les bonnes décisions avant d'investir.
            </p>
            
            <Link href="/cultiplan" className="inline-block group">
              <button className="px-10 h-[60px] text-[16px] font-bold bg-[#052821] hover:bg-[#0a3f34] text-white rounded-xl shadow-lg shadow-[#052821]/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 mx-auto">
                Démarrer une simulation
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </Link>
            
          </div>
        </section>
      </main>
    </>
  );
}
