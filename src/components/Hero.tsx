import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { WordsPullUp } from "./WordsPullUp";
import heroPoster from "../assets/hero.png";

export const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navItems = [
    { label: "Our story", href: "#our-story" },
    { label: "Projects", href: "#projects" },
    { label: "Client Work", to: "/work" },
    { label: "Robotics", href: "#robotics" },
    { label: "Achievements", href: "#achievements" },
    { label: "Inquiries", href: "#inquiries" },
  ];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div id="home" className="h-screen w-full bg-black relative overflow-hidden">
      {/* Full-bleed container */}
      <div className="w-full h-full overflow-hidden relative">
        
        {/* Poster image (paints instantly, hides once video is ready) */}
        <img
          src={heroPoster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          style={{ opacity: videoLoaded ? 1 : 0 }}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out"
        />

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80 pointer-events-none" />
        {/* Extra bottom scrim to anchor the giant heading */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 z-50 shadow-lg border-b border-l border-r border-white/5">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12">
            {navItems.map((item, idx) => {
              const style = {
                color: hoveredIdx === idx ? "#E1E0CC" : "rgba(225, 224, 204, 0.7)",
                transition: "color 0.3s ease",
              };
              const className =
                "text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase transition-colors whitespace-nowrap";
              return "to" in item && item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={style}
                  className={className}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={style}
                  className={className}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12 z-10 w-full">
          <div className="grid grid-cols-12 gap-6 items-end">
            
            {/* Left Column (8 cols): Giant Heading */}
            <div className="col-span-12 md:col-span-8 flex flex-col items-start">
              {/* Tagline above name */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-2 md:mb-4 pl-1"
              >
                Self-Taught Builder • Entrepreneur • Athlete
              </motion.span>
              
              <WordsPullUp
                text="Naman Kumar"
                showAsterisk={true}
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[18vw] xl:text-[16vw] 2xl:text-[16vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            {/* Right Column (4 cols): Description & CTA Button */}
            <div className="col-span-12 md:col-span-4 flex flex-col items-start gap-5 sm:gap-6 md:pb-4">
              
              {/* Description paragraph */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.3] font-light"
              >
                From building websites for paying clients to running a small game-hosting business and building robots in my school lab, I taught myself most of what I know, and I'm just getting started.
              </motion.p>

              {/* CTA Button */}
              <motion.a
                href="#inquiries"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-primary text-black rounded-full pl-5 pr-2 py-2 flex items-center gap-2 font-medium text-sm sm:text-base transition-all duration-300 hover:gap-3 shadow-md"
              >
                <span>Get in touch</span>
                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </motion.a>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
