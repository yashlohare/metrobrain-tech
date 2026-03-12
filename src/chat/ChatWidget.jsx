import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiMic, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { sendMessage } from './aiService';
import { saveChatMessage } from '../lib/supabase';



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
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    
    // Save user message to database
    saveChatMessage(sessionId, 'user', userMsg, 'en-IN');

    try {
      const response = await sendMessage(userMsg);
      setMessages((prev) => [...prev, { role: 'bot', text: response }]);
      
      // Save bot response to database
      saveChatMessage(sessionId, 'bot', response, 'en-IN');
      
      if (voiceEnabled) {
        speak(response);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'bot', text: "Sorry, I'm having trouble. Please try again!" }]);
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
        setMessages((prev) => [...prev, { role: 'user', text: transcript }]);
        setIsTyping(true);
        
        sendMessage(transcript).then((response) => {
          setMessages((prev) => [...prev, { role: 'bot', text: response }]);
          setIsTyping(false);
          if (voiceEnabled) speak(response);
        }).catch(() => {
          setMessages((prev) => [...prev, { role: 'bot', text: "Sorry, I'm having trouble. Please try again!" }]);
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
    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Listen to voice toggle to immediately cancel if muted
  useEffect(() => {
    if (!voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [voiceEnabled]);

  return (
    <>
      {/* Floating Chat Toggle Button with Avatar */}
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
          {/* Header with Avatar */}
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
              style={{ marginLeft: 'auto', marginRight: '8px' }}
            >
              {voiceEnabled ? <FiVolume2 /> : <FiVolumeX />}
            </button>
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
