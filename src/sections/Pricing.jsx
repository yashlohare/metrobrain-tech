import { useEffect, useRef } from 'react';
import { FiCheck } from 'react-icons/fi';

const plans = [
  {
    name: 'Starter',
    price: '5,999',
    period: 'starting from',
    features: [
      'Stunning Landing Page',
      'Mobile Responsive Design',
      'Contact Form Integration',
      'Basic SEO Setup',
      '15 Days Post-Launch Support',
      'Free Hosting Setup',
    ],
    featured: false,
  },
  {
    name: 'Professional',
    price: '19,999',
    period: 'starting from',
    features: [
      'Up to 5 Pages Website',
      'Custom UI/UX Design',
      'Basic Database Setup',
      'Admin Dashboard (Standard)',
      'Basic AI Chatbot',
      'Advanced SEO Strategy',
      '1 Month Free Support',
      'Fast Performance',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '49,999',
    period: 'starting from',
    features: [
      'Custom Web Application',
      'Mobile App (basic wrapper)',
      'Advanced AI Integration',
      'Payment Gateway Setup',
      'Digital Marketing Launch',
      'Social Media Ad Setup',
      '3 Months Priority Support',
      'Dedicated Manager',
    ],
    featured: false,
  },
];

const Pricing = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the plan that fits your needs. All plans include free consultation and project planning.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card pricing-card animate-on-scroll ${plan.featured ? 'featured' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="pricing-plan-name">{plan.name}</div>
              <div className="pricing-price">
                <span className="currency">₹</span>{plan.price}
              </div>
              <div className="pricing-period">{plan.period}</div>

              <div className="pricing-features">
                {plan.features.map((feature, i) => (
                  <div key={i} className="pricing-feature">
                    <FiCheck className="check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`btn pricing-btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
        
        <div className="pricing-disclaimer animate-on-scroll" style={{ 
          marginTop: '40px', 
          fontSize: '0.75rem', 
          color: 'var(--text-muted)', 
          opacity: 0.6,
          textAlign: 'center',
          letterSpacing: '0.5px'
        }}>
          * Prices are indicative based on standard requirements. Extra charges may apply for advanced customizations or third-party integrations.
        </div>
      </div>
    </section>
  );
};

export default Pricing;
