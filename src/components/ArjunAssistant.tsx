"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, Globe2, Clock, Send, X, Sparkles, MessageSquare, Zap, Terminal, Cpu } from "lucide-react";
import { getFoundryResponse } from "@/app/actions/chatAction";

// Neural frequency bars for "Thinking" state
const NeuralBars = () => (
  <div className="flex items-center gap-1.5 h-5">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          height: [4, 20, 4],
          backgroundColor: ["#06b6d4", "#22d3ee", "#06b6d4"]
        }}
        transition={{ 
          duration: 0.6, 
          repeat: Infinity, 
          delay: i * 0.1,
          ease: "easeInOut"
        }}
        className="w-1.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      />
    ))}
  </div>
);

export default function FoundryAssistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Connection established. I am the Metrobrain Intelligent Assistant. How can I assist you with your digital infrastructure today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const messageToSend = customMsg || inputValue;
    if (!messageToSend.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: "user", content: messageToSend }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await getFoundryResponse(messageToSend);
      setMessages(prev => [...prev, { role: "assistant", content: response.content }]);
      
      // Execute Agent Action if present
      if (response.action) {
        dispatchAgentAction(response.action);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection lost. Re-establishing secure link..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const [lastAction, setLastAction] = useState<string | null>(null);

  const dispatchAgentAction = (action: string) => {
    setLastAction(action);
    
    // Clear ripple effect after 2 seconds
    setTimeout(() => setLastAction(null), 2000);

    const sectionMap: Record<string, string> = {
      "SCROLL_TO_PRICING": "pricing",
      "SCROLL_TO_SERVICES": "services",
      "SCROLL_TO_WORK": "work",
      "SCROLL_TO_CONTACT": "contact"
    };

    const targetId = sectionMap[action];
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1200); // Small delay to let the user read the AI's intent first
      }
    }
  };

  const quickActions = [
    "Technical Proposal",
    "AI Architectures",
    "Engineering Tiers",
    "Access Control"
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-slate-950" id="ai-assistant">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      
      <AnimatePresence>
        {lastAction && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 2 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none bg-cyan-500 rounded-full blur-[150px]"
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card rounded-[3rem] p-8 md:p-12 border-white/5 relative overflow-hidden">
          {/* Top Edge Glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-heading font-black tracking-[0.3em] shadow-lg shadow-cyan-500/10 uppercase"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Intelligent Assistant: Online
              </motion.div>
              
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-6xl md:text-8xl font-heading font-bold mb-6 text-white tracking-tighter leading-none uppercase"
                >
                  Metrobrain <br/>
                  <span className="text-gradient">v1.0</span>
                </motion.h2>
                <p className="text-lg md:text-xl text-slate-400 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed italic">
                  "A proprietary intelligence layer architected for enterprise automation and strategic digital growth."
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Terminal, label: "Core Sync" },
                  { icon: Globe2, label: "Global Node" },
                  { icon: Zap, label: "Fast Response" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start gap-3 p-4 bg-white/5 rounded-3xl border border-white/5 group hover:border-cyan-500/30 transition-all duration-500">
                    <item.icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="font-heading font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full lg:w-max px-12 py-5 bg-white text-slate-950 hover:bg-cyan-500 hover:text-white rounded-2xl font-heading font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl hover:-translate-y-2 text-xs"
              >
                <Bot className="w-5 h-5" />
                Connect with AI
              </button>
            </div>

            {/* Interactive Block Visual / Chat Interface */}
            <div className="relative h-[450px] lg:h-[550px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isChatOpen ? (
                  <motion.div 
                    key="visualizer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full h-full flex flex-col items-center justify-center"
                  >
                    <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-cyan-500/10 to-transparent blur-[100px] opacity-60" />
                    
                    <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-10 relative">
                      {/* Orbiting Tech Rings */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-cyan-500/10 rounded-full border-dashed" 
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[8%] border border-white/5 rounded-full flex items-start justify-center" 
                      >
                         <div className="w-2 h-2 bg-cyan-400 rounded-full -mt-1 shadow-[0_0_20px_rgba(6,182,212,1)]" />
                      </motion.div>

                      {/* Core Neural Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [45, 48, 45]
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          className="w-44 h-44 md:w-64 md:h-64 bg-slate-900/50 backdrop-blur-3xl rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-center relative rotate-45 group hover:border-cyan-500/40 transition-all duration-700 overflow-hidden"
                        >
                          <img 
                            src="/logo.png" 
                            alt="Metrobrain Logo" 
                            className="w-32 h-32 md:w-48 md:h-48 -rotate-45 object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-transform group-hover:scale-110" 
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="chat"
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    className="absolute inset-0 bg-slate-900 border border-white/10 rounded-[3.5rem] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                  >
                    {/* Chat Header */}
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 shadow-2xl shadow-cyan-500/20 flex items-center justify-center text-white border border-white/10 overflow-hidden">
                          <img src="/logo.png" alt="Metrobrain Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-xl text-white uppercase tracking-tight">Metrobrain AI</h4>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            <p className="text-[9px] font-heading font-black text-slate-500 tracking-[0.2em] uppercase">Status: Secure Connection</p>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsChatOpen(false)}
                        className="p-3 text-slate-500 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Chat Messages */}
                    <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-10 scroll-smooth">
                      {messages.map((msg, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={idx} 
                          className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                        >
                          <div className={`max-w-[85%] rounded-[2rem] p-7 text-sm font-light leading-relaxed ${
                            msg.role === "assistant" 
                              ? "bg-white/5 text-slate-300 rounded-tl-none border border-white/5 shadow-xl" 
                              : "bg-cyan-600 text-white rounded-tr-none shadow-2xl shadow-cyan-500/20"
                          }`}>
                            {msg.content}
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white/5 rounded-[2rem] rounded-tl-none p-7 border border-white/5 flex items-center gap-6">
                            <NeuralBars />
                            <span className="text-[10px] font-heading font-black text-cyan-400 uppercase tracking-widest">Processing...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Reactions */}
                    {!isTyping && (
                      <div className="px-8 flex flex-wrap gap-3 mb-6">
                         {quickActions.map(action => (
                            <button 
                             key={action}
                             onClick={() => handleSend(undefined, action)}
                             className="bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:text-white transition-all px-5 py-2.5 rounded-xl text-[9px] font-heading font-black uppercase tracking-[0.2em] text-slate-500 shadow-sm"
                            >
                             {action}
                            </button>
                          ))}
                      </div>
                    )}

                    {/* Chat Input */}
                    <div className="p-8 border-t border-white/5 bg-slate-900">
                      <form onSubmit={handleSend} className="relative">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Describe your requirements..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-8 pr-16 py-6 text-white font-light placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 transition-all text-lg"
                        />
                        <button 
                          type="submit"
                          disabled={isTyping}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white text-slate-950 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all shadow-xl disabled:opacity-50"
                        >
                          <Send className="w-5 h-5 ml-0.5" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

