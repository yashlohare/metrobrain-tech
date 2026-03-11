import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FiUsers, FiMessageSquare, FiFolder, FiStar, FiLogOut, FiRefreshCw } from 'react-icons/fi';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [stats, setStats] = useState({ leads: 0, chats: 0, projects: 6, testimonials: 5 });
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    
    if (!supabase) {
      setTimeout(() => {
        setLeads([
          { id: 1, name: 'John Doe', phone: '+91 98765 43210', service_interest: 'web', message: 'Need a new website.', created_at: new Date().toISOString() },
          { id: 2, name: 'Jane Smith', phone: '+91 88888 88888', service_interest: 'chatbot', message: 'Looking for AI bot.', created_at: new Date(Date.now() - 86400000).toISOString() }
        ]);
        setStats({ leads: 2, chats: 0, projects: 6, testimonials: 5 });
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (contactsData) setLeads(contactsData);

      setStats(prev => ({ 
        ...prev, 
        leads: contactsData?.length || 0
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
    <div className="flex-grow flex flex-col pt-10 px-4 md:px-8 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Admin <span className="text-pink-400">Dashboard</span></h2>
            <p className="text-slate-400">Monitor your project leads and inquiries.</p>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
            onClick={fetchData} 
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-2xl border-white/5 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 text-xl">
              <FiUsers />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.leads}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Leads</div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-xl">Recent Project Inquiries</h3>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center text-slate-400">
                <FiRefreshCw className="animate-spin text-4xl mx-auto mb-4" />
                Loading your leads...
              </div>
            ) : leads.length === 0 ? (
              <div className="p-20 text-center text-slate-400">No leads found yet.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-4 font-semibold text-slate-300 text-sm">Date</th>
                    <th className="p-4 font-semibold text-slate-300 text-sm">Client Name</th>
                    <th className="p-4 font-semibold text-slate-300 text-sm">Contact</th>
                    <th className="p-4 font-semibold text-slate-300 text-sm">Service</th>
                    <th className="p-4 font-semibold text-slate-300 text-sm">Concept/Message</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id || lead.created_at} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-slate-400 text-sm">{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td className="p-4 font-bold text-white text-sm">{lead.name}</td>
                      <td className="p-4 text-slate-300 text-sm">{lead.phone || lead.email}</td>
                      <td className="p-4 text-sm">
                         <span className="px-2 py-1 rounded-md bg-pink-500/10 text-pink-400 text-[10px] uppercase font-bold tracking-widest border border-pink-500/20">
                           {lead.service_interest || 'General'}
                         </span>
                      </td>
                      <td className="p-4 text-slate-400 text-sm max-w-xs truncate">
                        {lead.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
