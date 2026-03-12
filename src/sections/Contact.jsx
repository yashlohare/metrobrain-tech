import { useState, useEffect, useRef } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { submitContact } from '../lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(".contact-info", 
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".contact-form", 
      { opacity: 0, x: 30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo("#contact .section-header",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact .section-header",
          start: "top 85%",
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to Supabase (or mock if not configured)
    const result = await submitContact(formData);
    
    if (result.success) {
      // Construct WhatsApp message
      const msg = `*New Request*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Service:* ${formData.service}\n\n` +
        `*Message:*\n${formData.message}`;

      const AGENCY_PHONE = "918940055025"; 
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setIsSubmitting(false);
      
      // Open WhatsApp
      window.open(`https://api.whatsapp.com/send?phone=${AGENCY_PHONE}&text=${encodeURIComponent(msg)}`, '_blank');
      
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert('There was a problem sending your message. Please try again or email us directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="stich-divider" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Build Something Amazing</h2>
          <p className="section-subtitle">
            Have a project in mind? We'd love to hear about it. Reach out and let's make it happen.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Fill out the form or reach us directly through these channels.</p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method-icon"><FiMail /></div>
                <div className="contact-method-text">
                  <h4>Email</h4>
                  <p>metrobraintechnologies@gmail.com</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon"><FiPhone /></div>
                <div className="contact-method-text">
                  <h4>Phone</h4>
                  <p>+91 70471 23555 / 88057 75486</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon"><FiMapPin /></div>
                <div className="contact-method-text">
                  <h4>Location</h4>
                  <p>Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>

          <form className="glass-card contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+91 12345 67890" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interested In</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select a service</option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="chatbot">AI Chatbot</option>
                  <option value="marketing">Social Media Marketing</option>
                  <option value="design">UI/UX Design</option>
                  <option value="seo">SEO Optimization</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Project Details</label>
              <textarea id="message" name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : submitted ? '✓ Message Sent!' : <><FiSend /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
