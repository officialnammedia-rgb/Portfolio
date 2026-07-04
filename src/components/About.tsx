import { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";
import { AnimatedLetter } from "./AnimatedLetter";
import { Convergence } from "./Convergence";
import { Cpu, Heart, Flame, Shield } from "lucide-react";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // Set up scroll listener tracking for the text reveal effect
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const headingSegments = [
    { text: "I am Naman", className: "font-light text-[#E1E0CC]/50" },
    { text: "Kumar,", className: "font-extrabold text-[#E1E0CC]" },
    { text: "a self-taught builder & creator.", className: "italic font-serif text-[#E1E0CC]" },
  ];

  // Story text containing your educational adjustments and self-learning narrative
  const bodyText =
    "I grew up in New Delhi, where money was never certain. Watching my mother work long hours in sales taught me to pick up real skills early. When my studies moved from Science to Humanities, I didn't want to give up on technology, so I taught myself to code, to run cloud servers, and to build robots, mostly by trying things, breaking them, and trying again.";

  const characters = bodyText.split("");
  const totalChars = characters.length;

  const facts = [
    { label: "Based in", value: "New Delhi, India" },
    { label: "Focus", value: "Software · Cloud · Robotics" },
    { label: "Studying", value: "BA Programme · Ambedkar College, DU" },
    { label: "Languages", value: "English · Hindi" },
  ];

  const drives = [
    {
      icon: <Cpu className="w-6 h-6 text-primary" />,
      title: "Building from Scratch",
      desc: "I like starting with nothing and ending up with something that actually works, whether it's a website, a server, or a small robot.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Family First",
      desc: "A lot of what I do comes back to one goal: using my skills to make things steadier for my family.",
    },
    {
      icon: <Flame className="w-6 h-6 text-primary" />,
      title: "Getting Better Daily",
      desc: "I try to improve a little every day, in my code, on the football field, and in how I run my projects.",
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Real Problems, Real Fixes",
      desc: "I care more about solving an actual problem than making something look clever from the outside.",
    },
  ];

  return (
    <section id="our-story" ref={containerRef} className="bg-black py-24 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Intro: label + heading + bio */}
      <div className="px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 md:gap-10">
          <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
            Personal Story
          </span>

          <WordsPullUpMultiStyle
            segments={headingSegments}
            containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-[0.95] tracking-tight text-center flex flex-wrap justify-center"
          />

          {/* Bio */}
          <p
            ref={paragraphRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] leading-[1.5] md:leading-[1.45] font-light text-[#DEDBC8]/90 max-w-3xl"
          >
            {(() => {
              let gi = 0;
              const words = bodyText.split(" ");
              return words.map((word, wi) => {
                const letters = word.split("").map((ch) => {
                  const index = gi++;
                  const charProgress = index / totalChars;
                  const start = Math.max(0, charProgress - 0.1);
                  const end = Math.min(1, charProgress + 0.05);
                  return (
                    <AnimatedLetter
                      key={index}
                      char={ch}
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  );
                });
                const spaceIndex = gi++;
                const spaceProgress = spaceIndex / totalChars;
                const isLast = wi === words.length - 1;
                return (
                  <span key={wi}>
                    <span className="inline-block whitespace-nowrap">{letters}</span>
                    {!isLast && (
                      <AnimatedLetter
                        char=" "
                        progress={scrollYProgress}
                        range={[
                          Math.max(0, spaceProgress - 0.1),
                          Math.min(1, spaceProgress + 0.05),
                        ]}
                      />
                    )}
                  </span>
                );
              });
            })()}
          </p>
        </div>
      </div>

      {/* Full-width connection band */}
      <div className="relative w-full mt-20 md:mt-28 mb-20 md:mb-28">
        {/* soft glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
        <Convergence />
      </div>

      {/* Details card: facts + what drives me */}
      <div className="px-4 md:px-6 relative z-10">
        <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] p-8 sm:p-12 md:p-16 max-w-6xl mx-auto flex flex-col gap-14 md:gap-16 border border-white/5 relative overflow-hidden shadow-2xl">

          {/* Soft glow */}
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-primary/5 blur-[130px] rounded-full pointer-events-none" />

          {/* Fact strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 relative z-10 rounded-xl overflow-hidden">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-[#101010] p-5 sm:p-6 flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                  {fact.label}
                </span>
                <span className="text-[#E1E0CC] text-sm sm:text-base font-medium leading-snug">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>

          {/* What Drives Me */}
          <div className="flex flex-col gap-10 md:gap-12 relative z-10">
            <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
              <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
                What Drives Me
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#E1E0CC] leading-tight tracking-tight">
                A few things that keep me{" "}
                <span className="font-serif italic text-primary">going</span>.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {drives.map((drive, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-[#151515] border border-white/5 rounded-2xl p-7 md:p-9 hover:border-primary/25 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* hover glow */}
                  <div className="absolute -inset-px bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                  <div className="relative z-10 flex items-start justify-between mb-5">
                    <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
                      {drive.icon}
                    </div>
                    <span className="text-sm font-mono text-primary/30 group-hover:text-primary/60 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="relative z-10 text-[#E1E0CC] font-semibold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors tracking-tight">
                    {drive.title}
                  </h4>
                  <p className="relative z-10 text-gray-400 text-sm sm:text-base leading-relaxed font-light">
                    {drive.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
