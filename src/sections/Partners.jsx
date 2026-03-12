import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'Metrobrain Educare Pvt.Ltd', url: 'https://metrobrain.in/', isCustomer: true },
];

const Partners = () => {
  useEffect(() => {
    gsap.fromTo(".partners-section .section-subtitle",
      { opacity: 0, y: 10 },
      {
        opacity: 0.7,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".partners-section",
          start: "top 90%",
        }
      }
    );
    
    gsap.fromTo(".partner-logo-item",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".partners-marquee",
          start: "top 95%",
        }
      }
    );
  }, []);
  return (
    <section className="section partners-section pb-0">
      <div className="container">
        <div className="section-header mb-8 text-center">
          <p className="section-subtitle">Trusted by industry leaders and proud partners with</p>
        </div>
        
        <div className="partners-marquee-container">
          {partners.length === 1 ? (
            /* Single partner — show centered, no scroll */
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <a
                href={partners[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-logo-item highlighted-partner"
              >
                <span className="partner-badge">Premium Partner &amp; Customer</span>
                <h3 className="partner-name">{partners[0].name}</h3>
              </a>
            </div>
          ) : (
            /* Multiple partners — scrolling marquee */
            <div className="partners-marquee">
              {[...partners, ...partners].map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`partner-logo-item ${partner.name === 'Metrobrain Educare Pvt.Ltd' ? 'highlighted-partner' : ''}`}
                >
                  {partner.name === 'Metrobrain Educare Pvt.Ltd' && (
                    <span className="partner-badge">Premium Partner &amp; Customer</span>
                  )}
                  <h3 className="partner-name">{partner.name}</h3>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;
