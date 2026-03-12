import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 150, suffix: '+', label: 'Projects Completed' },
  { number: 50, suffix: '+', label: 'Happy Clients' },
  { number: 5, suffix: '+', label: 'Years Experience' },
  { number: 24, suffix: '/7', label: 'Support Available' },
];

const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        if (!animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      }
    });
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(".about-text", 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".about-stat-card", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-stats-grid",
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="stich-divider" />
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <span className="section-label">About Us</span>
            <h3>We're a Team of Digital Innovators</h3>
            <p>
              At Metrobrain Technologies, we combine creativity with technology to build digital 
              experiences that matter. From startups to enterprises, we help businesses 
              transform their ideas into powerful digital products.
            </p>
            <p>
              Our team of expert developers, designers, and strategists work together 
              to deliver solutions that don't just meet expectations — they exceed them. 
              We believe in clean code, stunning design, and measurable results.
            </p>
            <p>
              Whether you need a web app, mobile app, AI chatbot, or a complete digital 
              marketing strategy — we've got you covered.
            </p>
          </div>

          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card about-stat-card">
                <div className="number">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
