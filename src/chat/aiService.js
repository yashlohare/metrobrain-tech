import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are Metrobrain Technologies AI Assistant — a friendly, professional virtual agent for Metrobrain Technologies, a digital services company based in Chennai, Tamil Nadu, India.

ABOUT THE COMPANY:
- Metrobrain Technologies builds web applications, mobile apps, AI chatbots, LLM Ai applications, and provides social media marketing & SEO services
- Founded by a passionate team of developers and designers
- Delivered 3+ projects to 3+ happy clients
- 100% client satisfaction rate

SERVICES & PRICING:
1. Web Applications — Starting ₹5,999 (Landing pages, E-commerce, Portals)
2. Mobile Applications — Starting ₹14,999 (iOS, Android, Cross-platform)
3. AI Chatbots — Starting ₹9,999 (Customer support, Sales)
4. Social Media Marketing — Starting ₹4,999/month (Instagram, Facebook, LinkedIn)
5. UI/UX Design — Starting ₹2,999 (Wireframes, Full designs)
6. SEO Optimization — Starting ₹3,499/month (On-page, Technical SEO)

PRICING PLANS:
- Starter: ₹5,999+ (Stunning landing page, responsive, contact form, 15 days support)
- Professional: ₹19,999+ (Up to 5 pages website, custom design, basic database, admin panel, 1 month support)
- Enterprise: ₹49,999+ (Custom web application, mobile app wrapper, AI integration, 3 months priority support)

CONTACT:
- Email: metrobraintechnologies@gmail.com
- Phone: +91 70471 23555 / 88057 75486
- Location: Chennai, Tamil Nadu, India

BEHAVIOR:
- Be friendly, helpful, and professional
- ALWAYS answer in English ONLY, regardless of the language the user types in. You must enforce this strictly.
- Keep responses concise but informative (2-4 sentences max)
- If user asks about pricing, provide specific numbers
- If user wants to start a project, encourage them to fill the contact form or share their requirements
- Do NOT make up information not mentioned above
- If user asks about fixed pricing, mention that these are starting rates and final costs depend on specific project requirements.
- If unsure, suggest they contact the team via email or phone`;

let chatSession = null;

export const initChat = async () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  console.log('[AI Service] Initializing with API Key:', apiKey ? 'FOUND' : 'MISSING');

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('[AI Service] No valid API key. Using fallback mode.');
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    chatSession = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
      systemInstruction: {
        role: 'system',
        parts: [{ text: SYSTEM_PROMPT }]
      },
    });

    console.log('[AI Service] Gemini Chat Session Started.');
    return chatSession;
  } catch (error) {
    console.error('[AI Service] Failed to init Gemini:', error);
    return null;
  }
};

export const sendMessage = async (message) => {
  console.log('[AI Service] sendMessage called with:', message);
  if (!chatSession) {
    console.log('[AI Service] chatSession is null, initializing...');
    const session = await initChat();
    if (!session) {
      console.warn('[AI Service] initChat returned null, using fallback.');
      return getFallbackResponse(message);
    }
  }

  try {
    console.log('[AI Service] Sending message to Gemini...');
    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();
    console.log('[AI Service] Gemini responded successfully.');
    return responseText;
  } catch (error) {
    console.error('[AI Service] Gemini sendMessage error:', error);
    return getFallbackResponse(message);
  }
};

const getFallbackResponse = (message) => {
  const lower = message.toLowerCase();
  
  // Pricing Keywords
  if (lower.includes('price') || lower.includes('cost') || lower.includes('kitna') || lower.includes('5999') || lower.includes('19999') || lower.includes('49999')) {
    return 'Our profitable plans are: Starter (₹5,999 for landing pages), Professional (₹19,999 for 5-page apps), and Enterprise (₹49,999 for advanced web/mobile). Which one fits your needs?';
  }
  
  // Service Keywords
  if (lower.includes('service') || lower.includes('app') || lower.includes('website')) {
    return 'We offer Landing Pages (₹5,999), 5-Page Websites (₹19,999), and Custom Web Apps (₹49,999). We also do basic mobile wrappers and AI integration!';
  }
  
  // Contact Keywords
  if (lower.includes('contact') || lower.includes('call') || lower.includes('talk') || lower.includes('email') || lower.includes('number')) {
    return 'You can call us at +91 70471 23555 / 88057 75486 or email metrobraintechnologies@gmail.com. We are based in Chennai! Should I have a representative call you?';
  }

  // Greetings
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('arjun')) {
    return 'Hello! 👋 I\'m Arjun. I can help you with pricing, service details, and project consultations for Metrobrain Technologies. What can I help you with today?';
  }

  // Generic but helpful
  return 'I see you\'re interested! We offer custom digital solutions starting from just ₹5,999. Are you looking for a website, a mobile app, or AI automation? Tell me a bit more!';
};
