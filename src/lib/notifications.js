/**
 * Sends a notification to a Telegram Bot when a new lead is submitted.
 * Requires VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env
 */
export const sendLeadNotification = async (leadData) => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === 'your_bot_token' || chatId === 'your_chat_id') {
    console.warn('[Notifications] Telegram credentials missing. Skipping notification.');
    return;
  }

  const message = `
🚀 *New Lead from Metrobrain-Tech!*

👤 *Name:* ${leadData.name}
📞 *Phone:* ${leadData.phone}
📧 *Email:* ${leadData.email || 'Not provided'}
💼 *Interest:* ${leadData.service || 'General Enquiry'}
💬 *Message:* ${leadData.message || 'No message'}

---
_Sent from Metrobrain-Tech AI Agent_
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.description || 'Failed to send Telegram message');
    }

    console.log('[Notifications] Lead notification sent successfully!');
  } catch (error) {
    console.error('[Notifications] Error sending notification:', error);
  }
};
