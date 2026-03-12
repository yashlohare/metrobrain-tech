import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiMic, FiVolume2, FiVolumeX, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { sendMessage } from './aiService';
import { saveChatMessage, submitContact } from '../lib/supabase';

// Detects if the user is saying yes to a callback/call request
const isYesToCall = (text) => {
  const lower = text.toLowerCase().trim();
  return (
    lower === 'yes' || lower === 'yes please' || lower === 'sure' ||
    lower === 'ok' || lower === 'okay' || lower === 'yeah' ||
    lower === 'yep' || lower === 'haan' || lower === 'ha' ||
    lower.includes('yes call') || lower.includes('please call') ||
    lower.includes('call me') || lower.includes('callback') ||
    lower.includes('have someone call') || lower.includes('get a call')
  );
};

// Detects if the previous bot message was asking about a callback
const botAskedForCallback = (messages) => {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'bot') {
      const t = messages[i].text?.toLowerCase() || '';
      if (
        t.includes('should i have a representative call you') ||
        t.includes('would you like us to call you') ||
        t.includes('shall we call you') ||
        t.includes('want a callback') ||
        t.includes('have a representative call')
      ) {
        return true;
      }
      break;
    }
  }
  return false;
};

// Inline lead form rendered as a chat message
const LeadForm = ({ onSubmit, onSkip }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    await onSubmit(form);
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="chat-lead-success">
        <FiCheckCircle style={{ color: '#10b981', fontSize: '1.5rem' }} />
        <p>Thanks <strong>{form.name}</strong>! 🎉 Our team will call you at <strong>{form.phone}</strong> shortly.</p>
      </div>
    );
  }

  return (
    <form className="chat-lead-form" onSubmit={handleSubmit}>
      <p className="chat-lead-title">📋 Quick Details</p>
      <input
        className="chat-lead-input"
        name="name"
        placeholder="Your Name *"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="chat-lead-input"
        name="phone"
        placeholder="Phone Number *"
        value={form.phone}
        onChange={handleChange}
        required
        type="tel"
      />
      <input
        className="chat-lead-input"
        name="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={handleChange}
        type="email"
      />
      <select
        className="chat-lead-input"
        name="service"
        value={form.service}
        onChange={handleChange}
      >
        <option value="">Service Interested In</option>
        <option value="web">Web Application</option>
        <option value="mobile">Mobile App</option>
        <option value="chatbot">AI Chatbot</option>
        <option value="marketing">Social Media Marketing</option>
        <option value="seo">SEO</option>
        <option value="design">UI/UX Design</option>
        <option value="other">Other</option>
      </select>
      <textarea
        className="chat-lead-input"
        name="message"
        placeholder="Brief requirement (optional)"
        value={form.message}
        onChange={handleChange}
        rows={2}
      />
      <div className="chat-lead-actions">
        <button type="submit" className="chat-lead-submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Request Callback'}
        </button>
        <button type="button" className="chat-lead-skip" onClick={onSkip}>
          Skip
        </button>
      </div>
    </form>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => 'session_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now());
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! 👋 I'm Arjun, your Metrobrain Technologies AI Assistant. How can I help you today? Ask me about our services, pricing, or anything else!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showLeadForm]);

  const handleLeadSubmit = async (formData) => {
    await submitContact({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service || 'callback-request',
      message: formData.message || 'Callback requested via AI chat',
    });
    saveChatMessage(sessionId, 'user', `[LEAD FORM] ${formData.name} | ${formData.phone}`, 'en-IN');
    setShowLeadForm(false);
    setMessages(prev => [...prev, {
      role: 'bot',
      text: `Perfect! ✅ We've received your details, ${formData.name}. Our team will call you at ${formData.phone} soon. Is there anything else I can help you with?`
    }]);
  };

  const handleLeadSkip = () => {
    setShowLeadForm(false);
    setMessages(prev => [...prev, {
      role: 'bot',
      text: "No worries! You can reach us anytime at +91 70471 23555 or email metrobraintechnologies@gmail.com. Anything else I can help with?"
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');

    const updatedMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(updatedMessages);
    saveChatMessage(sessionId, 'user', userMsg, 'en-IN');

    // Check if user said yes to a callback offer
    if (isYesToCall(userMsg) && botAskedForCallback(messages)) {
      setShowLeadForm(true);
      return;
    }

    setIsTyping(true);
    try {
      const response = await sendMessage(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      saveChatMessage(sessionId, 'bot', response, 'en-IN');
      if (voiceEnabled) speak(response);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble. Please try again!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser. Try Chrome!');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setTimeout(() => {
        setInput('');
        const curr = [...messages, { role: 'user', text: transcript }];
        setMessages(curr);
        if (isYesToCall(transcript) && botAskedForCallback(messages)) {
          setShowLeadForm(true);
          return;
        }
        setIsTyping(true);
        sendMessage(transcript).then((response) => {
          setMessages(prev => [...prev, { role: 'bot', text: response }]);
          setIsTyping(false);
          if (voiceEnabled) speak(response);
        }).catch(() => {
          setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble. Please try again!" }]);
          setIsTyping(false);
        });
      }, 300);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window) || !voiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [voiceEnabled]);

  return (
    <>
      {/* Floating Chat Toggle Button */}
      {!isOpen && (
        <button
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          id="chat-toggle"
        >
          <img src="/ai-avatar.png" alt="AI Agent" className="chat-toggle-avatar" />
          <span className="chat-toggle-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className={`chat-avatar-container ${isSpeaking ? 'speaking' : ''}`}>
              <img src="/ai-avatar.png" alt="Arjun AI" className="chat-avatar-img" />
              <span className="avatar-ring" />
              <span className="avatar-ring ring-2" />
            </div>
            <div className="chat-header-info">
              <h4>Arjun — AI Assistant</h4>
              <span>{isSpeaking ? '🔊 Speaking...' : isTyping ? '💭 Thinking...' : 'Online'}</span>
            </div>
            <button
              className="chat-voice-btn"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? 'Mute voice' : 'Enable voice'}
              style={{ marginLeft: 'auto', marginRight: '4px' }}
            >
              {voiceEnabled ? <FiVolume2 /> : <FiVolumeX />}
            </button>
            <a
              href="tel:8805775486"
              className="chat-voice-btn chat-call-btn"
              title="Call Us: 8805775486"
              style={{ marginRight: '4px', textDecoration: 'none' }}
            >
              <FiPhone />
            </a>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.role === 'bot' && (
                  <img src="/ai-avatar.png" alt="" className="msg-avatar" />
                )}
                <div className="msg-text">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <img src="/ai-avatar.png" alt="" className="msg-avatar" />
                <div className="chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            {showLeadForm && (
              <div className="chat-message bot" style={{ alignItems: 'flex-start' }}>
                <img src="/ai-avatar.png" alt="" className="msg-avatar" />
                <LeadForm onSubmit={handleLeadSubmit} onSkip={handleLeadSkip} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <button
              className={`chat-voice-btn ${isListening ? 'listening' : ''}`}
              onClick={startListening}
              title="Voice input"
            >
              <FiMic />
            </button>
            <input
              className="chat-input"
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-send-btn" onClick={handleSend} title="Send">
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
