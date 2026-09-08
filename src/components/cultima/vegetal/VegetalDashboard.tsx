"use client";
import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  LayoutDashboard, MapPin, CalendarDays, CloudSun, Boxes, Wallet,
  TrendingUp, Sprout, Users, Bug, FlaskConical, Satellite, Bell, Search,
  Settings, ChevronRight, ArrowUpRight, ArrowDownRight, Droplets, Wind,
  ThermometerSun, AlertTriangle, CheckCircle2, Warehouse, Sun, CloudRain,
  BarChart3, PiggyBank, Leaf, Fuel,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  TOKENS                                                             */
/* ------------------------------------------------------------------ */
const C = {
  green: "#0B5345",
  greenDeep: "#072F27",
  greenSoft: "#E4ECE6",
  laterite: "#D35400",
  lateriteSoft: "#F5D9C2",
  paper: "#F3F5EF",
  card: "#FFFFFF",
  ink: "#17231F",
  sage: "#6E8A75",
  gold: "#C99A3E",
  goldSoft: "#F2E6CB",
  alert: "#A23B2E",
  alertSoft: "#F0DAD5",
  water: "#3F7A8C",
  waterSoft: "#DCE7E9",
  line: "#DFE4DA",
};

const serif = "'Zilla Slab', serif";
const sans = "'IBM Plex Sans', sans-serif";

const statusColor = (s: string) =>
  s === "bon" || s === "Bon" ? C.green
  : s === "moyen" || s === "Moyen" ? C.gold
  : C.alert;

const fmtFCFA = (n: number) => `${n.toLocaleString("fr-FR")} M FCFA`;

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */
const financeSeries = [
  { mois: "Avr", recettes: 18.2, charges: 12.4 },
  { mois: "Mai", recettes: 21.5, charges: 14.1 },
  { mois: "Juin", recettes: 19.8, charges: 13.6 },
  { mois: "Juil", recettes: 24.3, charges: 15.9 },
  { mois: "Août", recettes: 27.1, charges: 16.8 },
  { mois: "Sept", recettes: 25.6, charges: 15.2 },
];

const sparkline = [12, 14, 13, 17, 19, 18, 22, 24, 23, 26, 25, 27].map((v, i) => ({ i, v }));

const stocks = [
  { nom: "Urée", unite: "sacs de 50 kg", pct: 18, statut: "critique", icon: Boxes },
  { nom: "NPK 15-15-15", unite: "sacs de 50 kg", pct: 74, statut: "bon", icon: Boxes },
  { nom: "Semences hybrides — maïs", unite: "kg", pct: 41, statut: "moyen", icon: Sprout },
  { nom: "Fongicide cuivre", unite: "litres", pct: 88, statut: "bon", icon: FlaskConical },
  { nom: "Carburant motopompe", unite: "litres", pct: 23, statut: "critique", icon: Fuel },
];

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const stageLabel: any = { prep: "Préparation sol", semis: "Semis / Plantation", croissance: "Croissance", floraison: "Floraison", recolte: "Récolte", repos: "Repos / Jachère" };
const stageColor: any = { prep: "#DCE3D6", semis: "#7A9B76", croissance: C.green, floraison: C.gold, recolte: C.laterite, repos: "#ECE9E0" };

const calendar = [
  { parcelle: "Maïs — Zone Nord", ha: 12, stages: ["repos","prep","semis","croissance","croissance","floraison","recolte","prep","semis","croissance","recolte","repos"] },
  { parcelle: "Tomate — Zone Est", ha: 6, stages: ["croissance","floraison","recolte","prep","semis","croissance","floraison","recolte","prep","semis","croissance","floraison"] },
  { parcelle: "Verger Manguier — Zone Sud", ha: 20, stages: ["floraison","floraison","recolte","recolte","recolte","repos","repos","repos","croissance","croissance","floraison","floraison"] },
  { parcelle: "Oignon — Zone Ouest", ha: 4, stages: ["recolte","prep","repos","repos","prep","semis","croissance","croissance","croissance","recolte","prep","semis"] },
  { parcelle: "Anacarde — Zone Centrale", ha: 15, stages: ["floraison","recolte","recolte","recolte","repos","repos","repos","croissance","croissance","croissance","floraison","floraison"] },
];

const forecast = [
  { jour: "Mer", temp: 30, Icon: Sun },
  { jour: "Jeu", temp: 31, Icon: Sun },
  { jour: "Ven", temp: 28, Icon: CloudRain },
  { jour: "Sam", temp: 27, Icon: CloudRain },
  { jour: "Dim", temp: 29, Icon: Sun },
];

const sensors = [
  { label: "Humidité du sol", value: "38 %", cible: "40–60 %", statut: "moyen", Icon: Droplets },
  { label: "Température du sol", value: "27 °C", cible: "22–28 °C", statut: "bon", Icon: ThermometerSun },
  { label: "Conductivité (EC)", value: "1,2 dS/m", cible: "1,0–1,8", statut: "bon", Icon: Satellite },
  { label: "NDVI moyen", value: "0,71", cible: "> 0,60", statut: "bon", Icon: Leaf },
];

const yields = [
  { culture: "Maïs", prevu: 38, objectif: 42 },
  { culture: "Tomate", prevu: 54, objectif: 50 },
  { culture: "Manguier", prevu: 96, objectif: 90 },
  { culture: "Oignon", prevu: 21, objectif: 25 },
  { culture: "Anacarde", prevu: 18, objectif: 20 },
];

const ndvi = [
  { parcelle: "Maïs — Nord", zones: [0.72, 0.68, 0.75, 0.61, 0.70, 0.66] },
  { parcelle: "Tomate — Est", zones: [0.55, 0.60, 0.48, 0.58, 0.52, 0.57] },
  { parcelle: "Manguier — Sud", zones: [0.80, 0.83, 0.79, 0.81, 0.77, 0.82] },
  { parcelle: "Oignon — Ouest", zones: [0.63, 0.59, 0.65, 0.61, 0.58, 0.60] },
  { parcelle: "Anacarde — Centre", zones: [0.74, 0.71, 0.69, 0.73, 0.70, 0.72] },
];
const ndviColor = (v: number) => (v < 0.5 ? C.alert : v < 0.68 ? C.gold : C.green);

const pests = [
  { culture: "Maïs", nom: "Chenille légionnaire (Spodoptera)", risque: 78 },
  { culture: "Tomate", nom: "Mildiou (Phytophthora)", risque: 82 },
  { culture: "Manguier", nom: "Anthracnose", risque: 45 },
  { culture: "Oignon", nom: "Thrips", risque: 22 },
];
const riskColor = (r: number) => (r >= 70 ? C.alert : r >= 40 ? C.gold : C.green);
const riskLabel = (r: number) => (r >= 70 ? "Élevé" : r >= 40 ? "Modéré" : "Faible");

const chantiers = [
  { nom: "Récolte — Maïs Nord", equipe: 12, pct: 68 },
  { nom: "Irrigation goutte-à-goutte — Verger Manguier", equipe: 4, pct: 100 },
  { nom: "Traitement phytosanitaire — Anacarde", equipe: 8, pct: 40 },
  { nom: "Désherbage — Oignon Ouest", equipe: 6, pct: 85 },
];

const soils = [
  { parcelle: "Maïs — Nord", ph: "6,2", n: "Moyen", p: "Faible", k: "Bon", mo: "2,1 %" },
  { parcelle: "Tomate — Est", ph: "6,6", n: "Bon", p: "Bon", k: "Bon", mo: "2,8 %" },
  { parcelle: "Manguier — Sud", ph: "5,8", n: "Faible", p: "Moyen", k: "Bon", mo: "1,9 %" },
  { parcelle: "Oignon — Ouest", ph: "6,9", n: "Bon", p: "Bon", k: "Moyen", mo: "2,4 %" },
  { parcelle: "Anacarde — Centre", ph: "5,5", n: "Faible", p: "Faible", k: "Moyen", mo: "1,6 %" },
];

const navItems = [
  { label: "Tableau de bord", Icon: LayoutDashboard },
  { label: "Parcelles", Icon: MapPin },
  { label: "Calendrier cultural", Icon: CalendarDays },
  { label: "Météo & IoT", Icon: CloudSun },
  { label: "Intrants & Stocks", Icon: Warehouse },
  { label: "Finances", Icon: Wallet },
  { label: "Rendements", Icon: BarChart3 },
  { label: "Main-d'œuvre", Icon: Users },
  { label: "Paramètres", Icon: Settings },
];

const alerts = [
  { text: "Stock d'urée sous seuil critique (18 %) — réapprovisionner sous 5 jours", level: "critique" },
  { text: "Risque élevé de mildiou détecté — Parcelle Tomate Est, fenêtre 48 h", level: "critique" },
  { text: "Chantier irrigation Verger Manguier terminé à 100 %", level: "info" },
];

/* ------------------------------------------------------------------ */
/*  PRIMITIVES                                                         */
/* ------------------------------------------------------------------ */
function Bar1({ pct, color, height = 8, track = C.greenSoft }: any) {
  return (
    <div style={{ height, background: track, borderRadius: height, width: "100%", overflow: "hidden" }}>
      <div style={{ width: `${Math.max(2, Math.min(100, pct))}%`, height: "100%", background: color, borderRadius: height, transition: "width .4s ease" }} />
    </div>
  );
}

function RadialGauge({ value, color = C.green, track = C.greenSoft, size = 92, stroke = 9, valueLabel, label }: any) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / 100));
  const dash = circ * pct;
  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={`${dash} ${circ - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dasharray .5s ease" }}
        />
        <text x="50%" y="52%" textAnchor="middle" dominantBaseline="central"
          style={{ fontFamily: serif, fontWeight: 600, fontSize: size * 0.21, fill: C.ink }}>
          {valueLabel ?? `${Math.round(value)}%`}
        </text>
      </svg>
      {label && <span className="text-xs text-center mt-1 leading-tight" style={{ color: C.sage }}>{label}</span>}
    </div>
  );
}

function Pill({ children, tone = "green" }: any) {
  const map: any = {
    green: { bg: C.greenSoft, fg: C.green },
    laterite: { bg: C.lateriteSoft, fg: C.laterite },
    gold: { bg: C.goldSoft, fg: "#8A6A24" },
    alert: { bg: C.alertSoft, fg: C.alert },
  };
  const t = map[tone] || map.green;
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: t.bg, color: t.fg }}>
      {children}
    </span>
  );
}

function StatusDot({ statut }: any) {
  return <span className="inline-block rounded-full" style={{ width: 7, height: 7, background: statusColor(statut) }} />;
}

function SectionCard({ title, subtitle, right, className = "", children, flat = true }: any) {
  return (
    <div
      className={`rounded-xl p-5 md:p-6 ${className}`}
      style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: flat ? "none" : "0 1px 2px rgba(11,83,69,0.06)" }}
    >
      {(title || right) && (
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            {title && <h3 style={{ fontFamily: serif, color: C.ink }} className="text-lg font-semibold leading-tight">{title}</h3>}
            {subtitle && <p className="text-xs mt-0.5" style={{ color: C.sage }}>{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LAYOUT: SIDEBAR / TOPBAR / ALERTS                                  */
/* ------------------------------------------------------------------ */
function Sidebar({ active, setActive }: any) {
  return (
    <aside
      className="hidden lg:flex flex-col shrink-0 min-h-screen"
      style={{ width: 240, background: `linear-gradient(180deg, ${C.green}, ${C.greenDeep})`, color: "#fff" }}
    >
      <div className="flex items-center gap-2.5 px-6 h-16 border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: C.laterite }}>
          <Sprout size={18} color="#fff" />
        </div>
        <span style={{ fontFamily: serif }} className="text-lg font-semibold tracking-tight">Cultima</span>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map(({ label, Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors"
              style={{
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.72)",
                borderLeft: isActive ? `3px solid ${C.laterite}` : "3px solid transparent",
              }}
            >
              <Icon size={17} />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 pb-5 pt-3 mx-3 mb-4 rounded-lg" style={{ background: "rgba(255,255,255,0.08)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Exploitation</p>
        <p className="text-sm font-medium mt-0.5">Ferme Ndjaba — 57 ha</p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>5 parcelles actives</p>
      </div>
    </aside>
  );
}

function Topbar({ active }: any) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 lg:px-8 h-16 border-b" style={{ background: "rgba(243,245,239,0.92)", backdropFilter: "blur(6px)", borderColor: C.line }}>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm hidden md:inline" style={{ color: C.sage }}>Cultima</span>
        <ChevronRight size={14} style={{ color: C.sage }} className="hidden md:inline" />
        <span className="text-sm font-semibold truncate" style={{ color: C.ink }}>{active}</span>
      </div>

      <div className="flex-1 max-w-md hidden md:flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <Search size={15} style={{ color: C.sage }} />
        <input
          placeholder="Rechercher une parcelle, un intrant, un chantier…"
          className="w-full bg-transparent outline-none text-sm"
          style={{ color: C.ink }}
        />
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        <div className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color: C.sage }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: C.green }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: C.green }} />
          </span>
          Synchronisé — 08 sept, 07:42
        </div>
        <button className="relative p-2 rounded-lg" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
          <Bell size={16} style={{ color: C.ink }} />
          <span className="absolute -top-1 -right-1 text-[10px] font-semibold rounded-full flex items-center justify-center" style={{ width: 15, height: 15, background: C.laterite, color: "#fff" }}>3</span>
        </button>
        <div className="flex items-center gap-2 pl-1">
          <div className="rounded-full flex items-center justify-center font-semibold text-sm" style={{ width: 34, height: 34, background: C.green, color: "#fff" }}>KA</div>
          <div className="hidden xl:block leading-tight">
            <p className="text-sm font-medium" style={{ color: C.ink }}>Kodjo Adjovi</p>
            <p className="text-xs" style={{ color: C.sage }}>Directeur d'exploitation</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function AlertBar() {
  return (
    <div className="px-5 lg:px-8 pt-4 space-y-2">
      {alerts.map((a, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm"
          style={{ background: a.level === "critique" ? C.alertSoft : C.greenSoft, color: a.level === "critique" ? C.alert : C.green }}>
          {a.level === "critique" ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
          <span className="font-medium">{a.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <div className="rounded-xl p-6 md:p-8" style={{ background: `linear-gradient(120deg, ${C.greenDeep} 0%, ${C.green} 60%)`, color: "#fff" }}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-md">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Bonjour Kodjo — campagne 2026, semaine 36</p>
          <div className="flex items-baseline gap-3 mt-2">
            <span style={{ fontFamily: serif }} className="text-5xl font-semibold tracking-tight">48,6 t</span>
            <span className="text-sm inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium" style={{ background: "rgba(211,84,0,0.28)", color: "#FCE2CE" }}>
              <ArrowUpRight size={13} /> 6,2 % vs objectif
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.68)" }}>Rendement prévisionnel global — toutes cultures confondues</p>
          <div style={{ height: 46, width: 220 }} className="mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline}>
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.laterite} stopOpacity={0.55} />
                    <stop offset="100%" stopColor={C.laterite} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#F2A65A" strokeWidth={2} fill="url(#sparkFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {[
            { Icon: PiggyBank, label: "Trésorerie disponible", value: "42,5 M FCFA" },
            { Icon: MapPin, label: "Surface exploitée", value: "57 ha · 5 parcelles" },
            { Icon: AlertTriangle, label: "Alertes actives", value: "3 à traiter" },
            { Icon: CloudSun, label: "Météo — Zone Nord", value: "29 °C, ensoleillé" },
          ].map(({ Icon, label, value }, i) => (
            <div key={i} className="rounded-lg px-3.5 py-3" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <Icon size={16} style={{ color: "#F2C89E" }} />
              <p className="text-sm font-semibold mt-2 leading-tight">{value}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.62)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WIDGETS                                                             */
/* ------------------------------------------------------------------ */
function FinanceCard({ className }: any) {
  return (
    <SectionCard
      className={className}
      title="Trésorerie & finances"
      subtitle="Solde consolidé — septembre 2026"
      right={<Pill tone="green"><ArrowUpRight size={12} /> +8,3 % vs mois dernier</Pill>}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <p style={{ fontFamily: serif, color: C.ink }} className="text-3xl font-semibold">42,5 M FCFA</p>
          <p className="text-xs mt-1" style={{ color: C.sage }}>Solde de trésorerie disponible</p>
          <div style={{ height: 168 }} className="mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financeSeries} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="recFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.green} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={C.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={C.line} />
                <XAxis dataKey="mois" tick={{ fontSize: 11, fill: C.sage }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: C.sage }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                  formatter={(v) => [`${v} M FCFA`, ""]}
                  contentStyle={{ borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 12, fontFamily: sans }}
                />
                <Area type="monotone" dataKey="recettes" name="Recettes" stroke={C.green} strokeWidth={2.5} fill="url(#recFill)" />
                <Area type="monotone" dataKey="charges" name="Charges" stroke={C.laterite} strokeWidth={2} strokeDasharray="4 3" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: C.sage }}>
            <span className="flex items-center gap-1.5"><span style={{ width: 9, height: 9, borderRadius: 2, background: C.green }} className="inline-block" />Recettes</span>
            <span className="flex items-center gap-1.5"><span style={{ width: 9, height: 2, background: C.laterite }} className="inline-block" />Charges</span>
          </div>
        </div>

        <div className="flex md:flex-col items-center md:items-stretch justify-around gap-4 md:w-40 md:border-l md:pl-6" style={{ borderColor: C.line }}>
          <RadialGauge value={63} color={C.green} valueLabel="63 %" label="Budget campagne exécuté" />
          <div className="text-center md:text-left">
            <p className="text-xs" style={{ color: C.sage }}>Charges cumulées</p>
            <p className="text-sm font-semibold" style={{ color: C.ink }}>93,6 M FCFA</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function StockCard({ className }: any) {
  return (
    <SectionCard className={className} title="Intrants & stocks" subtitle="Niveaux magasin — 5 entrepôts" right={<Pill tone="alert"><AlertTriangle size={12} />2 critiques</Pill>}>
      <div className="space-y-4">
        {stocks.map((s) => (
          <div key={s.nom}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="flex items-center gap-2 font-medium" style={{ color: C.ink }}>
                <s.icon size={14} style={{ color: C.sage }} />
                {s.nom}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: C.sage }}>
                {s.unite} <StatusDot statut={s.statut} /> <span style={{ color: statusColor(s.statut), fontWeight: 600 }}>{s.pct}%</span>
              </span>
            </div>
            <Bar1 pct={s.pct} color={statusColor(s.statut)} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function CulturalCalendarCard() {
  return (
    <SectionCard
      title="Calendrier cultural"
      subtitle="Cycles culturaux par parcelle — campagne 2026"
      right={<span className="text-xs hidden sm:flex items-center gap-1.5" style={{ color: C.sage }}><CalendarDays size={14} />12 mois glissants</span>}
    >
      <div className="overflow-x-auto">
        <div style={{ minWidth: 720 }}>
          <div className="grid mb-1.5" style={{ gridTemplateColumns: "180px repeat(12, 1fr)" }}>
            <div />
            {months.map((m) => (
              <div key={m} className="text-center text-[11px] font-medium" style={{ color: C.sage }}>{m}</div>
            ))}
          </div>
          {calendar.map((row) => (
            <div key={row.parcelle} className="grid items-center mb-1.5" style={{ gridTemplateColumns: "180px repeat(12, 1fr)" }}>
              <div className="pr-3 text-sm font-medium truncate" style={{ color: C.ink }}>
                {row.parcelle}
                <span className="block text-[11px] font-normal" style={{ color: C.sage }}>{row.ha} ha</span>
              </div>
              {row.stages.map((st, i) => (
                <div key={i} className="mx-0.5 rounded-sm" style={{ height: 22, background: stageColor[st] }} title={stageLabel[st]} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pt-4 border-t" style={{ borderColor: C.line }}>
        {Object.entries(stageLabel).map(([k, v]: any) => (
          <span key={k} className="flex items-center gap-1.5 text-xs" style={{ color: C.sage }}>
            <span className="inline-block rounded-sm" style={{ width: 11, height: 11, background: stageColor[k] }} />
            {v}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}

function WeatherCard({ className }: any) {
  return (
    <SectionCard className={className} title="Météo & capteurs IoT" subtitle="Station Zone Nord · télédétection Sentinel-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: C.goldSoft }}>
            <Sun size={26} style={{ color: C.gold }} />
          </div>
          <div>
            <p style={{ fontFamily: serif, color: C.ink }} className="text-3xl font-semibold leading-none">29°C</p>
            <p className="text-xs mt-1" style={{ color: C.sage }}>Ensoleillé, vent modéré</p>
          </div>
        </div>
        <div className="text-right text-xs" style={{ color: C.sage }}>
          <p className="flex items-center gap-1.5 justify-end"><Droplets size={13} />Humidité air 62 %</p>
          <p className="flex items-center gap-1.5 justify-end mt-1"><Wind size={13} />Vent 14 km/h</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 mt-5">
        {forecast.map((f) => (
          <div key={f.jour} className="flex flex-col items-center rounded-lg py-2.5" style={{ background: C.paper }}>
            <span className="text-[11px]" style={{ color: C.sage }}>{f.jour}</span>
            <f.Icon size={16} className="my-1.5" style={{ color: f.Icon === Sun ? C.gold : C.water }} />
            <span className="text-xs font-semibold" style={{ color: C.ink }}>{f.temp}°</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t" style={{ borderColor: C.line }}>
        {sensors.map((s) => (
          <div key={s.label} className="rounded-lg p-3" style={{ background: C.paper }}>
            <div className="flex items-center justify-between">
              <s.Icon size={14} style={{ color: C.sage }} />
              <StatusDot statut={s.statut} />
            </div>
            <p className="text-sm font-semibold mt-2" style={{ color: C.ink }}>{s.value}</p>
            <p className="text-[11px] leading-tight" style={{ color: C.sage }}>{s.label}</p>
            <p className="text-[10px] mt-0.5" style={{ color: C.sage }}>Cible {s.cible}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function YieldCard({ className }: any) {
  return (
    <SectionCard
      className={className}
      title="Prévision de rendement"
      subtitle="Prévu vs objectif par culture — modèle télédétection + historique 5 ans"
      right={<Pill tone="green"><CheckCircle2 size={12} />Fiabilité 92 %</Pill>}
    >
      <div style={{ height: 230 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yields} barGap={4} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke={C.line} />
            <XAxis dataKey="culture" tick={{ fontSize: 11, fill: C.sage }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: C.sage }} axisLine={false} tickLine={false} width={28} unit="t" />
            <Tooltip
              formatter={(v) => [`${v} t`, ""]}
              contentStyle={{ borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 12, fontFamily: sans }}
            />
            <Bar dataKey="prevu" name="Prévu" fill={C.green} radius={[4, 4, 0, 0]} maxBarSize={26} />
            <Bar dataKey="objectif" name="Objectif" fill={C.lateriteSoft} stroke={C.laterite} strokeWidth={1.5} radius={[4, 4, 0, 0]} maxBarSize={26} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: C.sage }}>
        <span className="flex items-center gap-1.5"><span style={{ width: 9, height: 9, borderRadius: 2, background: C.green }} className="inline-block" />Prévu</span>
        <span className="flex items-center gap-1.5"><span style={{ width: 9, height: 9, borderRadius: 2, background: C.lateriteSoft, border: `1.5px solid ${C.laterite}` }} className="inline-block" />Objectif</span>
      </div>
    </SectionCard>
  );
}

function NdviCard({ className }: any) {
  return (
    <SectionCard
      className={className}
      title="Vigueur végétale — NDVI"
      subtitle="Acquisition satellite Sentinel-2 · 05/09/2026"
    >
      <div className="space-y-3.5">
        {ndvi.map((row) => (
          <div key={row.parcelle} className="flex items-center gap-3">
            <span className="text-xs w-32 shrink-0 truncate" style={{ color: C.ink }}>{row.parcelle}</span>
            <div className="flex gap-1 flex-1">
              {row.zones.map((v, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: 20, background: ndviColor(v), opacity: 0.55 + v * 0.5 }} title={`NDVI ${v.toFixed(2)}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs" style={{ borderColor: C.line, color: C.sage }}>
        <span className="flex items-center gap-1.5"><span style={{ width: 9, height: 9, borderRadius: 2, background: C.alert }} className="inline-block" />Stress (&lt;0,50)</span>
        <span className="flex items-center gap-1.5"><span style={{ width: 9, height: 9, borderRadius: 2, background: C.gold }} className="inline-block" />Modéré</span>
        <span className="flex items-center gap-1.5"><span style={{ width: 9, height: 9, borderRadius: 2, background: C.green }} className="inline-block" />Vigoureux (&gt;0,68)</span>
      </div>
    </SectionCard>
  );
}

function PestCard({ className }: any) {
  return (
    <SectionCard className={className} title="Risque phytosanitaire" subtitle="Modèle prédictif — météo × historique parasitaire">
      <div className="space-y-4">
        {pests.map((p) => (
          <div key={p.nom} className="flex items-center gap-3">
            <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 34, height: 34, background: `${riskColor(p.risque)}1A` }}>
              <Bug size={16} style={{ color: riskColor(p.risque) }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium truncate" style={{ color: C.ink }}>{p.nom}</span>
                <span className="text-xs font-semibold shrink-0 ml-2" style={{ color: riskColor(p.risque) }}>{riskLabel(p.risque)}</span>
              </div>
              <p className="text-[11px] mb-1" style={{ color: C.sage }}>{p.culture}</p>
              <Bar1 pct={p.risque} color={riskColor(p.risque)} height={6} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function LaborCard({ className }: any) {
  return (
    <SectionCard className={className} title="Main-d'œuvre & chantiers" subtitle="Suivi des équipes terrain — aujourd'hui" right={<Pill tone="green"><Users size={12} />30 ouvriers mobilisés</Pill>}>
      <div className="space-y-4">
        {chantiers.map((c) => (
          <div key={c.nom}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium" style={{ color: C.ink }}>{c.nom}</span>
              <span className="text-xs" style={{ color: C.sage }}>{c.equipe} ouvriers · {c.pct}%</span>
            </div>
            <Bar1 pct={c.pct} color={c.pct === 100 ? C.green : C.water} track={C.waterSoft} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SoilCard({ className }: any) {
  return (
    <SectionCard className={className} title="Analyse pédologique" subtitle="Dernier prélèvement en laboratoire">
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: C.sage }}>
              <th className="text-left font-medium pb-2 px-1">Parcelle</th>
              <th className="text-center font-medium pb-2 px-1">pH</th>
              <th className="text-center font-medium pb-2 px-1">N</th>
              <th className="text-center font-medium pb-2 px-1">P</th>
              <th className="text-center font-medium pb-2 px-1">K</th>
              <th className="text-center font-medium pb-2 px-1">M.O.</th>
            </tr>
          </thead>
          <tbody>
            {soils.map((s, i) => (
              <tr key={s.parcelle} style={{ borderTop: `1px solid ${C.line}` }}>
                <td className="py-2 px-1 font-medium truncate" style={{ color: C.ink }}>{s.parcelle}</td>
                <td className="text-center px-1" style={{ color: C.ink }}>{s.ph}</td>
                <td className="text-center px-1"><span className="inline-flex items-center gap-1"><StatusDot statut={s.n} />{s.n}</span></td>
                <td className="text-center px-1"><span className="inline-flex items-center gap-1"><StatusDot statut={s.p} />{s.p}</span></td>
                <td className="text-center px-1"><span className="inline-flex items-center gap-1"><StatusDot statut={s.k} />{s.k}</span></td>
                <td className="text-center px-1" style={{ color: C.ink }}>{s.mo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT                                                                */
/* ------------------------------------------------------------------ */
export default function CultimaDashboard() {
  const [active, setActive] = useState("Tableau de bord");

  return (
    <div style={{ fontFamily: sans, background: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Zilla+Slab:wght@500;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div className="flex min-h-screen">
        <Sidebar active={active} setActive={setActive} />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar active={active} />
          <AlertBar />
          <main className="flex-1 px-5 lg:px-8 py-6 space-y-6">
            <Hero />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <FinanceCard className="lg:col-span-7" />
              <StockCard className="lg:col-span-5" />
            </div>

            <CulturalCalendarCard />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <WeatherCard className="lg:col-span-5" />
              <YieldCard className="lg:col-span-7" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <NdviCard className="lg:col-span-6" />
              <PestCard className="lg:col-span-6" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <LaborCard className="lg:col-span-7" />
              <SoilCard className="lg:col-span-5" />
            </div>

            <footer className="text-center text-xs pb-4" style={{ color: C.sage }}>
              Cultima ERP · Production végétale — données de démonstration, campagne 2026
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
