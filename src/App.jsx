import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-[0_0_20px_rgba(244,114,182,0.5)]">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
              Metrobrain <span className="text-pink-400">Tech</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            <Link to="/portfolio" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Our Work</Link>
            <Link to="/contact" className="px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-bold hover:bg-slate-200 transition-all transform hover:scale-105">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mb-2">Metrobrain Technologies</h3>
        <p className="text-slate-400 text-sm mb-8 text-center max-w-md">Transforming ideas into digital reality through stunning web development and innovative e-commerce solutions.</p>
        <p className="text-slate-600 text-xs text-center">&copy; {new Date().getFullYear()} Metrobrain Educare Pvt.Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-50 selection:bg-pink-500/30">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
