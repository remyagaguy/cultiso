"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Alert, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const onFinish = async (values: any) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    const { email, password } = values;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      if (data.session) {
        message.success("Inscription réussie !");
        router.push("/dashboard");
        router.refresh();
      } else {
        setSuccessMsg("Vérifiez votre boîte e-mail pour confirmer votre inscription.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-[#DEF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-2xl rounded-2xl border-0 overflow-hidden" styles={{ body: { padding: '40px 32px' } }}>
          <div className="text-center mb-8">
            <Title level={2} className="!mb-2 !text-[#052821] !font-unbounded">
              Rejoindre Cultiso
            </Title>
            <Text className="text-gray-500 text-base">
              Créez votre compte pour démarrer.
            </Text>
          </div>

          {errorMsg && (
            <Alert message={errorMsg} type="error" showIcon className="mb-6 rounded-lg" />
          )}
          {successMsg && (
            <Alert message={successMsg} type="success" showIcon className="mb-6 rounded-lg" />
          )}

          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Veuillez renseigner votre email' }, { type: 'email', message: 'Email invalide' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Adresse email" 
                className="rounded-lg h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Veuillez renseigner votre mot de passe' },
                { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Mot de passe"
                className="rounded-lg h-12"
              />
            </Form.Item>

            <Form.Item className="mb-0 mt-6">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full h-12 text-[16px] font-bold tracking-wide shadow-md"
                loading={loading}
              >
                S'inscrire
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8 text-center text-gray-500 text-sm">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="text-[#D35400] hover:text-[#E67E22] font-semibold transition-colors">
              Se connecter
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
