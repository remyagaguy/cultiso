"use client";

import React, { useState } from "react";
import { Form, Input, Alert, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fcfcfc]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-[#f3fbe9] rounded-xl flex items-center justify-center shadow-sm border border-[#22c55e]/20">
            <img src="/favicon.png" alt="Cultiso" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-[28px] font-bold font-unbounded text-[#052821] tracking-tight">
          Bon retour
        </h2>
        <p className="mt-2 text-center text-[15px] text-gray-500 font-manrope">
          Connectez-vous pour accéder à vos outils.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {errorMsg && (
            <Alert 
              message={errorMsg} 
              type="error" 
              showIcon 
              className="mb-6 rounded-xl border-red-200 bg-red-50 text-red-600 font-medium" 
            />
          )}

          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            requiredMark={false}
          >
            <Form.Item
              label={<span className="text-gray-700 font-semibold text-sm">Adresse email</span>}
              name="email"
              rules={[{ required: true, message: 'Veuillez renseigner votre email' }, { type: 'email', message: 'Email invalide' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400 mr-1" />} 
                placeholder="vous@exemple.com" 
                className="rounded-xl px-4 py-3 bg-gray-50/50 hover:bg-white focus:bg-white border-gray-200 hover:border-[#22c55e] focus:border-[#22c55e] transition-colors"
              />
            </Form.Item>

            <Form.Item
              label={
                <div className="flex justify-between w-full items-center">
                  <span className="text-gray-700 font-semibold text-sm">Mot de passe</span>
                  <a href="#" className="text-sm font-semibold text-[#22c55e] hover:text-[#16a34a] transition-colors">
                    Oublié ?
                  </a>
                </div>
              }
              name="password"
              rules={[{ required: true, message: 'Veuillez renseigner votre mot de passe' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-1" />}
                placeholder="Votre mot de passe"
                className="rounded-xl px-4 py-3 bg-gray-50/50 hover:bg-white focus:bg-white border-gray-200 hover:border-[#22c55e] focus:border-[#22c55e] transition-colors"
              />
            </Form.Item>

            <Form.Item className="mt-8 mb-0">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center items-center h-[54px] text-[15.5px] font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : null}
                Se connecter
              </button>
            </Form.Item>
          </Form>

          <div className="mt-8 text-center text-sm text-gray-500 font-medium">
            Vous n'avez pas encore d'accès ?{' '}
            <Link href="/register" className="font-semibold text-[#052821] hover:text-[#22c55e] transition-colors">
              Rejoindre la liste d'attente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
