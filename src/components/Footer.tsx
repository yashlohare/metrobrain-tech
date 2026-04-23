import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/5 pt-16 pb-12" id="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
          
          {/* Explore */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-widest uppercase text-xs">Explore</h3>
            <ul className="space-y-4">
              <li><a href="/#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Home</a></li>
              <li><a href="/#services" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Our Services</a></li>
              <li><a href="/#work" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Our Works</a></li>
              <li><a href="/#faq" className="text-white/40 hover:text-white transition-colors text-sm font-medium">FAQs</a></li>
              <li><a href="/#contact" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-widest uppercase text-xs">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/service/web-development" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Web Development</Link></li>
              <li><Link href="/service/app-development" className="text-white/40 hover:text-white transition-colors text-sm font-medium">App Development</Link></li>
              <li><Link href="/service/ai-tool-development" className="text-white/40 hover:text-white transition-colors text-sm font-medium">AI Tool Development</Link></li>
              <li><Link href="/service/ui-ux-design" className="text-white/40 hover:text-white transition-colors text-sm font-medium">UI/UX Design</Link></li>
              <li><Link href="/service/digital-marketing" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Digital Marketing</Link></li>
              <li><Link href="/service/cloud-devops" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Cloud & DevOps</Link></li>
              <li><Link href="/service/it-consulting" className="text-white/40 hover:text-white transition-colors text-sm font-medium">IT Consulting</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-widest uppercase text-xs">Company</h3>
            <ul className="space-y-4">
              <li><a href="/#about" className="text-white/40 hover:text-white transition-colors text-sm font-medium">About Us</a></li>
              <li><Link href="/company/careers" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Careers</Link></li>
              <li><Link href="/company/our-culture" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Our Culture</Link></li>
              <li><Link href="/company/partnerships" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Partnerships</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-widest uppercase text-xs">Contact Us</h3>
            <ul className="space-y-6">
              <li>
                <a href="https://www.instagram.com/metrobraintechnologies?igsh=Y3E4aGZnOGUxazI3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-medium group">
                  <InstagramIcon className="w-4 h-4 group-hover:text-rose-500 transition-colors" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://in.linkedin.com/company/metrobrain-technology?trk=public_profile_topcard-current-company" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-medium group">
                  <LinkedinIcon className="w-4 h-4 group-hover:text-blue-500 transition-colors" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-widest uppercase text-xs">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/legal/terms-of-service" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link></li>
              <li><Link href="/legal/privacy-policy" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link href="/legal/cookies" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Giant Brand Name */}
        <div className="relative mb-12 flex flex-col items-center">
          <h2 className="text-[7.5vw] font-black text-white leading-none tracking-tighter text-center select-none opacity-[0.03] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap uppercase">
            METROBRAIN TECHNOLOGY
          </h2>
          <h2 className="text-[6.5vw] md:text-[7.5vw] font-black text-white leading-none tracking-tighter text-center select-none whitespace-nowrap uppercase">
            Metrobrain Technology
          </h2>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Metrobrain Tech. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Secure & Verified</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
