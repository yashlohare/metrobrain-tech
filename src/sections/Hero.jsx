import { useState, useEffect, useRef, useCallback } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FiArrowRight, FiPlay, FiCpu } from 'react-icons/fi';
import { GiBrain } from 'react-icons/gi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [init, setInit] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Intelligence that Inspires Innovation';
  const brainRef1 = useRef(null);
  const brainRef2 = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    // GSAP Entrances
    gsap.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    gsap.fromTo(".hero-description", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
    gsap.fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" });
    gsap.fromTo(".hero-stat", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, delay: 1.2, stagger: 0.2, ease: "back.out(1.7)" });

    // Magnetic Mouse Follow
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveIcon = (ref, factor) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (clientX - centerX) / factor;
        const y = (clientY - centerY) / factor;
        gsap.to(ref.current, { x, y, duration: 0.6, ease: "power2.out" });
      };
      moveIcon(brainRef1, 15);
      moveIcon(brainRef2, -15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { 
        value: 0.15,
        animation: { enable: true, speed: 0.3, minimumValue: 0.05 } 
      },
      size: { value: { min: 0.5, max: 1.2 } },
      links: {
        enable: true,
        distance: 180,
        color: "#00d4ff",
        opacity: 0.2, // Very subtle lines
        width: 0.5,   // Fine lines
        triangles: {
          enable: false // Clean look
        }
      },
      move: {
        enable: true,
        speed: 0.6, // Slow, professional movement
        direction: "none",
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5, color: "#00d4ff" } },
        push: { quantity: 2 },
      },
    },
    detectRetina: true,
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      {init && <Particles id="tsparticles" options={particlesOptions} />}
      
      <div className="hero-brain-icon" ref={brainRef1}><GiBrain /></div>
      <div className="hero-brain-icon-2" ref={brainRef2}><GiBrain /></div>
      
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          Neural-Powered Tech Agency
        </div>
        
        <h1 className="hero-title">
          We Create <br />
          <span className="gradient-text">{typedText}</span>
          <span style={{ 
            borderRight: '2px solid var(--accent-blue)', 
            animation: 'pulse 1s infinite',
            marginLeft: '2px'
          }}>&nbsp;</span>
        </h1>
        
        <p className="hero-description">
          Transform your business with cutting-edge web applications, mobile apps, 
          AI chatbots, and digital marketing solutions. We turn your vision into reality.
        </p>
        
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">
            Get Started <FiArrowRight />
          </a>
          <a href="#services" className="btn btn-secondary">
            <FiPlay /> Our Services
          </a>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="number">3+</div>
            <div className="label">Projects Delivered</div>
          </div>
          <div className="hero-stat">
            <div className="number">1+</div>
            <div className="label">Happy Clients</div>
          </div>
          <div className="hero-stat">
            <div className="number">100%</div>
            <div className="label">Client Satisfaction</div>
          </div>
        </div>
      </div>
      <div className="stich-divider" style={{ position: 'absolute', bottom: 0, left: 0 }} />
    </section>
  );
};

export default Hero;
