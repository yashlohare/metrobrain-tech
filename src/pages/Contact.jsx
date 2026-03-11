import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Check } from 'lucide-react';
import { submitLead } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
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
    if (!formData.name || !formData.phone) return alert("Please fill in your details.");

    setIsSubmitting(true);
    const selectedList = services.filter(s => s.selected).map(s => s.title).join(', ');
    
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        services: selectedList,
        concept: formData.concept
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Supabase Error:", err);
    }

    const msg = `*New Request*\n\n` +
      `*Client:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n\n` +
      `*Services:* ${selectedList}\n\n` +
      `*Investment:* Rs. ${totalCost}\n\n` +
      `*Concept:* ${formData.concept}`;

    const AGENCY_PHONE = "919000000000"; 
    setIsSubmitting(false);
    window.open(`https://api.whatsapp.com/send?phone=${AGENCY_PHONE}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Start Your <span className="text-pink-400">Project</span></h1>
          <p className="text-slate-400 text-lg mb-10">Select features for an instant estimate and connect with us.</p>
          
          <div className="flex flex-col gap-4 mb-8">
            {services.map(srv => (
              <div 
                key={srv.id}
                onClick={() => toggleService(srv.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center
                  ${srv.selected ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 glass-panel hover:border-white/20'}`}
              >
                <span className={`font-semibold ${srv.selected ? 'text-white' : 'text-slate-300'}`}>{srv.title}</span>
                <span className="font-bold text-slate-300">₹{srv.price.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 rounded-2xl border-blue-500/30">
            <p className="text-sm text-slate-400 font-semibold mb-1 uppercase tracking-wider">Estimated Investment</p>
            <p className="text-4xl font-extrabold text-white">₹{totalCost.toLocaleString('en-IN')}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-center">
            <form onSubmit={handleWhatsApp} className="flex flex-col gap-5">
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                placeholder="Name"
              />
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                placeholder="WhatsApp Number"
              />
              <textarea 
                value={formData.concept}
                onChange={e => setFormData({...formData, concept: e.target.value})}
                className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 resize-none"
                placeholder="Project Concept"
              ></textarea>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold text-lg hover:shadow-lg transition-all flex justify-center items-center gap-2"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (isSuccess ? "Sent!" : "Request Proposal")}
                {!isSubmitting && !isSuccess && <Send size={20} />}
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
