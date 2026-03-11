import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send, Loader2 } from 'lucide-react';
import { submitLead } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    phone: '',
    concept: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [services, setServices] = useState([
    { id: 'web', title: 'Premium Landing Page', price: 15000, selected: true },
    { id: 'ecom', title: 'E-Commerce Functionality', price: 25000, selected: false },
    { id: 'admin', title: 'Custom Admin Dashboard', price: 20000, selected: false },
    { id: 'seo', title: 'Advanced SEO Setup', price: 5000, selected: false }
  ]);

  const toggleService = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const totalCost = services.filter(s => s.selected).reduce((acc, curr) => acc + curr.price, 0);

  const handleWhatsApp = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert("Please fill in your Contact Details.");

    setIsSubmitting(true);
    const selectedList = services.filter(s => s.selected).map(s => s.title).join(', ');
    
    // 1. Save to Supabase
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        services: selectedList,
        concept: formData.concept
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to save lead:", err);
    }

    // 2. Construct WhatsApp message
    const msg = `*New Project Request*\n\n` +
      `*Client:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n\n` +
      `*Selected Services:*\n- ${selectedList}\n\n` +
      `*Estimated Cost:* Rs. ${totalCost}\n\n` +
      `*Project Concept:*\n${formData.concept}`;

    const AGENCY_PHONE = "919000000000"; 
    
    setIsSubmitting(false);
    window.open(`https://api.whatsapp.com/send?phone=${AGENCY_PHONE}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Col: Pricing Calculator */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Start Your <span className="text-pink-400">Project</span></h1>
          <p className="text-slate-400 text-lg mb-10">Select the features you need, get an instant estimate, and send us your requirements directly via WhatsApp.</p>
          
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">1. Select Features</h3>
          <div className="flex flex-col gap-4 mb-8">
            {services.map(srv => (
              <div 
                key={srv.id}
                onClick={() => toggleService(srv.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center
                  ${srv.selected ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(244,114,182,0.2)]' : 'border-white/10 glass-panel hover:border-white/20'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${srv.selected ? 'bg-pink-500 border-pink-500' : 'border-slate-500'}`}>
                    {srv.selected && <Check size={14} className="text-white" />}
                  </div>
                  <span className={`font-semibold ${srv.selected ? 'text-white' : 'text-slate-300'}`}>{srv.title}</span>
                </div>
                <span className="font-bold text-slate-300">₹{srv.price.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          {/* Sticky Total */}
          <div className="glass-panel p-6 rounded-2xl border-blue-500/30 flex justify-between items-end relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-2xl rounded-full"></div>
             <div>
               <p className="text-sm text-slate-400 font-semibold mb-1 uppercase tracking-wider">Estimated Investment</p>
               <p className="text-4xl font-extrabold text-white">₹{totalCost.toLocaleString('en-IN')}</p>
             </div>
          </div>
        </motion.div>

        {/* Right Col: Lead Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="glass-panel p-8 md:p-10 rounded-3xl h-full flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">2. Contact Details</h3>
            
            <form onSubmit={handleWhatsApp} className="flex flex-col gap-5 flex-grow">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">WhatsApp Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="flex-grow">
                <label className="block text-sm font-semibold text-slate-400 mb-2">Project Concept</label>
                <textarea 
                  value={formData.concept}
                  onChange={e => setFormData({...formData, concept: e.target.value})}
                  className="w-full h-32 md:h-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
                  placeholder="Tell us broadly about what you are trying to build..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(244,114,182,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing... <Loader2 size={20} className="animate-spin" /></>
                ) : isSuccess ? (
                  <>Message Sent! <Check size={20} /></>
                ) : (
                  <>Request Proposal <Send size={20} /></>
                )}
              </button>
            </form>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
