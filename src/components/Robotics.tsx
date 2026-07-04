import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldAlert, Navigation, Zap } from "lucide-react";
import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";

interface RoboticsItem {
  icon: ReactNode;
  tag: string;
  title: string;
  desc: string;
  tags: string[];
}

export const Robotics = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const roboticsData: RoboticsItem[] = [
    {
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      tag: "Hardware Build",
      title: "Self-Driving Car",
      desc: "A small self-steering car I built after getting curious about how Tesla's Autopilot works. It uses ultrasonic sensors to spot obstacles and steer around them on its own.",
      tags: ["Ultrasonic sensors", "Arduino", "Obstacle detection", "Auto-avoidance"],
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      tag: "Atal Tinkering Lab",
      title: "Master Innovator",
      desc: "In my school's Atal Tinkering Lab I worked my way up to the 'Master Innovator' level. Along the way I built sensor-based gadgets, including a smart dustbin to help with a waste problem in my area.",
      tags: ["Master Innovator", "Sensor automation", "Smart dustbin", "Prototyping"],
    },
    {
      icon: <Navigation className="w-6 h-6 text-primary" />,
      tag: "Drones & Flight",
      title: "Building Drones",
      desc: "I spent a good while putting together quadcopter drones, wiring up the flight controllers and power boards, and figuring out what actually keeps them stable in the air.",
      tags: ["Quadcopter frames", "Flight controllers", "ESC wiring", "Calibration"],
    },
  ];

  return (
    <section id="robotics" className="bg-black py-24 px-4 md:px-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto mb-16 md:mb-20 relative z-10">
        <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
          Robotics & Engineering
        </span>
        <WordsPullUpMultiStyle
          segments={[
            { text: "Where my code", className: "font-light text-[#E1E0CC]/60" },
            { text: "meets real hardware.", className: "font-extrabold text-[#E1E0CC]" },
          ]}
          containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]"
        />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl">
          Most of this started in my school's tinkering lab, where I learned to turn a
          rough idea into something that actually moves.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {roboticsData.map((robot, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-[#101010] border border-white/5 rounded-2xl p-7 md:p-8 flex flex-col relative overflow-hidden group hover:border-primary/25 transition-colors duration-300 shadow-lg"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
                  {robot.icon}
                </div>
                <span className="text-sm font-mono text-primary/30 group-hover:text-primary/60 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <span className="relative z-10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] block mb-2">
                {robot.tag}
              </span>
              <h3 className="relative z-10 text-xl md:text-2xl font-semibold text-[#E1E0CC] group-hover:text-primary transition-colors tracking-tight mb-3">
                {robot.title}
              </h3>
              <p className="relative z-10 text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-6">
                {robot.desc}
              </p>

              <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-5 border-t border-white/5">
                {robot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-primary/60 bg-[#151515] border border-white/5 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
