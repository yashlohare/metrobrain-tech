import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FiUsers, FiMessageSquare, FiFolder, FiStar, FiLogOut, FiRefreshCw, FiMenu, FiX } from 'react-icons/fi';
import { ADMIN_SESSION_KEY } from './AdminLogin';

const Dashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('leads');
  const [stats, setStats] = useState({ leads: 0, chats: 0, projects: 3, testimonials: 0 });
  const [leads, setLeads] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    if (supabase) await supabase.auth.signOut();
    onLogout();
  };

  const fetchData = async () => {
    setLoading(true);
    
    if (!supabase) {
      setTimeout(() => {
        setLeads([
          { id: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', service_interest: 'web', message: 'Need a new website.', created_at: new Date().toISOString() },
          { id: 2, name: 'Jane Smith', email: 'jane@test.com', phone: '9876543211', service_interest: 'chatbot', message: 'Looking for AI bot.', created_at: new Date(Date.now() - 86400000).toISOString() }
        ]);
        setStats({ leads: 2, chats: 0, projects: 6, testimonials: 5 });
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (contactsData) setLeads(contactsData);

      const { data: chatData } = await supabase
        .from('chat_history')
        .select('session_id')
        .order('created_at', { ascending: false });
        
      if (chatData) {
        const uniqueSessions = new Set(chatData.map(c => c.session_id));
        setChats(Array.from(uniqueSessions).map(sid => ({ session_id: sid, messages: chatData.filter(c => c.session_id === sid).length })));
      }

      setStats(prev => ({ 
        ...prev, 
        leads: contactsData?.length || 0,
        chats: chatData ? new Set(chatData.map(c => c.session_id)).size : 0
      }));
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useState(() => { fetchData(); }, []);

  const navItems = [
    { id: 'leads', icon: <FiUsers />, label: `Leads (${stats.leads})` },
    { id: 'chats', icon: <FiMessageSquare />, label: 'Chat Logs' },
    { id: 'projects', icon: <FiFolder />, label: 'Portfolio' },
    { id: 'testimonials', icon: <FiStar />, label: 'Testimonials' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // close sidebar on mobile after nav
  };

  return (
    <div className="admin-dashboard">
      {/* Mobile top bar */}
      <div className="admin-mobile-topbar">
        <span className="admin-mobile-brand">Metrobrain Admin</span>
        <button className="admin-hamburger" onClick={() => setSidebarOpen(o => !o)}>
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="admin-brand">Metrobrain Technologies Admin</div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        
        <div className="admin-user-section">
          <div className="admin-user">{session?.user?.email || 'admin@metrobrain.in'}</div>
          <button className="admin-logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <h2>Dashboard</h2>
          <button className="refresh-btn" onClick={fetchData} disabled={loading}>
            <FiRefreshCw className={loading ? 'spinning' : ''} /> Refresh
          </button>
        </div>

        <div className="admin-stats-cards">
          <div className="glass-card stat-card">
            <div className="stat-icon"><FiUsers /></div>
            <div className="stat-value">{stats.leads}</div>
            <div className="stat-label">Total Leads</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-icon"><FiMessageSquare /></div>
            <div className="stat-value">{stats.chats}</div>
            <div className="stat-label">AI Chat Sessions</div>
          </div>
        </div>

        <div className="admin-content glass-card">
          {loading ? (
            <div className="empty-state">Loading data...</div>
          ) : activeTab === 'leads' ? (
            <div className="data-table-wrapper">
              <h3>Recent Leads</h3>
              {leads.length === 0 ? <p className="empty-state">No leads yet.</p> : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map(lead => (
                      <tr key={lead.id || lead.created_at}>
                        <td data-label="Date">{new Date(lead.created_at).toLocaleDateString()}</td>
                        <td data-label="Name">{lead.name}</td>
                        <td data-label="Email">{lead.email}</td>
                        <td data-label="Phone">{lead.phone}</td>
                        <td data-label="Service"><span className="badge">{lead.service_interest}</span></td>
                        <td data-label="Message" className="msg-cell">{lead.message && lead.message.length > 50 ? `${lead.message.substring(0, 50)}...` : lead.message}</td>
                        <td data-label="Action">
                          <button 
                            className="btn-small whatsapp-btn" 
                            onClick={() => window.open(`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}`, '_blank')}
                          >
                            WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : activeTab === 'chats' ? (
            <div className="data-table-wrapper">
              <h3>AI Chat Sessions</h3>
              {chats.length === 0 ? <p className="empty-state">No chat sessions yet.</p> : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Session ID</th>
                      <th>Messages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chats.map(chat => (
                      <tr key={chat.session_id}>
                        <td data-label="Session">{chat.session_id}</td>
                        <td data-label="Messages">{chat.messages} messages</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
             <div className="coming-soon">
               <h3>Coming Soon</h3>
               <p>CMS for managing {activeTab} will be available in the next update.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
