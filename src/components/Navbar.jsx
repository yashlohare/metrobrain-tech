import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logoImg from '../assets/logo_transparent.png';


const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#home" className="nav-logo">
            <img src={logoImg} alt="Metrobrain Logo" className="navbar-logo-img" />
            <span>Metrobrain Technologies</span>
          </a>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary nav-cta"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Let's Talk
            </a>
          </div>

          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(true)}>
            <FiMenu />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="nav-mobile-close" onClick={() => setMobileOpen(false)}>
          <FiX />
        </button>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-link"
            onClick={(e) => handleNavClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn-primary"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Talk
        </a>
      </div>
    </>
  );
};

export default Navbar;
