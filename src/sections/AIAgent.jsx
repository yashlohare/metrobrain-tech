import { useEffect, useRef, useState } from 'react';
import { FiMic, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AIAgent = () => {
  const sectionRef = useRef(null);
  const [activeWave, setActiveWave] = useState(false);

  useEffect(() => {
    gsap.fromTo(".ai-avatar-display", 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".ai-avatar-display",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".ai-feature-card", 
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ai-features",
          start: "top 85%",
        }
      }
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWave((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section ai-agent-section" id="ai-agent" ref={sectionRef}>
      <div className="stich-divider" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">AI-Powered</span>
          <h2 className="section-title">Meet Arjun — Your AI Assistant</h2>
          <p className="section-subtitle">
            Our intelligent AI agent is here 24/7 to help you. Ask anything about our services in Hindi, Marathi, or English!
          </p>
        </div>

        <div className="ai-agent-showcase">
          {/* AI Avatar Display */}
          <div className="ai-avatar-display">
            <div className={`ai-avatar-wrapper ${activeWave ? 'wave-active' : ''}`}>
              <div className="ai-avatar-glow" />
              <div className="ai-avatar-ring-outer" />
              <div className="ai-avatar-ring-inner" />
              <img src="/ai-avatar.png" alt="Arjun AI Assistant" className="ai-avatar-large" />
              <div className="ai-avatar-status">
                <span className="status-dot" />
                Online & Ready
              </div>
            </div>
            <h3 className="ai-avatar-name">Arjun</h3>
            <p className="ai-avatar-role">Metrobrain Technologies AI Assistant</p>
          </div>

          {/* Features */}
          <div className="ai-features">
            <div className="glass-card ai-feature-card">
              <div className="ai-feature-icon"><FiMessageSquare /></div>
              <div>
                <h4>Smart Conversations</h4>
                <p>Powered by Google Gemini AI. Ask about services, pricing, timelines — Arjun knows it all.</p>
              </div>
            </div>
            <div className="glass-card ai-feature-card">
              <div className="ai-feature-icon"><FiMic /></div>
              <div>
                <h4>Voice Interaction</h4>
                <p>Speak naturally and Arjun will listen and respond. No typing needed — just talk!</p>
              </div>
            </div>
            <div className="glass-card ai-feature-card">
              <div className="ai-feature-icon"><FiGlobe /></div>
              <div>
                <h4>Multilingual Support</h4>
                <p>Chat in English, हिंदी, or मराठी. Arjun auto-detects your language and responds accordingly.</p>
              </div>
            </div>

            <button
              className="btn btn-primary ai-try-btn"
              onClick={() => {
                const chatBtn = document.getElementById('chat-toggle');
                if (chatBtn) chatBtn.click();
              }}
            >
              <FiMessageSquare /> Talk to Arjun Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgent;
