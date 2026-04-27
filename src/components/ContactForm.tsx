"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

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

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side Rate Limiting (60s Cooldown)
    const lastSub = localStorage.getItem("last_submission");
    const now = Date.now();
    if (lastSub && now - parseInt(lastSub) < 60000) {
      alert("Please wait a moment before sending another message (60s cooldown).");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Validation
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 3) {
      alert("Please enter a valid name (at least 3 characters).");
      setIsSubmitting(false);
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }
    if (!subject || subject.trim().length < 3) {
      alert("Please enter a valid subject (at least 3 characters).");
      setIsSubmitting(false);
      return;
    }
    if (!message || message.trim().length < 10) {
      alert("Please enter a more detailed message (at least 10 characters).");
      setIsSubmitting(false);
      return;
    }

    try {
      const verifyRes = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.valid) {
        alert(verifyData.message || "Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.warn("Email verification failed, proceeding anyway.");
    }

    formData.append("access_key", "14e52cb4-8b56-4a19-a22e-c4e061afcd19");

    // Honeypot check
    if (formData.get("botcheck")) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        localStorage.setItem("last_submission", Date.now().toString());
        e.currentTarget.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again or contact us directly via email.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 px-6 bg-black">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Get in touch with us</h3>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Whether you have a question about our services, pricing, or just want to say hello, we&apos;re here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-500">
                  <Phone className="w-6 h-6 text-white group-hover:text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-1">Phone</h4>
                  <div className="space-y-1">
                    <p className="text-lg md:text-xl text-white font-medium group-hover:text-cyan-400 transition-colors">+91 70471 23555</p>
                    <p className="text-lg md:text-xl text-white font-medium group-hover:text-cyan-400 transition-colors">+91 88057 75486</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-500">
                  <Mail className="w-6 h-6 text-white group-hover:text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-lg md:text-xl text-white font-medium group-hover:text-cyan-400 transition-colors">metrobraintechnologies@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-500">
                  <MapPin className="w-6 h-6 text-white group-hover:text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-1">Office</h4>
                  <p className="text-xl text-white font-medium group-hover:text-cyan-400 transition-colors">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              className="px-10 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-105"
            >
              Schedule a Call
            </button>
          </div>

          {/* Form Side */}
          <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(34,211,238,0.05)] relative overflow-hidden">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h4 className="text-2xl font-bold text-white">Message Sent Successfully</h4>
                <p className="text-white/50 max-w-xs">Our team has received your message and will respond shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-cyan-400 font-bold uppercase tracking-widest text-xs pt-6 hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                {/* Honeypot Field */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/40 ml-1">Your Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="Ramesh Kumar" 
                      className="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/40 ml-1">Your Email</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="ramesh@example.com" 
                      className="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/40 ml-1">Subject</label>
                    <input 
                      required
                      name="subject"
                      type="text" 
                      placeholder="How can we help?" 
                      className="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/40 ml-1">Estimated Budget</label>
                    <select required name="budget" className="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer">
                      <option value="" disabled selected className="text-black">Select a budget range</option>
                      <option value="₹50,000 - ₹1,00,000" className="text-black">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹5,00,000" className="text-black">₹1,00,000 - ₹5,00,000</option>
                      <option value="₹5,00,000 - ₹15,00,000" className="text-black">₹5,00,000 - ₹15,00,000</option>
                      <option value="₹15,00,000+" className="text-black">₹15,00,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/40 ml-1">Message</label>
                  <textarea 
                    required
                    name="message"
                    placeholder="Tell us about your project..." 
                    rows={5}
                    className="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-full border border-cyan-500/30 bg-transparent text-white font-bold tracking-[0.2em] uppercase hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-500 flex items-center justify-center gap-3 group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
