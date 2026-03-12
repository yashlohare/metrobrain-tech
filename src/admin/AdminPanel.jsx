import { useState, useEffect } from 'react';
import AdminLogin, { ADMIN_SESSION_KEY } from './AdminLogin';
import Dashboard from './Dashboard';
import { supabase } from '../lib/supabase';
import './admin.css';

const AdminPanel = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check localStorage first (Remember Me), then sessionStorage
    const stored = localStorage.getItem(ADMIN_SESSION_KEY) || sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (stored) {
      try {
        setSession(JSON.parse(stored));
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }

    // 2. Fall back to Supabase session check
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="admin-loading">Loading Admin Panel...</div>;
  }

  return (
    <div className="admin-wrapper">
      {!session ? (
        <AdminLogin onLogin={setSession} />
      ) : (
        <Dashboard session={session} onLogout={() => setSession(null)} />
      )}
    </div>
  );
};

export default AdminPanel;
