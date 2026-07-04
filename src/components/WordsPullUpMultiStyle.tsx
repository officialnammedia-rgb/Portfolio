import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Segment {
  text: string;
  className: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  containerClassName?: string;
}

export const WordsPullUpMultiStyle = ({
  segments,
  containerClassName = "",
}: WordsPullUpMultiStyleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Process segments into individual words with their respective styles
  const words = segments.flatMap((segment) => {
    // Split on space but preserve the word structures
    const parts = segment.text.split(" ");
    return parts
      .filter((w) => w !== "")
      .map((word) => ({
        text: word,
        className: segment.className,
      }));
  });

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
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${containerClassName}`}
    >
      {words.map((item, idx) => (
        <motion.span
          key={idx}
          variants={itemVariants}
          className={`inline-block mr-[0.25em] ${item.className}`}
        >
          {item.text}
        </motion.span>
      ))}
    </motion.div>
  );
};
