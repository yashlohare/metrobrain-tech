import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import NeuralIntro from "@/components/NeuralIntro";
import ContactModal from "@/components/ContactModal";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Metrobrain Technology | AI Software Foundry",
  description: "Elite intelligence & software foundry engineering next-gen digital ecosystems through advanced R&D.",
  keywords: ["AI Engineering", "Web3", "Next.js 15", "Metrobrain", "Software Foundry", "Cybersecurity"],
  openGraph: {
    title: "Metrobrain Technology | AI Software Foundry",
    description: "Elite intelligence & software foundry engineering next-gen digital ecosystems.",
    url: "https://metrobrain.tech",
    siteName: "Metrobrain Technology",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metrobrain Technology | AI Software Foundry",
    description: "Elite intelligence & software foundry engineering next-gen digital ecosystems.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased bg-[#020617]`}
      suppressHydrationWarning
    >
      <meta name="theme-color" content="#020617" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <body className="min-h-full flex flex-col font-body bg-[#020617] text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden" suppressHydrationWarning>
        <NeuralIntro />
        <Navbar />
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
