import React, { useEffect, useRef } from 'react';
import { FiPhone, FiMail, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Founders = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(".founder-card", 
      { opacity: 0, scale: 0.9, y: 50 },
      { 
        opacity: 1, 
        scale: 1,
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".founders-grid",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo("#founders .section-header",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#founders .section-header",
          start: "top 85%",
        }
      }
    );
  }, []);

  const founders = [
    {
      name: 'Yash Lohare',
      role: 'Founder & CEO',
      contact: '7047123555',
      email: 'metrobraintechnologies@gmail.com',
      image: '/yash.jpg',
      bio: 'Visionary technologist specialized in AI systems and enterprise architecture.',
      linkedin: 'https://www.linkedin.com/in/yash-lohare-669033206?',
      instagram: 'https://www.instagram.com/yashlohare17?'
    },
    {
      name: 'Adinath Made',
      role: 'Co-Founder & CTO',
      contact: '8805775486',
      email: 'metrobraintechnologies@gmail.com',
      image: '/adinath.jpg',
      bio: 'Expert in full-stack development and scaling digital infrastructure for the modern web.',
      linkedin: 'https://www.linkedin.com/in/adinath-made-763a4537b?',
      instagram: 'https://www.instagram.com/adinath_made?'
    }
  ];

  return (
    <section id="founders" className="section" ref={sectionRef}>
      <div className="stich-divider" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">The Minds Behind</span>
          <h2 className="section-title">Meet Our <span className="gradient-text">Founders</span></h2>
          <p className="section-subtitle">
            Leading the charge in AI innovation and digital transformation at Metrobrain Technologies.
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div 
              key={index}
              className="founder-card glass-card"
            >
              <div className="founder-avatar">
                <div className="avatar-square">
                  <img src={founder.image} alt={founder.name} className="founder-img" />
                </div>
              </div>
              <div className="founder-info">
                <h3>{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <div className="founder-bio">{founder.bio}</div>
                
                <div className="founder-contact">
                  <div className="contact-item">
                    <FiPhone /> <span>{founder.contact}</span>
                  </div>
                  <div className="contact-item">
                    <FiMail /> <span>{founder.email}</span>
                  </div>
                </div>

                <div className="founder-social">
                  {founder.linkedin && <a href={founder.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>}
                  {founder.instagram && <a href={founder.instagram} target="_blank" rel="noopener noreferrer"><FiInstagram /></a>}
                  <a href="#"><FiGithub /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
