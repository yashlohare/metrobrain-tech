import { FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="nav-logo">Metrobrain Technologies</a>
            <p>
              Building the future of digital experiences. We create web apps, 
              mobile apps, AI solutions, and digital marketing strategies that drive growth.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="GitHub"><FiGithub /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="https://www.linkedin.com/in/yash-lohare-669033206?" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="https://www.instagram.com/metrobraintechnologies?igsh=Y3E4aGZnOGUxazI3&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <a href="#services">Web Applications</a>
            <a href="#services">Mobile Apps</a>
            <a href="#services">AI Chatbots</a>
            <a href="#services">Digital Marketing</a>
            <a href="#services">UI/UX Design</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#portfolio">Our Work</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <a href="mailto:metrobraintechnologies@gmail.com">metrobraintechnologies@gmail.com</a>
            <a href="tel:+917047123555">+91 70471 23555 / 88057 75486</a>
            <a href="#">Chennai, Tamil Nadu</a>
            <a href="#">India</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Metrobrain Technologies. All rights reserved.</span>
          <span>Crafted with ❤️ in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
