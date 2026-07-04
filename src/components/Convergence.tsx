import { Fragment } from "react";
import { motion } from "framer-motion";
import { Code2, Cloud, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Node {
  icon: LucideIcon;
  title: string;
  sub: string;
}

const nodes: Node[] = [
  { icon: Code2, title: "Code", sub: "Software & web apps" },
  { icon: Cloud, title: "Cloud", sub: "Servers & infrastructure" },
  { icon: Cpu, title: "Mechanical", sub: "Robotics & hardware" },
];

const NodeCard = ({ node, index }: { node: Node; index: number }) => {
  const Icon = node.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center gap-4 group shrink-0"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-[#101010] border border-white/10 group-hover:border-primary/40 rounded-2xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-colors duration-300">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      <div className="text-center">
        <div className="text-[#E1E0CC] font-semibold text-lg md:text-xl tracking-tight">
          {node.title}
        </div>
        <div className="text-gray-500 text-xs md:text-sm font-light mt-1">{node.sub}</div>
      </div>
    </motion.div>
  );
};

const Dot = ({ axis, delay }: { axis: "x" | "y"; delay: number }) => (
  <span
    className={`absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(222,219,200,0.6)] ${
      axis === "x"
        ? "top-1/2 -translate-y-1/2 animate-flow-x"
        : "left-1/2 -translate-x-1/2 animate-flow-y"
    }`}
    style={{ animationDelay: `${delay}s` }}
  />
);

const HConnector = ({ delay }: { delay: number }) => (
  <div className="relative hidden md:block flex-1 h-px mx-3 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 self-start mt-10">
    <Dot axis="x" delay={delay} />
  </div>
);

const VConnector = ({ delay }: { delay: number }) => (
  <div className="relative md:hidden w-px h-10 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10">
    <Dot axis="y" delay={delay} />
  </div>
);

export const Convergence = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center gap-12 md:gap-16">
      {/* Statement */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-xl sm:text-2xl md:text-3xl font-light leading-[1.3] text-[#E1E0CC]/80 max-w-3xl"
      >
        I build the bridge between{" "}
        <span className="font-serif italic text-primary">code</span>,{" "}
        <span className="font-serif italic text-primary">cloud</span>, and{" "}
        <span className="font-serif italic text-primary">mechanical systems</span>.
      </motion.p>

      {/* Connected nodes */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0">
        {nodes.map((node, i) => (
          <Fragment key={node.title}>
            <NodeCard node={node} index={i} />
            {i < nodes.length - 1 && (
              <>
                <VConnector delay={i * 0.8} />
                <HConnector delay={i * 0.8} />
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
