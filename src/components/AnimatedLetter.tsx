import { motion, useTransform, MotionValue } from "framer-motion";

interface AnimatedLetterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

export const AnimatedLetter = ({ char, progress, range }: AnimatedLetterProps) => {
  // Map the character progress scroll range to an opacity range [0.2, 1]
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  );
};
