import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft, FiSend, FiCpu, FiBarChart2, FiLayers, FiHexagon, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NexusAIPrototype = () => {
  const [messages, setMessages] = useState([
    { role: 'system', text: 'NEXUS-OS v4.0.2 Initialized. All systems nominal.' },
    { role: 'bot', text: 'Welcome, Commander. AI-Powered Data Analysis for Metrobrain Technologies is active. How shall we proceed with the latest dataset?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [metrics, setMetrics] = useState({ accuracy: 98.4, cpu: 12, memory: 45 });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        accuracy: (98.4 + Math.random() * 0.2).toFixed(1),
        cpu: Math.floor(10 + Math.random() * 15),
        memory: Math.floor(40 + Math.random() * 10)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Analysis complete for: "${userText}". NexusAI has processed the request with 99.2% confidence. Predictive modeling suggests a 15% increase in efficiency upon deployment.` 
      }]);
    }, 1500);
  };

  return (
    <div className="proto-page nexus-theme">
      {/* Sidebar */}
      <aside className="nexus-sidebar">
        <div className="nexus-brand">
          <FiHexagon className="nexus-brand-icon" />
          <span>NEXUS AI</span>
        </div>
        <nav className="nexus-nav">
          <div className="nav-group-label">Analysis</div>
          <div className="nexus-nav-item active"><FiCpu /> Neural Core</div>
          <div className="nexus-nav-item"><FiBarChart2 /> Analytics</div>
          <div className="nexus-nav-item"><FiLayers /> Datasets</div>
          <div className="nav-group-label">System</div>
          <div className="nexus-nav-item"><FiZap /> Processing</div>
        </nav>
        <Link to="/" className="nexus-back"><FiArrowLeft /> Return Home</Link>
      </aside>

      {/* Main Console */}
      <main className="nexus-console">
        <header className="nexus-header">
          <div className="status-tags">
            <span className="tag-online">● SYSTEM ONLINE</span>
            <span className="tag-version">V4.0.2-ALPHA</span>
          </div>
          <div className="system-metrics">
            <div className="metric">ACCURACY <span>{metrics.accuracy}%</span></div>
            <div className="metric">CPU <span>{metrics.cpu}%</span></div>
            <div className="metric">MEM <span>{metrics.memory}%</span></div>
          </div>
        </header>

        <div className="chat-container-proto">
          <div className="chat-log custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble-proto ${m.role}`}>
                <div className="bubble-content">
                  <span className="role-label">{m.role.toUpperCase()}</span>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble-proto bot typing">
                <div className="typing-dots"><span /><span /><span /></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="nexus-input-area">
            <div className="input-glow" />
            <input 
              type="text" 
              placeholder="Inject command or data query..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="nexus-send-btn" onClick={handleSend}><FiSend /></button>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .nexus-theme {
          background: #02040a;
          color: #00f2ff;
          font-family: 'JetBrains Mono', 'Space Grotesk', monospace;
          height: 100vh;
          display: flex;
          overflow: hidden;
        }

        .nexus-sidebar {
          width: 280px;
          background: #05070f;
          border-right: 1px solid rgba(0, 242, 255, 0.1);
          padding: 30px;
          display: flex;
          flex-direction: column;
        }
        .nexus-brand { display: flex; align-items: center; gap: 15px; font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 50px; }
        .nexus-brand-icon { color: #00f2ff; filter: drop-shadow(0 0 5px #00f2ff); }
        .nav-group-label { font-size: 0.65rem; color: #444; text-transform: uppercase; letter-spacing: 2px; margin: 25px 0 15px; }
        .nexus-nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 8px; cursor: pointer; color: #555; transition: all 0.3s; font-size: 0.9rem; margin-bottom: 5px; }
        .nexus-nav-item:hover { color: #00f2ff; background: rgba(0, 242, 255, 0.05); }
        .nexus-nav-item.active { color: #00f2ff; background: rgba(0, 242, 255, 0.1); border: 1px solid rgba(0, 242, 255, 0.2); }
        .nexus-back { margin-top: auto; display: flex; align-items: center; gap: 10px; color: #333; text-decoration: none; font-size: 0.85rem; transition: color 0.3s; }
        .nexus-back:hover { color: #00f2ff; }

        .nexus-console { flex: 1; display: flex; flex-direction: column; padding: 30px; position: relative; }
        .nexus-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 25px; border-bottom: 1px solid rgba(0, 242, 255, 0.05); margin-bottom: 30px; }
        .tag-online { font-size: 0.7rem; color: #2ed573; font-weight: 700; background: rgba(46, 213, 115, 0.1); padding: 4px 10px; border-radius: 4px; box-shadow: 0 0 10px rgba(46, 213, 115, 0.2); }
        .tag-version { font-size: 0.7rem; color: #ff9f43; margin-left: 10px; opacity: 0.5; }
        .system-metrics { display: flex; gap: 30px; }
        .metric { font-size: 0.7rem; color: #444; font-weight: 700; }
        .metric span { display: block; font-size: 1rem; color: #ddd; }

        .chat-container-proto { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .chat-log { flex: 1; overflow-y: auto; padding-right: 20px; margin-bottom: 30px; }
        .chat-bubble-proto { margin-bottom: 25px; max-width: 80%; }
        .chat-bubble-proto.system { max-width: 100%; border-left: 2px solid #00f2ff; padding-left: 20px; color: #555; font-size: 0.8rem; }
        .chat-bubble-proto.bot .bubble-content { background: rgba(0, 242, 255, 0.05); border: 1px solid rgba(0, 242, 255, 0.1); padding: 15px; border-radius: 0 15px 15px 15px; }
        .chat-bubble-proto.user { align-self: flex-end; }
        .chat-bubble-proto.user .bubble-content { background: #00f2ff11; border: 1px solid #00f2ff33; padding: 15px; border-radius: 15px 15px 0 15px; color: #fff; text-align: right; }
        .role-label { display: block; font-size: 0.6rem; color: #444; font-weight: 700; letter-spacing: 2px; margin-bottom: 8px; }
        
        .typing-dots { display: flex; gap: 5px; padding: 10px; }
        .typing-dots span { width: 6px; height: 6px; background: #00f2ff; border-radius: 50%; animation: blink 1.4s infinite both; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

        .nexus-input-area { position: relative; display: flex; align-items: center; background: #0a0e1a; border-radius: 12px; padding: 5px 20px; border: 1px solid rgba(0, 242, 255, 0.1); }
        .input-glow { position: absolute; inset: 0; border-radius: 12px; box-shadow: 0 0 20px rgba(0, 242, 255, 0.1); pointer-events: none; }
        .nexus-input-area input { flex: 1; background: none; border: none; color: #fff; padding: 15px 0; font-family: inherit; font-size: 0.9rem; outline: none; }
        .nexus-send-btn { background: none; border: none; color: #00f2ff; font-size: 1.25rem; cursor: pointer; transition: transform 0.3s; display: flex; align-items: center; justify-content: center; }
        .nexus-send-btn:hover { transform: scale(1.2) rotate(-10deg); color: #fff; }

        @media (max-width: 900px) { .nexus-sidebar { display: none; } }
      ` }} />
    </div>
  );
};

export default NexusAIPrototype;
