import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Cultiso - Intelligence Agrobusiness",
  description: "Plateforme d'Intelligence Agrobusiness pour la conquête de la souveraineté alimentaire africaine.",
  openGraph: {
    images: ['/hero-bg.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${caveat.variable} h-full antialiased bg-[#ffffff]`}
    >
      <body className="min-h-full flex flex-col font-plus-jakarta m-0 p-0 bg-[#ffffff] text-[#052821] selection:bg-[#f3fbe9] selection:text-[#052821]">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#D35400',
                colorInfo: '#D35400',
                colorBgBase: '#ffffff',
                colorBgContainer: '#ffffff', 
                fontFamily: 'var(--font-plus-jakarta)',
                colorError: '#EF4444',
                colorTextBase: '#052821',
              },
              components: {
                Typography: {
                  fontFamily: 'var(--font-plus-jakarta)',
                },
                Button: {
                  colorPrimary: '#D35400',
                  colorPrimaryHover: '#E67E22',
                  borderRadius: 8,
                },
                Input: {
                  borderRadius: 8,
                  colorBorder: 'rgba(5, 40, 33, 0.2)',
                  colorBgContainer: '#fcfcfc',
                },
                Select: {
                  borderRadius: 8,
                  colorBorder: 'rgba(5, 40, 33, 0.2)',
                  colorBgContainer: '#fcfcfc',
                },
                Card: {
                  borderRadiusLG: 12,
                  colorBorderSecondary: 'rgba(5, 40, 33, 0.08)',
                },
                Table: {
                  borderRadius: 9,
                  colorBorderSecondary: 'rgba(5, 40, 33, 0.08)',
                }
              }
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
