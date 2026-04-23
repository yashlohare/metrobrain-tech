"use client";

import { useState, useEffect } from "react";
import { X, Send, Phone, Mail, Cpu } from "lucide-react";
import { useUIInteraction } from "@/hooks/useUIInteraction";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { playSuccess } = useUIInteraction();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side Rate Limiting (60s Cooldown)
    const lastSub = localStorage.getItem("last_submission_modal");
    const now = Date.now();
    if (lastSub && now - parseInt(lastSub) < 60000) {
      alert("Please wait a moment before sending another message (60s cooldown).");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "14e52cb4-8b56-4a19-a22e-c4e061afcd19");

    // Honeypot check
    if (formData.get("botcheck")) {
      setIsSubmitting(false);
      return;
    }
    if (selectedType) {
      formData.append("project_type", selectedType);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        playSuccess();
        localStorage.setItem("last_submission_modal", Date.now().toString());
        e.currentTarget.reset();
        setSelectedType(null);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      alert("Network error: " + (error.message || "Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleOpen = () => {
      setIsSubmitted(false);
      setIsOpen(true);
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 1500);
    };
    window.addEventListener("open-contact", handleOpen);
    return () => window.removeEventListener("open-contact", handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#020617]/80 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0A0A0F] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 pointer-events-none" />
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-[30]"
        >
          <X className="w-5 h-5" />
        </button>

        {isSyncing && (
          <div className="absolute inset-0 z-30 bg-[#0A0A0F]/95 backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden animate-in fade-in duration-300">
            {/* Background Grid & Scanline */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 h-[2px] bg-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-[scan_2s_ease-in-out_infinite]" />

            {/* Central Holographic Core */}
            <div className="relative flex items-center justify-center mb-12">
              {/* Expanding Ripple Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="absolute rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"
                    style={{ width: `${i * 100}px`, height: `${i * 100}px`, animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>

              {/* Orbital Rings */}
              <div className="absolute w-48 h-48 border-y-2 border-transparent border-t-cyan-500/80 border-b-violet-500/80 rounded-full animate-[spin_3s_linear_infinite]" />
              <div className="absolute w-40 h-40 border-x-2 border-transparent border-l-cyan-400 border-r-fuchsia-500 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
              
              {/* Inner Core */}
              <div className="relative w-24 h-24 bg-black/50 border-2 border-cyan-500/50 rounded-full backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-pulse" />
                <Cpu className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)] animate-[pulse_1s_ease-in-out_infinite]" />
              </div>

              {/* Orbital Nodes */}
              <div className="absolute w-48 h-48 animate-[spin_4s_linear_infinite]">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,1)]" />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_10px_rgba(139,92,246,1)]" />
              </div>
            </div>

            {/* Typography & Loading Bar */}
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-xl md:text-2xl font-black font-heading tracking-[0.5em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 animate-pulse">
                  System Override
                </h4>
                <p className="text-cyan-500/60 text-xs font-bold tracking-[0.4em] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                  Establishing Neural Sync
                </p>
              </div>

              {/* Futuristic Progress Bar */}
              <div className="w-64 h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                {/* Glitch Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
                
                <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 w-full animate-[progress_1.5s_ease-out_forwards] relative shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/40 blur-sm animate-[shimmer_1s_infinite]" />
                </div>
              </div>

              {/* Fake Data Stream Text */}
              <div className="text-[8px] font-mono text-cyan-500/40 uppercase tracking-widest animate-pulse h-4 overflow-hidden text-center">
                <p className="animate-[slideUp_1.5s_steps(4)_infinite]">
                  Handshake protocol initiated...<br/>
                  Bypassing security nodes...<br/>
                  Injecting payload...<br/>
                  Connection established.
                </p>
              </div>
            </div>

            {/* Custom CSS for this specific loader */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scan {
                0% { top: -10%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 110%; opacity: 0; }
              }
              @keyframes progress {
                0% { width: 0%; }
                20% { width: 15%; }
                50% { width: 60%; }
                80% { width: 85%; }
                100% { width: 100%; }
              }
              @keyframes slideUp {
                0% { transform: translateY(0); }
                100% { transform: translateY(-400%); }
              }
            `}} />
          </div>
        )}

        <div className="flex flex-col md:flex-row relative z-10 h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* Left Info Panel */}
          <div className="w-full md:w-2/5 p-8 md:p-12 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-500 mb-4">
                Get in Touch
              </h2>
              <h3 className="text-3xl font-heading font-black text-white tracking-tighter mb-6">
                CONTACT<br/>US.
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-10">
                Establish a direct channel with our expert team. We are ready to help architect your digital future.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Mail us</h4>
                  <a href="mailto:metrobraintechnologies@gmail.com" className="text-white/50 text-sm hover:text-cyan-400 transition-colors">
                    metrobraintechnologies@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Contact us</h4>
                  <div className="text-white/50 text-sm space-y-1">
                    <a href="tel:+917047123555" className="block hover:text-cyan-400 transition-colors">+91 70471 23555</a>
                    <a href="tel:+918805775486" className="block hover:text-cyan-400 transition-colors">+91 88057 75486</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 flex gap-4">
              <a 
                href="https://in.linkedin.com/company/metrobrain-technology?trk=public_profile_topcard-current-company" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all group"
              >
                <LinkedinIcon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/metrobraintechnologies?igsh=Y3E4aGZnOGUxazI3&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all group"
              >
                <InstagramIcon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-3/5 p-8 md:p-12">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500 py-12">
                <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                  <Send className="w-10 h-10 text-cyan-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white tracking-tighter uppercase">Message Sent Successfully</h4>
                  <p className="text-white/40 text-sm max-w-xs mx-auto">We have received your message and will get back to you shortly.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 rounded-xl border border-white/10 text-white/60 font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
                {/* Honeypot Field */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Full Name</label>
                    <input required name="full_name" type="text" placeholder="e.g. John Doe" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</label>
                    <input required name="email" type="email" placeholder="e.g. john@company.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Contact Number</label>
                  <input required name="phone" type="tel" placeholder="e.g. +91 00000 00000" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Project Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['AI Solution', 'Web App', 'Mobile App', 'UI/UX Design', 'Cyber Security', 'Other'].map((type) => (
                      <button 
                        key={type} 
                        type="button" 
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-2 rounded-lg border transition-all text-center text-[10px] font-bold uppercase tracking-widest ${
                          selectedType === type 
                          ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                          : 'border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Message</label>
                  <textarea required name="message" placeholder="Describe your project vision..." className="w-full flex-1 min-h-[120px] bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all resize-none" />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`group relative w-full bg-white text-black font-bold tracking-[0.3em] uppercase py-4 mt-2 rounded-xl transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] overflow-hidden ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
