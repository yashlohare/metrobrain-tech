import { useEffect, useRef, useState } from 'react';
import { FiMonitor, FiSmartphone, FiMessageSquare, FiTrendingUp, FiPenTool, FiSearch, FiCpu, FiShield, FiDatabase } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <FiCpu />,
    title: 'LLM AI Applications',
    description: 'Custom Large Language Model (LLM) applications powered by cutting-edge AI for advanced data processing, automation, and intelligent decision making.',
    span: 'large',
    color: '#00d4ff'
  },
  {
    icon: <FiMonitor />,
    title: 'Web Applications',
    description: 'High-performance, scalable web apps built with React, Next.js, and modern cloud architectures.',
    span: 'medium',
    color: '#7c3aed'
  },
  {
    icon: <FiSmartphone />,
    title: 'Mobile Apps',
    description: 'Native-feel iOS and Android experiences targeting global reaches.',
    span: 'small',
    color: '#ec4899'
  },
  {
    icon: <FiMessageSquare />,
    title: 'AI Chatbots',
    description: 'Multi-lingual intelligent agents for 24/7 engagement.',
    span: 'small',
    color: '#00d4ff'
  },
  {
    icon: <FiTrendingUp />,
    title: 'Digital Growth',
    description: 'SEO and Social Media strategies that dominate the market.',
    span: 'medium',
    color: '#7c3aed'
  },
  {
    icon: <FiShield />,
    title: 'Cyber Security',
    description: 'Advanced protection for your digital brain and neural assets.',
    span: 'small',
    color: '#ec4899'
  },
  {
    icon: <FiDatabase />,
    title: 'Cloud Infra',
    description: 'Scalable backend systems and database orchestration.',
    span: 'small',
    color: '#00d4ff'
  }
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card service-card bento-${service.span}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transitionDelay: `${index * 0.1}s`,
        '--x': `${position.x}px`,
        '--y': `${position.y}px`,
        '--spotlight-color': service.color
      }}
    >
      <div className="spotlight" style={{ opacity: isHovered ? 1 : 0 }} />
      <div className="service-icon" style={{ background: `${service.color}20`, color: service.color }}>
        {service.icon}
      </div>
      <div className="service-info">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
      <div className="card-border-glow" style={{ opacity: isHovered ? 1 : 0, borderColor: service.color }} />
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger for staggered card entry
    gsap.fromTo(".service-card", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-bento-grid",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".section-header",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section className="section" id="services" ref={sectionRef}>
      <div className="stich-divider" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Services We Offer</h2>
          <p className="section-subtitle">
            End-to-end digital solutions that help your business grow and stand out in the digital world.
          </p>
        </div>

        <div className="services-bento-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
