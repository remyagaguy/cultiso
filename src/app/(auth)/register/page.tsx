"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Alert, Result } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const supabase = createClient();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    setErrorMsg("");
    
    const { email, nom, projet } = values;
    
    // Insertion dans la table waitlist
    const { error } = await supabase.from('waitlist').insert([
      { 
        email: email, 
        full_name: nom, 
        project_description: projet 
      }
    ]);

    if (error) {
      if (error.code === '23505') {
        setErrorMsg("Cette adresse email est déjà sur la liste d'attente.");
      } else {
        setErrorMsg("Une erreur est survenue lors de l'envoi. Réessayez plus tard.");
      }
      setLoading(false);
    } else {
      setIsSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-[#fcfcfc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-[rgba(5,40,33,0.06)] overflow-hidden" styles={{ body: { padding: '40px 32px' } }}>
          
          {isSubmitted ? (
            <Result
              status="success"
              title={<span className="font-unbounded text-[#052821]">Demande envoyée !</span>}
              subTitle={<span className="font-manrope text-gray-500">Merci pour votre intérêt. Cultiso est actuellement en Beta privée. Notre équipe examinera votre profil et vous enverra une invitation très prochainement.</span>}
              extra={[
                <Link href="/" key="home">
                  <Button type="primary" size="large" className="w-full font-bold shadow-sm rounded-lg">
                    Retour à l'accueil
                  </Button>
                </Link>
              ]}
            />
          ) : (
            <>
              <div className="text-center mb-8">
                <Title level={2} className="!mb-2 !text-[#052821] !font-unbounded">
                  Accès Anticipé
                </Title>
                <Text className="text-gray-500 text-base">
                  Cultiso est en Beta privée. Inscrivez-vous sur la liste d'attente.
                </Text>
              </div>

              {errorMsg && (
                <Alert message={errorMsg} type="error" showIcon className="mb-6 rounded-lg" />
              )}

              <Form
                form={form}
                name="waitlist"
                layout="vertical"
                onFinish={onFinish}
                size="large"
                requiredMark={false}
              >
                <Form.Item
                  label={<span className="font-semibold text-gray-700">Nom complet</span>}
                  name="nom"
                  rules={[{ required: true, message: 'Veuillez renseigner votre nom' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />} 
                    placeholder="Ex: Jean Dupont" 
                    className="rounded-lg py-2"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-semibold text-gray-700">Adresse e-mail</span>}
                  name="email"
                  rules={[{ required: true, message: 'Veuillez renseigner votre email' }, { type: 'email', message: 'Email invalide' }]}
                >
                  <Input 
                    prefix={<MailOutlined className="text-gray-400" />} 
                    placeholder="jean@agrobusiness.com" 
                    className="rounded-lg py-2"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-semibold text-gray-700">Parlez-nous de votre projet (Optionnel)</span>}
                  name="projet"
                >
                  <TextArea 
                    placeholder="Ex: Je lance une exploitation de maïs sur 5 hectares..." 
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item className="mb-0 mt-8">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="w-full py-3 text-[16px] font-bold tracking-wide shadow-md rounded-lg"
                    loading={loading}
                  >
                    Rejoindre la liste d'attente
                  </Button>
                </Form.Item>
              </Form>

              <div className="mt-8 text-center text-gray-500 text-sm">
                Vous avez déjà reçu une invitation ?{' '}
                <Link href="/login" className="text-[#D35400] hover:text-[#E67E22] font-semibold transition-colors">
                  Se connecter
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

