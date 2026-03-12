import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

const ADMIN_SESSION_KEY = 'metrotech_admin_session';

const AdminLogin = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const targetUserId = 'metrotech';
    const targetPassword = 'Metro@2026';

    try {
      if (userId === targetUserId && password === targetPassword) {
        const sessionData = { user: { email: userId, id: 'admin-manual' } };
        if (rememberMe) {
          localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
        } else {
          sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
        }
        onLogin(sessionData);
        return;
      }

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userId.includes('@') ? userId : `${userId}@metrobrain.in`,
          password,
        });

        if (error) throw error;
        if (data.session) {
          if (rememberMe) {
            localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(data.session));
          }
          onLogin(data.session);
        }
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
              <FiUser className="input-icon" />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                placeholder="metrotech"
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

          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me for 30 days
          </label>

          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : <><FiArrowRight /> Login</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export { ADMIN_SESSION_KEY };
export default AdminLogin;
