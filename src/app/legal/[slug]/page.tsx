import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedLayout from "@/components/AnimatedLayout";

const legalContent = {
  "terms-of-service": {
    title: "Terms of Service",
    content: [
      "1. Introduction: These terms and conditions govern your use of our website and services. By using our website, you accept these terms in full.",
      "2. Intellectual Property: Unless otherwise stated, we own the intellectual property rights in the website and material on the website.",
      "3. Acceptable Use: You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.",
      "4. Limitations of Liability: Metrobrain Technologies will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website."
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: [
      "1. Information Collection: We may collect, store, and use personal data that you provide to us when registering or inquiring about our services.",
      "2. Data Usage: Personal data submitted to us will be used for the purposes specified in this policy or on the relevant pages of the website.",
      "3. Security: We will take reasonable technical and organizational precautions to prevent the loss, misuse, or alteration of your personal information.",
      "4. Your Rights: You may instruct us to provide you with any personal information we hold about you, subject to certain conditions."
    ]
  },
  "cookies": {
    title: "Cookie Policy",
    content: [
      "1. What are cookies: A cookie is a file containing an identifier that is sent by a web server to a web browser and is stored by the browser.",
      "2. How we use cookies: We use cookies to recognize a computer when a user visits our website, track users as they navigate the website, and improve the website's usability.",
      "3. Managing cookies: Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser."
    ]
  }
};

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // @ts-ignore
  const doc = legalContent[slug];

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <h1 className="text-4xl font-heading font-black text-cyan-500">DOCUMENT NOT FOUND</h1>
      </div>
    );
  }

  return (
    <AnimatedLayout>
      <main className="relative min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold mb-12">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white mb-12">
            {doc.title.toUpperCase()}
          </h1>

          <div className="space-y-8">
            {doc.content.map((paragraph: string, i: number) => (
              <p key={i} className="text-lg text-white/80 leading-relaxed font-light">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 text-sm text-white/40">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </main>
    </AnimatedLayout>
  );
}
