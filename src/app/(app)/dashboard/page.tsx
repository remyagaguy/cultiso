"use client";

import React from 'react';
import { Typography, Row, Col, Card, Avatar, Button, Progress, Tag } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  CloudOutlined,
  PlusOutlined,
  RightOutlined,
  RobotOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  ShopOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <Title level={2} className="!mb-1 !font-unbounded !text-gray-900 !text-2xl">
            Bonjour Rémy 👋
          </Title>
          <Text className="text-gray-500 text-sm">
            Voici l'état de vos opérations aujourd'hui sur <strong className="text-gray-700">Ferme Espoir</strong>.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button className="rounded-lg h-10 border-gray-200 text-gray-600 font-medium">
            Générer un rapport
          </Button>
          <Link href="/cultiplan">
            <Button type="primary" icon={<PlusOutlined />} className="rounded-lg h-10 font-medium shadow-sm bg-[#22c55e] hover:bg-[#16a34a] border-none">
              Nouveau Projet
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Widgets Row */}
      <Row gutter={[20, 20]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 h-full rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow" styles={{ body: { padding: '20px' } }}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <CloudOutlined className="text-lg" />
              </div>
              <Tag color="blue" className="rounded-full font-medium border-0 bg-blue-50 text-blue-600 m-0">Kpalimé</Tag>
            </div>
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Météo Locale</Text>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900 font-unbounded">28°C</span>
            </div>
            <Text className="text-xs text-gray-400 block mb-3">Partiellement nuageux</Text>
            <Text className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md block leading-snug">
              Idéal pour l'irrigation ce soir.
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 h-full rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow" styles={{ body: { padding: '20px' } }}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#D35400]">
                <LineChartOutlined className="text-lg" />
              </div>
              <Tag color="green" className="rounded-full font-medium border-0 m-0"><ArrowUpOutlined /> 2.4%</Tag>
            </div>
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Cours du Maïs</Text>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900 font-unbounded">210</span>
              <Text className="text-gray-400 font-medium">FCFA/kg</Text>
            </div>
            <Text className="text-xs text-gray-400 block mb-3">Marché local de Kpalimé</Text>
            <Text className="text-xs text-gray-500 font-medium block">Tendance haussière sur 7 jours.</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 h-full rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow" styles={{ body: { padding: '20px' } }}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#22c55e]">
                <ThunderboltOutlined className="text-lg" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cultima</span>
            </div>
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Tâches en attente</Text>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-900 font-unbounded">5</span>
              <Text className="text-gray-400 text-sm">urgentes</Text>
            </div>
            <Progress percent={60} strokeColor="#22c55e" trailColor="#f1f5f9" showInfo={false} size="small" className="m-0" />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 h-full rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow" styles={{ body: { padding: '20px' } }}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <RobotOutlined className="text-lg" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cultisia</span>
            </div>
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Santé IA</Text>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900 font-unbounded">98%</span>
              <Text className="text-gray-400 text-sm">Optimal</Text>
            </div>
            <Text className="text-xs text-gray-400 block mb-2">Analyse Satellite</Text>
            <Text className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-md block leading-snug">
              Aucune anomalie détectée.
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={[24, 24]}>
        
        {/* Left Column (Actions & Tracking) */}
        <Col xs={24} lg={16} className="space-y-6">
          
          {/* Quick Chat Cultisia */}
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 rounded-2xl overflow-hidden" styles={{ body: { padding: 0 } }}>
            <div className="bg-gradient-to-r from-[#052821] to-[#0a3f34] p-6 sm:p-8 text-white relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden sm:block">
                <RobotOutlined style={{ fontSize: '120px' }} />
              </div>
              <div className="relative z-10 max-w-2xl">
                <Title level={4} className="!text-white !mb-2 !font-unbounded">Un doute agronomique ? Demandez à Cultisia.</Title>
                <Text className="text-white/70 block mb-6 text-sm">L'IA experte analyse vos données et vous répond instantanément.</Text>
                <div className="flex flex-col sm:flex-row gap-3 bg-white/10 p-2 rounded-xl border border-white/20 backdrop-blur-md">
                  <input 
                    type="text" 
                    placeholder="Ex: Quand appliquer l'engrais NPK sur mon maïs ?" 
                    className="flex-1 bg-transparent border-none text-white placeholder-white/50 px-4 py-2 focus:outline-none text-sm"
                  />
                  <Button type="primary" className="bg-[#D35400] hover:bg-[#E67E22] border-none rounded-lg font-medium px-6 h-10 w-full sm:w-auto shadow-lg shadow-[#D35400]/30">
                    Analyser
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Cultiplan Projects */}
          <Card 
            title={<span className="font-unbounded font-bold text-gray-800 text-base">Mes Business Plans (Cultiplan)</span>} 
            extra={<Link href="/cultiplan" className="text-[#22c55e] hover:text-[#16a34a] font-medium text-sm flex items-center gap-1">Voir tout <RightOutlined className="text-xs" /></Link>}
            className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 rounded-2xl"
            styles={{ header: { borderBottomColor: '#f3f4f6', padding: '16px 24px' }, body: { padding: '0' } }}
          >
            <div className="divide-y divide-gray-50">
              {[
                { name: 'Projet Extension Maïs 2026', type: 'Cultures vivrières', date: 'Aujourd\'hui, 10:45', status: 'Terminé', progress: 100 },
                { name: 'Ferme Avicole Horizon', type: 'Élevage', date: 'Hier, 14:20', status: 'En cours', progress: 65 },
                { name: 'Secteur Maraîchage Bio', type: 'Maraîchage', date: '05 Sept 2026', status: 'Brouillon', progress: 30 },
              ].map((project, i) => (
                <div key={i} className="p-4 px-6 flex items-center hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-[#22c55e] flex items-center justify-center mr-4 group-hover:bg-[#22c55e] group-hover:text-white transition-colors">
                    <LineChartOutlined />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{project.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span>{project.type}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
                      <span className="hidden sm:block">{project.date}</span>
                    </div>
                  </div>
                  <div className="w-24 lg:w-32 hidden md:block mr-6">
                    <Progress percent={project.progress} size="small" showInfo={false} strokeColor={project.progress === 100 ? '#22c55e' : '#D35400'} trailColor="#f1f5f9" />
                  </div>
                  <div>
                    <Tag bordered={false} color={project.progress === 100 ? 'success' : project.progress > 50 ? 'processing' : 'default'} className="rounded-md font-medium m-0">
                      {project.status}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Right Column (Insights & Upcoming) */}
        <Col xs={24} lg={8} className="space-y-6">
          
          {/* Cultima Tasks */}
          <Card 
            title={<span className="font-unbounded font-bold text-gray-800 text-base">Opérations urgentes (Cultima)</span>}
            className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 rounded-2xl"
            styles={{ header: { borderBottomColor: '#f3f4f6', padding: '16px 20px' }, body: { padding: '20px' } }}
          >
            <div className="space-y-5">
              {[
                { task: 'Vaccination Volaille Lot A', desc: 'Vaccin Newcastle', time: 'Aujourd\'hui, 14:00', type: 'warning', icon: <WarningOutlined /> },
                { task: 'Irrigation Bloc Maïs', desc: 'Secteur Nord', time: 'Aujourd\'hui, 17:30', type: 'clock', icon: <ClockCircleOutlined /> },
                { task: 'Achat Semences Soja', desc: 'Fournisseur AgriStore', time: 'Demain', type: 'pending', icon: <ClockCircleOutlined /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`mt-0.5 ${item.type === 'warning' ? 'text-red-500' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">{item.task}</h4>
                    <p className="text-xs text-gray-500 mb-2">{item.desc}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${item.type === 'warning' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
              <Button type="dashed" block className="rounded-lg mt-2 text-gray-500 font-medium">
                Voir le calendrier complet
              </Button>
            </div>
          </Card>

          {/* Insights AI */}
          <Card 
            className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]"
            styles={{ body: { padding: '20px' } }}
          >
            <div className="flex items-center gap-2 mb-3">
              <RobotOutlined className="text-purple-600" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Insight IA</span>
            </div>
            <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4">
              "L'historique météo indique un risque de sécheresse léger le mois prochain. Pensez à sécuriser vos réserves d'eau dès cette semaine."
            </p>
            <Link href="/cultisia">
              <span className="text-purple-600 hover:text-purple-700 text-sm font-bold flex items-center gap-1 transition-colors cursor-pointer">
                Approfondir avec Cultisia <RightOutlined className="text-xs" />
              </span>
            </Link>
          </Card>

          {/* Teasing Marketplace */}
          <Card 
            className="shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-[#22c55e]/20 rounded-2xl bg-[#f3fbe9] overflow-hidden relative"
            styles={{ body: { padding: '24px 20px' } }}
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#22c55e]/10 rounded-full blur-2xl pointer-events-none"></div>
            <ShopOutlined className="text-2xl text-[#22c55e] mb-3" />
            <Title level={5} className="!font-unbounded !text-[#052821] !mb-2">Préparez la saison</Title>
            <Paragraph className="text-xs text-gray-600 mb-4 leading-relaxed">
              Cultishop arrive bientôt ! Commandez directement vos intrants et matériels agricoles au meilleur prix.
            </Paragraph>
            <Tag color="green" className="border-[#22c55e]/30 bg-white text-[#22c55e] font-bold rounded-md py-1 px-3 m-0">Bientôt disponible</Tag>
          </Card>

        </Col>
      </Row>
    </div>
  );
}
