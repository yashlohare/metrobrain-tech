"use server";

// Foundry Persona Definition
const SYSTEM_PROMPT = `You are Metrobrain AI, the Technical Intelligence at Metrobrain Technology. 
Our foundry specializes in:
1. High-Performance Web Architectures (Next.js, React).
2. Cross-platform Mobile Ecosystems (iOS, Android).
3. Custom AI & LLM Intelligence (Chatbots, Data Analysis).
4. Strategic SEO & Digital Growth.

Your tone should be: Professional, Technical, Efficient, and Agency-grade.
Always prioritize getting the user to the "Contact Form" or "Pricing" if they have specific project needs.
Current Project starting price: ₹5,999 (Starter).
Professional pricing: ₹19,999.
Enterprise pricing: ₹49,999.`;

/**
 * Structured Agent Response including machine-readable actions
 */
export async function getFoundryResponse(message: string) {
  const msg = message.toLowerCase();
  
  // High-performance delay simulation for "Intelligence Feel"
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

  // Intelligence Routing Logic (Agent-based)
  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("billing")) {
    return {
      content: "Metrobrain offers three main engineering tiers: Starter (₹5,999), Professional (₹19,999), and Enterprise (₹49,999). I'm scrolling you to the detailed Pricing breakdown now.",
      action: "SCROLL_TO_PRICING"
    };
  }
  
  if (msg.includes("ai") || msg.includes("llm") || msg.includes("chatbot")) {
    return {
      content: "We architect custom LLM solutions using GPT-4 and Gemini cores. I'll take you to our Service Matrix where you can see our AI capabilities.",
      action: "SCROLL_TO_SERVICES"
    };
  }

  if (msg.includes("work") || msg.includes("portfolio") || msg.includes("show me")) {
    return {
      content: "Accessing the Project Archive. Here are some of our latest high-performance builds.",
      action: "SCROLL_TO_WORK"
    };
  }

  if (msg.includes("contact") || msg.includes("talk") || msg.includes("hire") || msg.includes("start")) {
    return {
      content: "Excellent choice. I'm moving you to the Project Proposal area so you can submit your requirements directly to our lead engineers.",
      action: "SCROLL_TO_CONTACT"
    };
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("namaste")) {
    return {
      content: "Namaste! I am Metrobrain AI, your Technical Intelligence. I can guide you through our engineering services, show you our work, or help you start a new project. How can I assist you today?",
      action: null
    };
  }

  // Default intelligent fallback
  return {
    content: "That's an interesting technical challenge. To give you the most accurate architecture advice, I'd recommend submitting a brief through our Contact Form. I'll scroll you there now.",
    action: "SCROLL_TO_CONTACT"
  };
}
