import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { WordsPullUp } from "./WordsPullUp";
import heroPoster from "../assets/hero.png";

export const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: "Our story", href: "#our-story" },
    { label: "Projects", href: "#projects" },
    { label: "Client Work", to: "/work" },
    { label: "Robotics", href: "#robotics" },
    { label: "Achievements", href: "#achievements" },
    { label: "Inquiries", href: "#inquiries" },
  ];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    let isSeeking = false;
    let pendingTime: number | null = null;
    let smoothedTime = 0;
    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      if (scrollDistance <= 0) return;
      
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / scrollDistance, 0), 1);
      targetProgressRef.current = progress;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    const seekVideo = (time: number) => {
      const v = videoRef.current;
      if (!v || !v.duration || isNaN(v.duration)) return;
      const clampedTime = Math.min(Math.max(time, 0), v.duration);

      if (isSeeking || v.seeking) {
        pendingTime = clampedTime;
        return;
      }

      // Avoid redundant seeks if change is sub-frame (< 30ms)
      if (Math.abs(v.currentTime - clampedTime) < 0.02) {
        return;
      }

      isSeeking = true;
      try {
        if ("fastSeek" in v && typeof (v as any).fastSeek === "function") {
          (v as any).fastSeek(clampedTime);
        } else {
          v.currentTime = clampedTime;
        }
      } catch {
        v.currentTime = clampedTime;
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const nextTime = pendingTime;
        pendingTime = null;
        seekVideo(nextTime);
      }
    };

    if (video) {
      video.addEventListener("seeked", handleSeeked);
    }

    const updateLoop = () => {
      const v = videoRef.current;
      if (v && v.duration && !isNaN(v.duration)) {
        const targetTime = targetProgressRef.current * v.duration;
        const diff = targetTime - smoothedTime;
        if (Math.abs(diff) > 0.002) {
          smoothedTime += diff * 0.2;
          seekVideo(smoothedTime);
        }
      }
      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (video) {
        video.removeEventListener("seeked", handleSeeked);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} id="home" className="relative w-full h-[300vh] bg-black">
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-bleed container */}
        <div className="w-full h-full overflow-hidden relative">
          
          {/* Poster image (paints instantly, hides once video is ready) */}
          <img
            src={heroPoster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Background Video (controlled by scroll, optimized for mobile decoders) */}
          <video
            ref={videoRef}
            src="https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/prisma.mp4"
            poster={heroPoster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
              }
            }}
            onCanPlay={() => setVideoLoaded(true)}
            style={{
              opacity: videoLoaded ? 1 : 0,
              transform: "translateZ(0)",
              willChange: "transform",
            }}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out pointer-events-none"
          />

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80 pointer-events-none" />
        {/* Extra bottom scrim to anchor the giant heading */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Desktop Navbar */}
        <nav className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 z-50 shadow-lg border-b border-l border-r border-white/5">
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden fixed top-5 right-5 z-50 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#E1E0CC] shadow-lg focus:outline-none transition-all duration-300 hover:bg-black/60 hover:border-primary/45 active:scale-95"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />

              {/* Sliding Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="md:hidden fixed top-0 right-0 h-screen w-[75vw] sm:w-[50vw] max-w-[300px] bg-black/40 backdrop-blur-2xl border-l border-white/10 z-40 shadow-2xl p-8 pt-24 flex flex-col justify-between"
              >
                {/* Top part / Navigation links */}
                <div className="flex flex-col gap-8">
                  {/* Logo or Title */}
                  <div className="border-b border-white/5 pb-4">
                    <span className="font-light text-primary/50 text-base">Naman </span>
                    <span className="font-extrabold text-primary text-base">Kumar*</span>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-6">
                    {navItems.map((item) => {
                      const isRoute = "to" in item && item.to;
                      const content = (
                        <span className="text-sm font-medium tracking-widest uppercase transition-colors">
                          {item.label}
                        </span>
                      );

                      return isRoute ? (
                        <Link
                          key={item.label}
                          to={item.to!}
                          onClick={() => setIsOpen(false)}
                          className="text-primary/70 hover:text-primary transition-colors py-2 flex items-center justify-between border-b border-white/5"
                        >
                          {content}
                          <span className="text-xs text-primary/30">→</span>
                        </Link>
                      ) : (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-primary/70 hover:text-primary transition-colors py-2 flex items-center justify-between border-b border-white/5"
                        >
                          {content}
                          <span className="text-xs text-primary/30">→</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom part / Footer */}
                <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                  © {new Date().getFullYear()} Naman Kumar. All rights reserved.
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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

        {/* Subtle Video Scrub Scroll Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none opacity-60">
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/80 transition-all duration-75 rounded-full"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-primary/60 font-mono">
            {scrollProgress >= 0.98 ? "Scroll down" : "Scroll to explore"}
          </span>
        </div>

      </div>
    </div>
  </div>
  );
};
