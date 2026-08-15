import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Megaphone,
  MessageSquareText,
  Target,
} from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "839ba691-4e33-4c2c-9995-03a2c05d5003";

type Status = "idle" | "loading" | "success" | "error";

const serviceCards = [
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Website Services",
    desc: "Landing pages, portfolio sites, business websites, and full redesigns built to look premium and load fast.",
  },
  {
    icon: <Megaphone className="w-6 h-6 text-primary" />,
    title: "Google Campaigns",
    desc: "Campaign planning, lead-focused landing pages, and setup support for Google Ads and campaign creatives.",
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Lead Generation",
    desc: "Forms, tracking-ready pages, and clear calls to action that help turn visitors into actual inquiries.",
  },
];

const processSteps = [
  "You send the details through the form above.",
  "I review the goals, timeline, and scope.",
  "I reply with the best next step or a direct quote.",
];

const quickFacts = [
  ["Fast reply", "Usually within 1 business day"],
  ["Focus", "Websites, landing pages, Google Ads"],
  ["Style", "Same clean black-and-primary look"],
  ["Location", "New Delhi, India"],
];

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <label className="flex flex-col gap-2">
    <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-gray-500">
      {label}
      {required ? <span className="text-primary"> *</span> : null}
    </span>
    {children}
  </label>
);

const Shell = ({ children }: { children: ReactNode }) => (
  <div className="bg-black text-[#E1E0CC] min-h-screen selection:bg-primary selection:text-black">
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
    {children}
  </div>
);

export const Inquiry = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [serviceType, setServiceType] = useState("Website services");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New website business inquiry from portfolio");
    formData.append("from_name", "Website Inquiry Page");

    const senderEmail = formData.get("email");
    if (senderEmail) formData.append("replyto", senderEmail.toString());

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't send right now. Please try again, or email me directly.");
    }
  };

  if (status === "success") {
    return (
      <Shell>
        <main className="relative overflow-hidden px-4 md:px-6 py-20 md:py-28 min-h-[calc(100vh-73px)] flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-7"
          >
            <div className="bg-[#151515] w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5">
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </div>

            <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
              Inquiry received
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95]">
              <span className="font-extrabold text-[#E1E0CC]">Thanks.</span>{" "}
              <span className="font-light text-[#E1E0CC]/60 font-serif italic">
                I’ll review your details and get back to you soon.
              </span>
            </h1>

            <p className="max-w-xl text-gray-400 text-base sm:text-lg leading-relaxed font-light">
              If you want to add anything else, email me directly at{" "}
              <a
                href="mailto:official.nammedia@gmail.com"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                official.nammedia@gmail.com
              </a>
              .
            </p>

            <Link
              to="/inquiry"
              className="group bg-primary text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-2 font-medium text-sm sm:text-base transition-all duration-300 hover:gap-3 shadow-md"
            >
              <span>Send another inquiry</span>
              <div className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
            </Link>
          </motion.div>
        </main>
      </Shell>
    );
  }

  const loading = status === "loading";
  const showWebsiteType = serviceType === "Website services";

  return (
    <Shell>
      <main className="relative overflow-hidden">
        <section className="relative px-4 md:px-6 pt-16 md:pt-24 pb-16">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10">
            <div className="bg-[#101010] border border-white/5 rounded-2xl p-6 sm:p-8 md:p-9 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
                      Website business inquiry
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight text-[#E1E0CC]">
                      Fill this form first.
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-xl">
                      This is the main enquiry form for your website business.
                      Share what you need and I’ll respond with the next step.
                    </p>
                  </div>
                  <div className="hidden sm:flex bg-black w-12 h-12 rounded-xl items-center justify-center border border-white/5 shrink-0">
                    <BadgeDollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full name" required>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors placeholder:text-gray-600"
                      />
                    </Field>

                    <Field label="Email address" required>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors placeholder:text-gray-600"
                      />
                    </Field>

                    <Field label="Phone number" required>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Required"
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors placeholder:text-gray-600"
                      />
                    </Field>

                    <Field label="Business or brand">
                      <input
                        type="text"
                        name="business"
                        placeholder="Company or project name"
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors placeholder:text-gray-600"
                      />
                    </Field>

                    <Field label="Service needed" required>
                      <select
                        name="service"
                        required
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors"
                        value={serviceType}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                          setServiceType(event.target.value)
                        }
                      >
                        <option>Website services</option>
                        <option>Google Ads campaign</option>
                        <option>Landing page</option>
                        <option>Website + Google Ads</option>
                        <option>Not sure yet</option>
                      </select>
                    </Field>

                    {showWebsiteType && (
                      <Field label="Website type" required>
                        <select
                          name="websiteType"
                          required={showWebsiteType}
                          className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors"
                          defaultValue="Business website"
                        >
                          <option>Business website</option>
                          <option>E-commerce website</option>
                          <option>Portfolio website</option>
                          <option>Landing page</option>
                          <option>Agency website</option>
                          <option>Blog or content site</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    )}

                    <Field label="Timeline" required>
                      <select
                        name="timeline"
                        required
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors"
                        defaultValue="As soon as possible"
                      >
                        <option>As soon as possible</option>
                        <option>1-2 weeks</option>
                        <option>2-4 weeks</option>
                        <option>1-2 months</option>
                        <option>Planning phase</option>
                      </select>
                    </Field>

                    <Field label="Budget range" required>
                      <select
                        name="budget"
                        required
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors"
                        defaultValue="Not decided yet"
                      >
                        <option>Not decided yet</option>
                        <option>Under 25k INR</option>
                        <option>25k - 50k INR</option>
                        <option>50k - 1 lakh INR</option>
                        <option>1 lakh INR+</option>
                      </select>
                    </Field>

                    <Field label="Website or page link">
                      <input
                        type="url"
                        name="website"
                        placeholder="https://"
                        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors placeholder:text-gray-600"
                      />
                    </Field>
                  </div>

                  <Field label="Project details" required>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me what you want to build, what the goal is, who the audience is, and anything else I should know."
                      className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors resize-none placeholder:text-gray-600"
                    />
                  </Field>

                  {status === "error" && (
                    <div className="flex items-start gap-2 text-red-400/90 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        {error}{" "}
                        <a
                          href="mailto:official.nammedia@gmail.com"
                          className="underline hover:text-red-300"
                        >
                          official.nammedia@gmail.com
                        </a>
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed max-w-md">
                      You can also email me directly at official.nammedia@gmail.com if
                      the form is not the best fit.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-black rounded-full py-3 px-6 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all w-full sm:w-auto shadow-md group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <span>Submit inquiry</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

            <div className="max-w-4xl">
              <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
                Website business inquiry
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] max-w-4xl">
                <span className="font-extrabold text-[#E1E0CC]">Tell me what you need.</span>{" "}
                <span className="font-light text-[#E1E0CC]/60 font-serif italic">
                  I’ll build the website around it.
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Use this page for website work, landing pages, or anything tied to
                your online business presence. The form comes first, and the context
                sections below help explain the process.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {quickFacts.map(([label, value]) => (
                <div key={label} className="bg-[#101010] border border-white/5 rounded-2xl p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                    {label}
                  </div>
                  <div className="mt-2 text-sm sm:text-base text-[#E1E0CC] font-medium leading-snug">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-4 md:gap-5 items-start">
              <div className="flex flex-col gap-4 md:gap-5">
                <div className="bg-[#101010] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-lg">
                  <div className="absolute -inset-px bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                  <div className="relative z-10 flex items-center gap-3 mb-5">
                    <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center border border-white/5">
                      <MessageSquareText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E1E0CC]">
                        What to include
                      </h2>
                      <p className="text-sm text-gray-500 font-light">
                        The more context you share, the faster I can respond.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceCards.map((service, index) => (
                      <div
                        key={service.title}
                        className="bg-[#151515] border border-white/5 rounded-2xl p-4 hover:border-primary/25 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-black w-11 h-11 rounded-xl flex items-center justify-center border border-white/5">
                            {service.icon}
                          </div>
                          <span className="text-[10px] font-mono text-primary/30">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-[#E1E0CC] mb-2 tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                          {service.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#101010] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-lg">
                  <div className="absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                  <div className="relative z-10 flex items-center gap-3 mb-5">
                    <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center border border-white/5">
                      <Clock3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E1E0CC]">
                        How it works
                      </h2>
                      <p className="text-sm text-gray-500 font-light">
                        Simple process, no unnecessary back and forth.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {processSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex gap-4 items-start bg-[#151515] border border-white/5 rounded-2xl p-4"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary text-black font-semibold text-xs flex items-center justify-center shrink-0">
                          0{index + 1}
                        </div>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#101010] border border-white/5 rounded-2xl p-5 flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                    Email
                  </div>
                  <a href="mailto:official.nammedia@gmail.com" className="text-sm text-[#E1E0CC] hover:text-primary transition-colors">
                    official.nammedia@gmail.com
                  </a>
                </div>
              </div>
              <div className="bg-[#101010] border border-white/5 rounded-2xl p-5 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                    Base
                  </div>
                  <div className="text-sm text-[#E1E0CC]">New Delhi, India</div>
                </div>
              </div>
              <div className="bg-[#101010] border border-white/5 rounded-2xl p-5 flex items-start gap-3">
                <BadgeDollarSign className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                    Note
                  </div>
                  <div className="text-sm text-[#E1E0CC]">
                    Clear goals make the quote and timeline much sharper.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
};
