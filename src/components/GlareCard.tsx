import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface GlareCardProps extends HTMLMotionProps<"div"> {
  variant: "gold" | "blue";
  glareIndex?: number;
  glareDelay?: number;
  children: React.ReactNode;
  className?: string;
}

export const GlareCard: React.FC<GlareCardProps> = ({
  variant,
  glareIndex = 0,
  glareDelay,
  children,
  className = "",
  ...motionProps
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isGold = variant === "gold";
  const calculatedDelay = glareDelay !== undefined ? glareDelay : glareIndex * 0.45;

  // Gradients for interactive hover spotlight
  const spotlightGradient = isGold
    ? `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 178, 32, 0.25), rgba(217, 119, 6, 0.08) 40%, transparent 80%)`
    : `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.28), rgba(37, 99, 235, 0.09) 40%, transparent 80%)`;

  const rimGradient = isGold
    ? "from-transparent via-amber-300/80 to-transparent"
    : "from-transparent via-sky-300/90 to-transparent";

  const hoverBorderColor = isGold
    ? "group-hover:border-amber-400/50"
    : "group-hover:border-sky-400/50";

  const shadowGlow = isGold
    ? "hover:shadow-[0_10px_35px_-5px_rgba(245,158,11,0.25)]"
    : "hover:shadow-[0_10px_35px_-5px_rgba(56,189,248,0.28)]";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl overflow-hidden transition-all duration-300 ${shadowGlow} ${className}`}
      {...motionProps}
    >
      {/* 1px Edge Border Base */}
      <div
        className={`absolute inset-0 rounded-2xl border border-white/5 ${hoverBorderColor} transition-colors duration-500 pointer-events-none z-20`}
      />

      {/* Synchronized Border Glow Pulse during One-Time Scroll Entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
        transition={{
          duration: 2.4,
          delay: calculatedDelay + 0.2,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 rounded-2xl border pointer-events-none z-20 ${
          isGold
            ? "border-amber-400/70 shadow-[inset_0_0_20px_rgba(245,158,11,0.3)]"
            : "border-sky-400/70 shadow-[inset_0_0_20px_rgba(56,189,248,0.3)]"
        }`}
      />

      {/* Top Edge Specular Rim Reflection */}
      <div
        className={`absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r ${rimGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none`}
      />

      {/* ONE-TIME NATURAL SUN GLARE SWEEP ON SCROLL (Top-Left to Bottom-Right) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-25 rounded-2xl">
        <motion.div
          initial={{ x: "-140%", y: "-140%" }}
          animate={isInView ? { x: "140%", y: "140%" } : { x: "-140%", y: "-140%" }}
          transition={{
            duration: 2.5,
            delay: calculatedDelay,
            ease: [0.35, 0.1, 0.25, 1],
          }}
          className={`absolute -top-[60%] -left-[60%] w-[220%] h-[220%] rotate-[25deg] pointer-events-none ${
            isGold
              ? "bg-[linear-gradient(115deg,transparent_20%,rgba(245,158,11,0.06)_32%,rgba(251,191,36,0.22)_42%,rgba(255,253,235,0.85)_50%,rgba(251,191,36,0.25)_58%,rgba(245,158,11,0.08)_68%,transparent_80%)] mix-blend-screen"
              : "bg-[linear-gradient(115deg,transparent_20%,rgba(37,99,235,0.08)_32%,rgba(56,189,248,0.24)_42%,rgba(240,249,255,0.88)_50%,rgba(56,189,248,0.28)_58%,rgba(37,99,235,0.08)_68%,transparent_80%)] mix-blend-screen"
          }`}
        />
      </div>

      {/* Interactive Cursor Spotlight Glare on Hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-15"
        style={{
          background: spotlightGradient,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Base Corner Ambient Glow */}
      <div
        className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-70 transition-opacity duration-500 ${
          isGold ? "bg-amber-400/15" : "bg-sky-400/15"
        }`}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};
