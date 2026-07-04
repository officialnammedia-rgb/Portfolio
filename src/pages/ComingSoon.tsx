import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, Mail } from "lucide-react";
import { Footer } from "../components/Footer";

export const ComingSoon = () => {
  const [params] = useSearchParams();
  const project = params.get("project");

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen flex flex-col selection:bg-primary selection:text-black">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
          <Link to="/" className="text-lg tracking-tight">
            <span className="font-light text-primary/50">Naman </span>
            <span className="font-extrabold text-primary">Kumar*</span>
          </Link>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-primary/70 hover:text-primary text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to portfolio</span>
          </Link>
        </div>
      </nav>

      {/* Body */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-6 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-7"
        >
          <div className="bg-[#151515] w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5">
            <Clock className="w-7 h-7 text-primary" />
          </div>

          <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
            Coming Soon
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95]">
            <span className="font-extrabold text-[#E1E0CC]">
              {project ?? "This project"}
            </span>{" "}
            <span className="font-light text-[#E1E0CC]/60 font-serif italic">
              is coming soon.
            </span>
          </h1>

          <p className="max-w-xl text-gray-400 text-base sm:text-lg leading-relaxed font-light">
            This one isn't public yet. Want an early look or a live walkthrough?
            Reach out to Naman directly and I'll happily show you around.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a
              href="mailto:official.nammedia@gmail.com"
              className="group bg-primary text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-2 font-medium text-sm sm:text-base transition-all duration-300 hover:gap-3 shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Naman</span>
              <div className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
            </a>
            <Link
              to="/#inquiries"
              className="text-primary/70 hover:text-primary text-sm font-medium tracking-wider uppercase transition-colors"
            >
              Send an inquiry
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
