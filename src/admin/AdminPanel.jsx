import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import { supabase } from '../lib/supabase';
import './admin.css';

const AdminPanel = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false); // No supabase configured
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
