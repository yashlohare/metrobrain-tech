import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';

const AdminLogin = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Map "userid-metrotech" to a valid email-like if Supabase is being used
    // For now, we will treat it as a string check for the demo/fallback
    const targetUserId = 'metrotech';
    const targetPassword = 'Metro@2026';

    try {
      // Manual check for the provided metrotech credentials
      if (userId === targetUserId && password === targetPassword) {
        console.log("Admin logged in via manual fallback.");
        onLogin({ user: { email: userId, id: 'admin-manual' } });
        return;
      }

      if (supabase) {
        // Attempt real Supabase login if user wants to use database auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userId.includes('@') ? userId : `${userId}@metrobrain.in`,
          password,
        });

        if (error) throw error;
        if (data.session) onLogin(data.session);
      } else {
        setError('Invalid credentials. Please use your provided UserID and Password.');
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="glass-card login-card">
        <div className="login-header">
          <h2>Admin Access</h2>
          <p>Login with your Metrotech ID.</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>UserID</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                placeholder="userid-metrotech"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : <><FiArrowRight /> Login</>}
          </button>
        </form>
      </div>
    </div>
  );

};

export default AdminLogin;
