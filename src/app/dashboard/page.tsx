"use client";

import React from "react";
import { Typography, Row, Col, Card, Button } from "antd";
import { 
  LineChartOutlined, 
  ShopOutlined, 
  RobotOutlined, 
  UserOutlined 
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function DashboardPage() {
  const tools = [
    {
      title: "Cultiplan",
      description: "Business plan & étude de marché agricole",
      icon: <LineChartOutlined className="text-4xl text-[#D35400] mb-4" />,
      color: "bg-white",
      href: "/cultiplan",
      actionText: "Ouvrir Cultiplan"
    },
    {
      title: "Cultisia",
      description: "Conseils de production pilotés par l'IA",
      icon: <RobotOutlined className="text-4xl text-[#052821] mb-4" />,
      color: "bg-[#DEF7F2]",
      href: "#",
      actionText: "Bientôt disponible",
      disabled: true
    },
    {
      title: "Cultishop",
      description: "Place de marché intrants et matériels",
      icon: <ShopOutlined className="text-4xl text-[#052821] mb-4" />,
      color: "bg-[#DEF7F2]",
      href: "#",
      actionText: "Bientôt disponible",
      disabled: true
    },
    {
      title: "Cultiseil",
      description: "Réseau d'experts et vulgarisation",
      icon: <UserOutlined className="text-4xl text-[#052821] mb-4" />,
      color: "bg-[#DEF7F2]",
      href: "#",
      actionText: "Bientôt disponible",
      disabled: true
    }
  ];

  return (
    <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Title level={2} className="!text-[#052821] !font-unbounded !mb-2">
            Tableau de bord
          </Title>
          <Text className="text-gray-600 text-lg">
            Bienvenue sur votre espace personnel. Retrouvez tous vos outils Cultiso ici.
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {tools.map((tool, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card 
                className={`h-full shadow-sm hover:shadow-md transition-shadow border-0 rounded-2xl ${tool.color}`}
                styles={{ body: { padding: '32px 24px', display: 'flex', flexDirection: 'column', height: '100%' } }}
              >
                <div>
                  {tool.icon}
                  <Title level={4} className="!mb-2 !font-unbounded">
                    {tool.title}
                  </Title>
                  <Paragraph className="text-gray-600 mb-6">
                    {tool.description}
                  </Paragraph>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    type={tool.disabled ? "default" : "primary"}
                    className={`w-full h-10 font-semibold rounded-lg ${!tool.disabled && "shadow-sm"}`}
                    disabled={tool.disabled}
                    href={tool.disabled ? undefined : tool.href}
                  >
                    {tool.actionText}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
