import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Globe } from "lucide-react";
import { WordsPullUpMultiStyle } from "../components/WordsPullUpMultiStyle";
import { Footer } from "../components/Footer";

/* -------------------------------------------------------------------------- */
/*  Placeholder data — swap with the real directory + links later             */
/* -------------------------------------------------------------------------- */

interface Delivery {
  id: string;
  title: string;
  category: string;
  url: string; // display url (placeholder)
  href: string; // live link (placeholder)
  desc: string;
  stack: string[];
  image?: string;
}

const DELIVERIES: Delivery[] = [
  {
    id: "01",
    title: "Ascendyl",
    category: "E-commerce",
    url: "ascendyl.com",
    href: "https://ascendyl.com",
    desc: "A fully functional e-commerce clothing store featuring dynamic product lists, shopping cart functionalities, checkout workflows, and modern UI transitions.",
    stack: ["React", "Tailwind CSS", "Vite", "E-commerce"],
    image: "/previews/ecommerce.png",
  },
  {
    id: "02",
    title: "Gurukul FC",
    category: "Sports",
    url: "gurukulfc.com",
    href: "https://gurukulfc.com",
    desc: "A premium academy portal and website for Gurukul FC featuring trial registrations, free session bookings, official merchandise e-commerce, and Razorpay payment integration.",
    stack: ["HTML", "Vanilla CSS", "JavaScript", "Razorpay SDK"],
    image: "/previews/football.png",
  },
  {
    id: "03",
    title: "Real Estate & Hospitality Portal",
    category: "Real Estate",
    url: "hotel-realestate-website.vercel.app",
    href: "https://hotel-realestate-website.vercel.app",
    desc: "A premium responsive web application designed for luxury hotels, Airbnb listings, and real estate properties featuring elegant gallery views, booking forms, and dynamic searches.",
    stack: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    image: "/previews/realestate.png",
  },
  {
    id: "04",
    title: "A2G India",
    category: "Business",
    url: "a2gindia.com",
    href: "https://a2gindia.com",
    desc: "An official corporate portal designed for an IT services company, showcasing tech stacks, consulting offerings, service portfolios, and interactive client outreach channels.",
    stack: ["React", "Tailwind CSS", "Vite", "SEO Optimized"],
    image: "/previews/itservices.png",
  },
  {
    id: "05",
    title: "DelGuru",
    category: "Education",
    url: "delguru.com",
    href: "https://delguru.com",
    desc: "A high-performance education platform for competitive exam preparation, offering course details, interactive tests, updates, and learning resources.",
    stack: ["Next.js", "Tailwind CSS", "Responsive", "Education Portal"],
    image: "/previews/education.png",
  },
  {
    id: "06",
    title: "Cafe @ Friends",
    category: "Food & Beverage",
    url: "cafe-at-friends.vercel.app",
    href: "https://cafe-at-friends.vercel.app",
    desc: "A gorgeous, modern website designed for a cozy cafe. Currently optimized for desktop view (mobile responsiveness coming soon) with dynamic menus and booking inquiries.",
    stack: ["React", "Tailwind CSS", "Desktop-first", "Vite"],
    image: "/previews/cafe.png",
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const DeliveryCard = ({ item }: { item: Delivery }) => (
  <motion.a
    href={item.href}
    target="_blank"
    rel="noreferrer"
    variants={cardVariants}
    className="group bg-[#101010] rounded-2xl border border-white/5 overflow-hidden flex flex-col shadow-lg hover:border-primary/25 transition-colors duration-300"
  >
    {/* Browser-chrome preview */}
    <div className="relative">
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#151515] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 h-5 rounded bg-black/50 flex items-center px-2 overflow-hidden">
          <span className="text-[9px] text-gray-500 font-mono truncate">{item.url}</span>
        </div>
      </div>
      <div className="aspect-[16/10] bg-gradient-to-br from-[#1c1c1c] via-[#121212] to-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 blur-[60px] rounded-full" />
            <div className="relative flex flex-col items-center gap-2">
              <Globe className="w-9 h-9 text-primary/40 group-hover:text-primary/70 transition-colors" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-600">
                Preview soon
              </span>
            </div>
          </>
        )}
        {/* hover sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>

    {/* Meta */}
    <div className="flex flex-col gap-3 p-6 flex-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          {item.category}
        </span>
        <span className="text-[10px] font-mono text-primary/40">{item.id}</span>
      </div>

      <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] group-hover:text-primary transition-colors tracking-tight">
        {item.title}
      </h3>

      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
        {item.desc}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono text-primary/60 bg-[#151515] border border-white/5 rounded-full px-2.5 py-1"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-1.5 text-primary text-xs sm:text-sm font-medium">
        <span>Visit site</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </div>
  </motion.a>
);

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export const ClientDeliveries = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(DELIVERIES.map((d) => d.category)))],
    [],
  );

  const filtered = useMemo(
    () => (active === "All" ? DELIVERIES : DELIVERIES.filter((d) => d.category === active)),
    [active],
  );

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen selection:bg-primary selection:text-black">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
          <Link to="/" className="text-lg tracking-tight">
            <span className="font-light text-primary/50">Naman </span>
            <span className="font-extrabold text-primary">Kumar*</span>
          </Link>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-primary/70 hover:text-primary text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to portfolio</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="relative overflow-hidden px-4 md:px-6 pt-20 md:pt-28 pb-12">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
            Selected Work
          </span>
          <WordsPullUpMultiStyle
            segments={[
              { text: "Client Website", className: "font-light text-[#E1E0CC]/60" },
              { text: "Deliveries.", className: "font-extrabold text-[#E1E0CC]" },
            ]}
            containerClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]"
          />
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            A collection of websites I've designed and built for small businesses and
            individual clients, from the first rough layout to a finished site live on
            their own domain.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-4 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">15+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">Websites delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">100%</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">Custom-built</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">Solo</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">Start to finish</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs font-medium tracking-wider uppercase rounded-full px-4 py-2 border transition-colors duration-300 ${
              active === cat
                ? "bg-primary text-black border-primary"
                : "text-primary/60 border-white/10 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24 relative z-10">
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((item) => (
            <DeliveryCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-20 text-center flex flex-col items-center gap-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#E1E0CC]/85 max-w-xl">
            Have a site that needs building?
          </h2>
          <Link
            to="/#inquiries"
            className="group bg-primary text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-2 font-medium text-sm sm:text-base transition-all duration-300 hover:gap-3 shadow-md"
          >
            <span>Start a project</span>
            <div className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};
