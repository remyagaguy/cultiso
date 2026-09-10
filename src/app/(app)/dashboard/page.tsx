"use client";

import React from "react";
import Link from "next/link";
import { Button, Progress, Tag } from "antd";
import {
  ArrowUpOutlined,
  CloudOutlined,
  PlusOutlined,
  RightOutlined,
  RobotOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  ShopOutlined,
} from "@ant-design/icons";

/* ═══════════════════════════════════════════════════════════
   DASHBOARD — Centre de Commandement Cultiso
   ═══════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  return (
    <div className="p-5 sm:p-6 lg:p-8 space-y-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-unbounded font-bold text-[#0f1f1b] text-xl sm:text-2xl mb-1">
            Bonjour Rémy 👋
          </h1>
          <p className="text-gray-500 text-sm m-0">
            Voici l'état de vos opérations sur{" "}
            <strong className="text-gray-700">Ferme Espoir</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button className="rounded-lg h-9 border-gray-200 text-gray-600 text-sm font-medium">
            Générer un rapport
          </Button>
          <Link href="/cultiplan">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-lg h-9 text-sm font-medium shadow-none bg-[#22c55e] hover:bg-[#16a34a] border-none"
            >
              Nouveau Projet
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── KPI Widgets (4 cards) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Météo */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
              <CloudOutlined />
            </div>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Kpalimé
            </span>
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 m-0">
            Météo locale
          </p>
          <p className="text-2xl font-bold text-[#0f1f1b] font-unbounded mb-1 m-0">
            28°C
          </p>
          <p className="text-xs text-gray-400 mb-3 m-0">
            Partiellement nuageux
          </p>
          <p className="text-[11px] text-blue-600 font-medium bg-blue-50/70 px-2.5 py-1.5 rounded-lg m-0 leading-snug">
            Idéal pour l'irrigation ce soir.
          </p>
        </div>

        {/* Cours du Maïs */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-[#D35400]">
              <LineChartOutlined />
            </div>
            <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <ArrowUpOutlined className="mr-0.5" />
              2.4%
            </span>
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 m-0">
            Cours du Maïs
          </p>
          <p className="m-0 mb-1">
            <span className="text-2xl font-bold text-[#0f1f1b] font-unbounded">
              210
            </span>
            <span className="text-sm text-gray-400 font-medium ml-1.5">
              FCFA/kg
            </span>
          </p>
          <p className="text-xs text-gray-400 mb-3 m-0">
            Marché local de Kpalimé
          </p>
          <p className="text-[11px] text-gray-500 font-medium m-0">
            Tendance haussière sur 7 jours.
          </p>
        </div>

        {/* Tâches Cultima */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-[#22c55e]">
              <ThunderboltOutlined />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Cultima
            </span>
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 m-0">
            Tâches en attente
          </p>
          <p className="m-0 mb-4">
            <span className="text-2xl font-bold text-[#0f1f1b] font-unbounded">
              5
            </span>
            <span className="text-sm text-gray-400 ml-1.5">urgentes</span>
          </p>
          <Progress
            percent={60}
            strokeColor="#22c55e"
            trailColor="#f1f5f9"
            showInfo={false}
            size="small"
          />
        </div>

        {/* Santé IA */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <RobotOutlined />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Cultisia
            </span>
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 m-0">
            Santé IA
          </p>
          <p className="m-0 mb-1">
            <span className="text-2xl font-bold text-[#0f1f1b] font-unbounded">
              98%
            </span>
            <span className="text-sm text-gray-400 ml-1.5">Optimal</span>
          </p>
          <p className="text-xs text-gray-400 mb-3 m-0">Analyse Satellite</p>
          <p className="text-[11px] text-purple-600 font-medium bg-purple-50/70 px-2.5 py-1.5 rounded-lg m-0 leading-snug">
            Aucune anomalie détectée.
          </p>
        </div>
      </div>

      {/* ─── Main grid: 2 columns ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── LEFT: 2/3 width ─── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cultisia Quick Chat */}
          <div className="bg-gradient-to-br from-[#052821] to-[#0a3f34] rounded-xl p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.04] pointer-events-none hidden sm:block">
              <RobotOutlined style={{ fontSize: 100 }} />
            </div>
            <div className="relative z-10 max-w-xl">
              <h3 className="font-unbounded font-bold text-white text-base sm:text-lg mb-2 m-0">
                Un doute agronomique ? Demandez à Cultisia.
              </h3>
              <p className="text-white/60 text-sm mb-5 m-0">
                L'IA experte analyse vos données et vous répond instantanément.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 bg-white/10 p-2 rounded-xl border border-white/15">
                <input
                  type="text"
                  placeholder="Ex: Quand appliquer l'engrais NPK sur mon maïs ?"
                  className="flex-1 bg-transparent border-none text-white placeholder-white/40 px-3 py-2 focus:outline-none text-sm"
                />
                <Button
                  type="primary"
                  className="bg-[#D35400] hover:bg-[#E67E22] border-none rounded-lg font-medium px-5 h-9 w-full sm:w-auto"
                >
                  Analyser
                </Button>
              </div>
            </div>
          </div>

          {/* Cultiplan Projects */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-unbounded font-bold text-[#0f1f1b] text-sm m-0">
                Mes Business Plans (Cultiplan)
              </h3>
              <Link
                href="/cultiplan"
                className="text-[#22c55e] hover:text-[#16a34a] text-sm font-medium flex items-center gap-1 no-underline"
              >
                Voir tout <RightOutlined className="text-[10px]" />
              </Link>
            </div>

            <div className="divide-y divide-gray-50">
              {[
                {
                  name: "Projet Extension Maïs 2026",
                  type: "Cultures vivrières",
                  date: "Aujourd'hui, 10:45",
                  status: "Terminé",
                  progress: 100,
                },
                {
                  name: "Ferme Avicole Horizon",
                  type: "Élevage",
                  date: "Hier, 14:20",
                  status: "En cours",
                  progress: 65,
                },
                {
                  name: "Secteur Maraîchage Bio",
                  type: "Maraîchage",
                  date: "05 Sept 2026",
                  status: "Brouillon",
                  progress: 30,
                },
              ].map((project, i) => (
                <div
                  key={i}
                  className="flex items-center px-5 py-3.5 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-50 text-[#22c55e] flex items-center justify-center mr-3 group-hover:bg-[#22c55e] group-hover:text-white transition-colors shrink-0">
                    <LineChartOutlined className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-semibold text-gray-800 truncate m-0 mb-0.5">
                      {project.name}
                    </p>
                    <p className="text-xs text-gray-400 m-0 truncate">
                      {project.type}
                      <span className="mx-1.5 opacity-50">·</span>
                      {project.date}
                    </p>
                  </div>
                  <div className="w-20 hidden md:block mr-4 shrink-0">
                    <Progress
                      percent={project.progress}
                      size="small"
                      showInfo={false}
                      strokeColor={
                        project.progress === 100 ? "#22c55e" : "#D35400"
                      }
                      trailColor="#f1f5f9"
                    />
                  </div>
                  <Tag
                    bordered={false}
                    color={
                      project.progress === 100
                        ? "success"
                        : project.progress > 50
                          ? "processing"
                          : "default"
                    }
                    className="rounded-md text-xs font-medium m-0 shrink-0"
                  >
                    {project.status}
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: 1/3 width ─── */}
        <div className="space-y-6">
          {/* Opérations urgentes (Cultima) */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-unbounded font-bold text-[#0f1f1b] text-sm m-0">
                Opérations urgentes
              </h3>
              <p className="text-xs text-gray-400 m-0 mt-0.5">Cultima</p>
            </div>
            <div className="p-5 space-y-4">
              {[
                {
                  task: "Vaccination Volaille Lot A",
                  desc: "Vaccin Newcastle",
                  time: "Aujourd'hui, 14:00",
                  urgent: true,
                },
                {
                  task: "Irrigation Bloc Maïs",
                  desc: "Secteur Nord",
                  time: "Aujourd'hui, 17:30",
                  urgent: false,
                },
                {
                  task: "Achat Semences Soja",
                  desc: "Fournisseur AgriStore",
                  time: "Demain",
                  urgent: false,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className={`mt-0.5 shrink-0 ${item.urgent ? "text-red-500" : "text-gray-300"}`}
                  >
                    {item.urgent ? <WarningOutlined /> : <ClockCircleOutlined />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 m-0 mb-0.5 truncate">
                      {item.task}
                    </p>
                    <p className="text-xs text-gray-400 m-0 mb-1.5">
                      {item.desc}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${item.urgent ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"}`}
                    >
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
              <Button
                type="dashed"
                block
                className="rounded-lg text-gray-400 text-xs font-medium mt-1"
              >
                Voir le calendrier complet
              </Button>
            </div>
          </div>

          {/* Insight IA */}
          <div className="bg-gradient-to-br from-[#f8f9fc] to-[#f1f3f9] rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <RobotOutlined className="text-purple-500 text-sm" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Insight IA
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4 m-0">
              "L'historique météo indique un risque de sécheresse léger le mois
              prochain. Pensez à sécuriser vos réserves d'eau dès cette
              semaine."
            </p>
            <Link
              href="/cultisia"
              className="text-purple-600 hover:text-purple-700 text-sm font-bold flex items-center gap-1 transition-colors no-underline"
            >
              Approfondir avec Cultisia{" "}
              <RightOutlined className="text-[10px]" />
            </Link>
          </div>

          {/* Teasing Cultishop */}
          <div className="bg-[#f3fbe9] rounded-xl border border-[#22c55e]/15 p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#22c55e]/10 rounded-full blur-2xl pointer-events-none" />
            <ShopOutlined className="text-xl text-[#22c55e] mb-3 block" />
            <h4 className="font-unbounded font-bold text-[#052821] text-sm mb-1.5 m-0">
              Préparez la saison
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-4 m-0">
              Cultishop arrive bientôt ! Commandez directement vos intrants et
              matériels agricoles au meilleur prix.
            </p>
            <Tag
              color="green"
              className="border-[#22c55e]/30 bg-white text-[#22c55e] font-bold rounded-md py-0.5 px-2.5 m-0 text-xs"
            >
              Bientôt disponible
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
}
