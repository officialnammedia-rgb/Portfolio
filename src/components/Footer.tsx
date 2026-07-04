import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const Footer = () => {
  return (
    <footer id="inquiries" className="bg-[#101010] py-20 px-4 md:px-6 border-t border-white/5 relative overflow-hidden">
      {/* Film grain noise overlay on footer */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">

        {/* Left Column: Brand, Description, Info */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h2 className="text-3xl tracking-tight">
            <span className="font-light text-primary/50">Naman </span>
            <span className="font-extrabold text-primary">Kumar*</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            I build websites, run small projects, and I'm always up for a good problem to solve. If you'd like to work together or just say hi, my inbox is open.
          </p>
          <div className="flex flex-col gap-2.5 mt-4 text-xs sm:text-sm text-gray-500 font-light">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:official.nammedia@gmail.com" className="hover:text-primary transition-colors">
                official.nammedia@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiries Contact Form */}
        <div className="flex flex-col gap-6 w-full md:max-w-md">
          <h3 className="text-lg font-medium text-primary tracking-tight">Send an Inquiry</h3>
          <ContactForm />
        </div>
      </div>

      {/* Bottom Bar: Copyright & Social Links */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 text-xs text-gray-500 font-light">
        <span>© 2026 Naman Kumar. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
};
