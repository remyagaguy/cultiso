"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Alert, message, ConfigProvider, theme } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const onFinish = async (values: any) => {
    setLoading(true);
    setErrorMsg("");
    
    const { email, password } = values;
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      message.success("Connexion réussie !");
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#D35400',
          colorBgContainer: 'rgba(255, 255, 255, 0.05)',
          colorBorder: 'rgba(255, 255, 255, 0.1)',
          colorText: '#ffffff',
          colorTextPlaceholder: 'rgba(255, 255, 255, 0.4)',
          controlHeight: 48,
          borderRadius: 8,
          fontFamily: 'var(--font-manrope)',
        },
      }}
    >
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-[#052821] overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#052821] via-[#052821]/95 to-[#052821]/80 z-10"></div>
          <img 
            src="/hero-bg.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover object-center opacity-30" 
          />
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22c55e]/20 rounded-full blur-[100px] pointer-events-none z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D35400]/20 rounded-full blur-[100px] pointer-events-none z-10"></div>

        <div className="max-w-md w-full space-y-8 relative z-20">
          <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl border border-white/10 overflow-hidden p-8 sm:p-10">
            <div className="text-center mb-8">
              <Title level={2} className="!mb-2 !text-white !font-unbounded !font-bold">
                Bon retour
              </Title>
              <Text className="text-white/70 text-base">
                Connectez-vous pour accéder à vos outils.
              </Text>
            </div>

            {errorMsg && (
              <Alert message={errorMsg} type="error" showIcon className="mb-6 rounded-lg bg-red-500/10 border-red-500/20 text-red-200" />
            )}

            <Form
              name="login"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Veuillez renseigner votre email' }, { type: 'email', message: 'Email invalide' }]}
              >
                <Input 
                  prefix={<UserOutlined className="text-white/40" />} 
                  placeholder="Adresse email" 
                  className="rounded-lg bg-white/5 border-white/10 hover:border-[#D35400] focus:border-[#D35400] transition-colors"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Veuillez renseigner votre mot de passe' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-white/40" />}
                  placeholder="Mot de passe"
                  className="rounded-lg bg-white/5 border-white/10 hover:border-[#D35400] focus:border-[#D35400] transition-colors"
                />
              </Form.Item>

              <div className="flex items-center justify-end mb-6 mt-[-10px]">
                <a href="#" className="text-[#D35400] hover:text-[#E67E22] text-sm font-semibold transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>

              <Form.Item className="mb-0">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="w-full h-12 text-[15.5px] font-semibold bg-[#D35400] hover:bg-[#E67E22] border-none shadow-[0_0_20px_rgba(211,84,0,0.3)] hover:shadow-[0_0_30px_rgba(211,84,0,0.5)] transition-all duration-300 active:scale-[0.98] rounded-xl text-white"
                  loading={loading}
                >
                  Se connecter
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-8 text-center text-white/60 text-sm">
              Vous n'avez pas de compte ?{' '}
              <Link href="/register" className="text-[#D35400] hover:text-[#E67E22] font-semibold transition-colors">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
