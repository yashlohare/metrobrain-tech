import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FiUsers, FiMessageSquare, FiFolder, FiStar, FiLogOut, FiRefreshCw } from 'react-icons/fi';

const Dashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('leads');
  const [stats, setStats] = useState({ leads: 0, chats: 0, projects: 6, testimonials: 5 });
  const [leads, setLeads] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    onLogout();
  };

  const fetchData = async () => {
    setLoading(true);
    
    if (!supabase) {
      // Mock data for demo if not connected
      setTimeout(() => {
        setLeads([
          { id: 1, name: 'John Doe', email: 'john@example.com', service_interest: 'web', message: 'Need a new website.', created_at: new Date().toISOString() },
          { id: 2, name: 'Jane Smith', email: 'jane@test.com', service_interest: 'chatbot', message: 'Looking for AI bot.', created_at: new Date(Date.now() - 86400000).toISOString() }
        ]);
        setChats([
          { id: '1', session_id: 'sess_123', messages: 12, last_active: new Date().toISOString() },
          { id: '2', session_id: 'sess_456', messages: 4, last_active: new Date(Date.now() - 3600000).toISOString() }
        ]);
        setStats({ leads: 2, chats: 2, projects: 6, testimonials: 5 });
        setLoading(false);
      }, 800);
      return;
    }

    try {
      // Fetch Leads
      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (contactsData) setLeads(contactsData);

      // We'd fetch actual chat sessions grouped by session_id here
      // This is a simplified version
      const { data: chatData } = await supabase
        .from('chat_history')
        .select('session_id')
        .order('created_at', { ascending: false });
        
      if (chatData) {
        // Simple grouping count
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-brand">Metrobrain Technologies Admin</div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
            <FiUsers /> Leads ({stats.leads})
          </button>
          <button className={`admin-nav-item ${activeTab === 'chats' ? 'active' : ''}`} onClick={() => setActiveTab('chats')}>
            <FiMessageSquare /> Chat Logs
          </button>
          <button className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <FiFolder /> Portfolio
          </button>
          <button className={`admin-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`} onClick={() => setActiveTab('testimonials')}>
            <FiStar /> Testimonials
          </button>
        </nav>
        
        <div className="admin-user-section">
          <div className="admin-user">{session?.user?.email || 'admin@metrobraintechnologies.com'}</div>
          <button className="btn btn-secondary admin-logout" onClick={handleLogout}>
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
            <div className="admin-loading">Loading data...</div>
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
                        <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.phone}</td>
                        <td><span className="badge">{lead.service_interest}</span></td>
                        <td className="msg-cell">{lead.message && lead.message.length > 50 ? `${lead.message.substring(0, 50)}...` : lead.message}</td>
                        <td>
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
                      <th>Message Count</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chats.map(chat => (
                      <tr key={chat.session_id}>
                        <td>{chat.session_id}</td>
                        <td>{chat.messages} messages</td>
                        <td><button className="btn-small">View Logs</button></td>
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
