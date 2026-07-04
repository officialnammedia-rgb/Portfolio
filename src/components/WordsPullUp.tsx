import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  // Trigger animation when the heading enters viewport (once: true)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const words = text.split(" ").filter((w) => w !== "");

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // cinematic ease out
      },
    },
  };

  return (
    <motion.h1
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        const isKumar = word.toLowerCase() === "kumar";
        const wordWeightClass = isKumar
          ? "font-extrabold text-[#E1E0CC]"
          : "font-light text-[#E1E0CC]/50 text-[0.9em]";

        return (
          <motion.span
            key={i}
            variants={itemVariants}
            className={`inline-block relative mr-[0.2em] ${wordWeightClass}`}
          >
            {isLast && showAsterisk ? (
              <span className="relative inline-block pr-[0.1em]">
                {word}
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] pointer-events-none select-none font-normal">
                  *
                </span>
              </span>
            ) : (
              word
            )}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};
