import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import NeuralIntro from "@/components/NeuralIntro";
import ContactModal from "@/components/ContactModal";
import NeuralCursor from "@/components/NeuralCursor";
import HackerTerminal from "@/components/HackerTerminal";
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
  title: "Metrobrain Technology | Elite Custom Software Engineering",
  description: "Architect next-gen digital ecosystems with our elite custom software engineering & Agentic AI solutions. Elevate your enterprise performance today ✓",
  keywords: ["AI Engineering", "Agentic AI", "Next.js 15", "Metrobrain", "Cloud Architecture", "Cybersecurity", "Custom Software"],
  openGraph: {
    title: "Metrobrain Technology | Elite Custom Software Engineering",
    description: "Architect next-gen digital ecosystems with our elite custom software engineering & Agentic AI solutions. Elevate your enterprise performance today ✓",
    url: "https://metrobrain.tech",
    siteName: "Metrobrain Technology",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metrobrain Technology | Elite Custom Software Engineering",
    description: "Architect next-gen digital ecosystems with our elite custom software engineering & Agentic AI solutions. Elevate your enterprise performance today ✓",
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
        <NeuralCursor />
        <NeuralIntro />
        <HackerTerminal />
        <Navbar />
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
