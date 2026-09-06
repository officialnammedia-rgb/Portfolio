import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock, Globe, Lock, Terminal, Server, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";
import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";
import { GlareCard } from "./GlareCard";

type Cta =
  | { kind: "route"; label: string; to: string }
  | { kind: "soon"; label: string }
  | { kind: "status"; label: string };

interface Project {
  id: string;
  icon: ReactNode;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  cta: Cta;
}

export const Projects = () => {
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

  const projectsData: Project[] = [
    {
      id: "01",
      icon: <Globe className="w-6 h-6 text-primary" />,
      label: "Full-Stack Development",
      title: "Client Website Deliveries",
      desc: "I've built and launched 15+ websites for small businesses and individual clients, handling everything from the first design to getting them live on their own domain.",
      tags: ["15+ sites shipped", "Client management", "Full-stack build", "SEO & performance"],
      cta: { kind: "route", label: "View client work", to: "/work" },
    },
    {
      id: "02",
      icon: <Terminal className="w-6 h-6 text-primary" />,
      label: "Artificial Intelligence",
      title: "JARVIS AI Voice Assistant",
      desc: "A voice assistant I built for fun, inspired by Iron Man's JARVIS. It listens, sends what I say to the OpenAI API, and talks back. I wrote the whole thing in Python.",
      tags: ["Voice I/O", "OpenAI API", "Task automation", "Python"],
      cta: { kind: "soon", label: "Coming soon" },
    },
    {
      id: "03",
      icon: <Server className="w-6 h-6 text-primary" />,
      label: "Cloud Architecture & Business",
      title: "Game Server Infrastructure",
      desc: "I ran a small business hosting multiplayer game servers. I set them up on Google Cloud, wrote my own backup scripts, and handled billing and player support myself. It earned over $1,000.",
      tags: ["Google Cloud", "Automated backups", "$1,000+ earned", "Player support"],
      cta: { kind: "status", label: "Private venture" },
    },
    {
      id: "04",
      icon: <Clipboard className="w-6 h-6 text-primary" />,
      label: "Content Platforms",
      title: "Custom Job Board Portal",
      desc: "A job board where people can search and filter listings and apply online, with an admin panel to manage everything behind the scenes. Built to be fast and simple to use.",
      tags: ["Search & filters", "Online applications", "Email alerts", "Admin panel"],
      cta: { kind: "soon", label: "Coming soon" },
    },
  ];

  const renderCta = (project: Project) => {
    const cta = project.cta;
    const linkClass =
      "inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all group/link";

    if (cta.kind === "route") {
      return (
        <Link to={cta.to} className={linkClass}>
          <span>{cta.label}</span>
          <ArrowRight className="w-4 h-4 -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      );
    }

    if (cta.kind === "soon") {
      return (
        <Link
          to={`/coming-soon?project=${encodeURIComponent(project.title)}`}
          className={linkClass}
        >
          <Clock className="w-4 h-4" />
          <span>{cta.label}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      );
    }

    // status — informational, no button
    return (
      <span className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium">
        <Lock className="w-3.5 h-3.5" />
        <span>{cta.label}</span>
      </span>
    );
  };

  return (
    <section id="projects" className="bg-black relative py-24 px-4 md:px-6 overflow-hidden">

      {/* Background texture + glow */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto mb-16 md:mb-20 relative z-10">
        <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
          Build & Work
        </span>
        <WordsPullUpMultiStyle
          segments={[
            { text: "Things I've", className: "font-light text-[#E1E0CC]/60" },
            { text: "built and shipped.", className: "font-extrabold text-[#E1E0CC]" },
          ]}
          containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]"
        />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl">
          A mix of client work, side projects, and small businesses I've run, across the
          web, AI, cloud, and hardware.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projectsData.map((project, idx) => (
            <GlareCard
              key={project.id}
              variant="blue"
              glareIndex={idx}
              variants={cardVariants}
              className="bg-[#101010] p-7 md:p-9 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-sky-400/30 group-hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] transition-all duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300 [&>svg]:text-sky-400 group-hover:[&>svg]:text-sky-300">
                    {project.icon}
                  </div>
                </div>
                <span className="text-sm font-mono text-sky-400/40 group-hover:text-sky-300/80 transition-colors">
                  {project.id}
                </span>
              </div>

              {/* Category + Title */}
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] block mb-2 group-hover:text-sky-400/70 transition-colors">
                {project.label}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold text-[#E1E0CC] group-hover:text-sky-100 transition-colors tracking-tight mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-6">
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-sky-300/70 bg-[#151515] border border-sky-500/10 rounded-full px-2.5 py-1 group-hover:border-sky-500/25 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-5 border-t border-white/5 group-hover:border-sky-500/20 transition-colors">
                {renderCta(project)}
              </div>
            </GlareCard>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
