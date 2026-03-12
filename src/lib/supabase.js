import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if credentials aren't provided yet
// This prevents the app from crashing while the user is setting things up
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit a new contact form lead
 */
export const submitContact = async (contactData) => {
  if (!supabase) {
    console.warn('Supabase not configured. Mocking contact submission.');
    return { success: true, data: contactData };
  }

  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: contactData.name,
          email: contactData.email || 'no-email@provided.com',
          phone: contactData.phone,
          service_interest: contactData.service,
          message: contactData.message,
          status: 'new'
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error };
  }
};

export const submitLead = submitContact;

/**
 * Save a chat message to history
 */
export const saveChatMessage = async (sessionId, role, content, language = 'en') => {
  if (!supabase) return { success: true, mock: true };

  try {
    const { data, error } = await supabase
      .from('chat_history')
      .insert([
        {
          session_id: sessionId,
          role: role,
          content: content,
          language: language
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving chat message:', error);
    return { success: false, error };
  }
};

/**
 * Get portfolio projects
 */
export const getProjects = async () => {
  if (!supabase) return { success: false, error: 'Not configured' };

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error };
  }
};

/**
 * Get testimonials
 */
export const getTestimonials = async () => {
  if (!supabase) return { success: false, error: 'Not configured' };

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return { success: false, error };
  }
};
