import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit a new contact form lead for metrobrain-tech
 */
export const submitLead = async (leadData) => {
  if (!supabase) {
    console.warn('Supabase not configured. Lead will only be sent via WhatsApp.');
    return { success: false, error: 'Not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('contacts') // Reusing 'contacts' table from metrobrain
      .insert([
        {
          name: leadData.name,
          phone: leadData.phone,
          email: `${leadData.phone || Date.now()}@metrobrain-tech.internal`, // Placeholder to satisfy DB constraint
          message: leadData.concept,
          service_interest: leadData.services,
          status: 'new'
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error };
  }
};
