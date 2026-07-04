import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, HeartHandshake } from "lucide-react";
import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface AchievementItem {
  icon: ReactNode;
  tag: string;
  title: string;
  desc: string;
  tags: string[];
}

export const Achievements = () => {
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

  const achievementsData: AchievementItem[] = [
    {
      icon: <Trophy className="w-6 h-6 text-primary" />,
      tag: "Sports",
      title: "State-Level Football",
      desc: "I've played football at the state level for Delhi, including the 3rd PEFI National Under-17 tournament. My team finished runner-up in Zone XIV, and I came 2nd in the U-19 200m sprint.",
      tags: ["Delhi state player", "National U-17 (2024)", "Zone XIV runner-up", "200m sprint — 2nd"],
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      tag: "Science & Tech",
      title: "Competitions & Programs",
      desc: "I took part in the ISRO National Space Quiz through MyGov India and Intel's 'Ideate for India' program, and I've placed in a few school web-development contests along the way.",
      tags: ["ISRO Space Quiz", "Intel Ideate for India", "Web-dev contests", "Photography — 1st"],
    },
    {
      icon: <YoutubeIcon className="w-6 h-6 text-primary" />,
      tag: "Content Creation",
      title: "YouTube Channel",
      desc: "I started a gaming channel on my own and grew it past 2,500 subscribers. Running it taught me video editing, thumbnail design, a bit of SEO, and how to keep an online community active.",
      tags: ["2,500+ subscribers", "Editing & scripting", "Thumbnail design", "Discord community"],
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-primary" />,
      tag: "Social Work",
      title: "Volunteering & Writing",
      desc: "I've volunteered with Global Cancer Concern India on awareness drives and fundraising, and I won 3rd place in a creative essay competition on social issues.",
      tags: ["Cancer awareness", "Fundraising drives", "Essay writing — 3rd", "Community outreach"],
    },
  ];

  return (
    <section id="achievements" className="bg-black relative py-24 px-4 md:px-6 overflow-hidden">

      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto mb-16 md:mb-20 relative z-10">
        <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
          Beyond the Screen
        </span>
        <WordsPullUpMultiStyle
          segments={[
            { text: "Life outside", className: "font-light text-[#E1E0CC]/60" },
            { text: "the code editor.", className: "font-extrabold text-[#E1E0CC]" },
          ]}
          containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]"
        />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl">
          Sports, science, creating online, and giving back. These are the things that keep
          me grounded and push me to keep improving.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {achievementsData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-[#101010] border border-white/5 rounded-2xl p-7 md:p-9 flex flex-col relative overflow-hidden group hover:border-primary/25 transition-colors duration-300 shadow-lg"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
                  {item.icon}
                </div>
                <span className="text-sm font-mono text-primary/30 group-hover:text-primary/60 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <span className="relative z-10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] block mb-2">
                {item.tag}
              </span>
              <h3 className="relative z-10 text-xl md:text-2xl font-semibold text-[#E1E0CC] group-hover:text-primary transition-colors tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="relative z-10 text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-6">
                {item.desc}
              </p>

              <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-5 border-t border-white/5">
                {item.tags.map((tag) => (
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
