import type { Metadata } from "next";
import { Unbounded, Manrope, Caveat } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Cultiso - Intelligence Agrobusiness",
  description: "Plateforme d'Intelligence Agrobusiness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${unbounded.variable} ${manrope.variable} ${caveat.variable} h-full antialiased bg-[#ffffff]`}
    >
      <body className="min-h-full flex flex-col font-manrope m-0 p-0 bg-[#ffffff] text-[#052821] selection:bg-[#f3fbe9] selection:text-[#052821]">
        <div dangerouslySetInnerHTML={{ __html: `<!--
THESIS: Botanical greenhouse on warm parchment x Cultiso identity. A calm, editorial workspace.
OWN-WORLD: Bright white canvas, warm parchment surfaces, very dark green text (Forest Ink), and vibrant brand accents (Orange LatÃ©rite).
STORY: Users feel a calm, structured, and premium editorial environment while exploring agricultural market data.
FIRST VIEWPORT: A clean minimal header, a parchment announcement pill, tight typography, and subtle hairline borders.
FORM: The Botanical Greenhouse.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->` }} />
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#D35400', // Orange Cultiso
                colorInfo: '#D35400',
                colorBgBase: '#ffffff', // Blanc pur
                colorBgContainer: '#ffffff', 
                fontFamily: 'var(--font-manrope)',
                colorError: '#EF4444',
                colorTextBase: '#052821', // Forest Ink
              },
              components: {
                Typography: {
                  fontFamily: 'var(--font-unbounded)',
                },
                Button: {
                  colorPrimary: '#D35400',
                  colorPrimaryHover: '#E67E22',
                  colorPrimaryActive: '#A04000',
                  borderRadius: 6, 
                },
                Card: {
                  borderRadius: 9,
                  colorBorderSecondary: 'rgba(5, 40, 33, 0.08)', // Hairline border
                },
                Table: {
                  borderRadius: 9,
                  colorBorderSecondary: 'rgba(5, 40, 33, 0.08)',
                }
              }
            }}
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow flex flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
