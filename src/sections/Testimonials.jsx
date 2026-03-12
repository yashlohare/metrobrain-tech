import { useEffect, useRef, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Rahul Sharma',
    company: 'TechStart India',
    review: 'Metrobrain Technologies delivered our e-commerce platform in just 4 weeks. The quality of code and design was exceptional. Highly recommend!',
    rating: 5,
    initials: 'RS',
  },
  {
    name: 'Priya Patel',
    company: 'FoodHub',
    review: 'The mobile app they built for us increased our orders by 300%. Their team truly understands user experience and business needs.',
    rating: 5,
    initials: 'PP',
  },
  {
    name: 'Amit Deshmukh',
    company: 'GreenLeaf Organic',
    review: 'Their AI chatbot handles 80% of our customer queries automatically. It saved us from hiring 3 support staff. Amazing ROI!',
    rating: 5,
    initials: 'AD',
  },
  {
    name: 'Sneha Kulkarni',
    company: 'FashionVerse',
    review: 'The social media campaign Metrobrain Technologies ran for us got us 50,000 new followers in 2 months. Their marketing strategies actually work!',
    rating: 5,
    initials: 'SK',
  },
  {
    name: 'Vikram Singh',
    company: 'PropDeal Realty',
    review: 'Our property portal looks world-class. The virtual tour feature they added is a game changer. Clients love it!',
    rating: 5,
    initials: 'VS',
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(".testimonial-card", 
      { opacity: 0, scale: 0.9, y: 30 },
      { 
        opacity: 1, 
        scale: 1,
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-track",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo("#testimonials .section-header",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#testimonials .section-header",
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section className="section" id="testimonials" ref={sectionRef}>
      <div className="stich-divider" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="testimonials-track">
          {testimonials.map((t, index) => (
            <div key={index} className="glass-card testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FiStar key={i} fill="#fbbf24" />
                ))}
              </div>
              <blockquote>"{t.review}"</blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <h4>{t.name}</h4>
                  <span>{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
