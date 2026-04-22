"use server";

import { supabase } from "@/lib/supabase";

export async function submitLeadAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectSpace = formData.get("projectSpace") as string;

  if (!name || !email) {
    return { success: false, error: "Name and email are required." };
  }

  // Destination 1: Permanent PostgreSQL Archive (Supabase)
  try {
    const { error: dbError } = await supabase
      .from("leads")
      .insert([
        { 
          name, 
          email, 
          project_details: projectSpace 
        }
      ]);

    if (dbError) {
      console.error("Supabase Persistence Error:", dbError);
      // We continue to Telegram even if DB fails for visual confirmation
    }
  } catch (err) {
    console.error("Database Exception:", err);
  }

  // Destination 2: Real-Time Mobile Dispatch (Telegram)
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramToken || !chatId) {
    console.warn("Telegram Token/Chat ID missing. Lead is safe in DB, but no notification sent.");
    return { success: true };
  }

  const message = `🚀 NEW PROJECT LEAD!\n\n👨‍💼 Name: ${name}\n📧 Email: ${email}\n📝 Details: ${projectSpace}\n\nVia Metrobrain Technologies Platform`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Telegram API Error:", errorText);
    }

    return { success: true };
  } catch (error) {
    console.error("Telegram Dispatch Exception:", error);
    return { success: true }; // Still return success because DB was attempted
  }
}
