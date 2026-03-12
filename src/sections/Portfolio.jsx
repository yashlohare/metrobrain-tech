import { useEffect, useRef, useState } from 'react';
import { FiExternalLink, FiFigma, FiGithub, FiLayout } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  figma: FiFigma,
  external: FiExternalLink,
  github: FiGithub,
  layout: FiLayout,
};

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    prototypes: [
      { label: 'Interactive Demo', icon: 'external', url: '/prototypes/ecommerce' },
      { label: 'Figma UI', icon: 'figma', url: 'https://www.figma.com/community/explore' },
      { label: 'Admin Dashboard UI', icon: 'layout', url: 'https://www.figma.com/community/explore' }
    ]
  },
  {
    title: 'Food Delivery App',
    description: 'Cross-platform mobile app with real-time tracking and order management.',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    prototypes: [
      { label: 'Interactive Demo', icon: 'external', url: '/prototypes/food-delivery' },
      { label: 'App Prototype (Figma)', icon: 'figma', url: 'https://www.figma.com/community/explore' }
    ]
  },
  {
    title: 'AI Customer Support Bot',
    description: 'Intelligent chatbot handling 10,000+ queries daily with 95% accuracy.',
    category: 'Chatbot',
    image: '/ai_support_bot.png',
    prototypes: [
      { label: 'Interactive Demo', icon: 'external', url: '/prototypes/ai-bot' },
      { label: 'Flow Diagram', icon: 'layout', url: 'https://www.figma.com/community/explore' },
      { label: 'Widget Integration', icon: 'github', url: 'https://github.com/metrobrain-technologies' }
    ]
  },
  {
    title: 'Fitness Tracking App',
    description: 'Health & fitness app with AI-powered workout plans and progress tracking.',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
    prototypes: [
      { label: 'Interactive Demo', icon: 'external', url: '/prototypes/fitness' },
      { label: 'UI Wireframes', icon: 'figma', url: 'https://www.figma.com/community/explore' }
    ]
  },
  {
    title: 'Real Estate Portal',
    description: 'Property listing platform with virtual tours and advanced search filters.',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    prototypes: [
      { label: 'Interactive Demo', icon: 'external', url: '/prototypes/real-estate' },
      { label: 'Broker Dashboard', icon: 'layout', url: 'https://www.figma.com/community/explore' }
    ]
  },
  {
    title: 'Metrobrain Educational Platform',
    description: 'Partner project: Custom LMS for Metrobrain Educare Pvt.Ltd providing online education.',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
    prototypes: [
      { label: 'Interactive Demo', icon: 'external', url: '/prototypes/lms' },
      { label: 'Metrobrain.in Live', icon: 'external', url: 'https://metrobrain.in/' },
      { label: 'LMS Student Portal UI', icon: 'figma', url: 'https://www.figma.com/community/explore' }
    ]
  },
];

const categories = ['All', 'Web App', 'Mobile App', 'Chatbot'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    // GSAP ScrollTrigger for staggered project entry
    gsap.fromTo(".project-card", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo("#portfolio .section-header",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#portfolio .section-header",
          start: "top 85%",
        }
      }
    );
  }, [filtered]);

  return (
    <section className="section" id="portfolio" ref={sectionRef}>
      <div className="stich-divider" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">
            Take a look at some of our recent work and see the quality we deliver.
          </p>
        </div>

        <div className="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filtered.map((project, index) => (
            <div
              key={index}
              className="glass-card project-card"
              style={{ transitionDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              onClick={() => {
                if (project.prototypes && project.prototypes.length > 0) {
                  window.open(project.prototypes[0].url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.prototypes && (
                  <div className="project-prototypes">
                    <span className="proto-label">Prototypes</span>
                    <div className="prototype-links">
                      {project.prototypes.map((proto, idx) => {
                        const IconComponent = iconMap[proto.icon];
                        return (
                          <a 
                            key={idx} 
                            href={proto.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="prototype-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {IconComponent && <IconComponent className="proto-icon" />}
                            {proto.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
