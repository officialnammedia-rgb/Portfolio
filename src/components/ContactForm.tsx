import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

/**
 * Inquiries are sent through Web3Forms (free, no backend needed).
 *
 * SETUP (one time, ~30 seconds):
 *   1. Go to https://web3forms.com
 *   2. Enter  official.nammedia@gmail.com  and click "Create Access Key".
 *   3. Copy the access key they email you and paste it below.
 * Every form submission will then be delivered to that inbox.
 */
const WEB3FORMS_ACCESS_KEY = "839ba691-4e33-4c2c-9995-03a2c05d5003";

type Status = "idle" | "loading" | "success" | "error";

export const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New inquiry from your portfolio");
    formData.append("from_name", "Portfolio Inquiries");
    // Make Gmail replies go straight to the person who submitted the form.
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
      <div className="flex flex-col items-start gap-4 bg-[#151515] border border-primary/20 rounded-2xl p-6 sm:p-8">
        <div className="bg-primary/10 w-11 h-11 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className="text-[#E1E0CC] font-medium text-lg mb-1">Message sent!</h4>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Thanks for reaching out. I'll get back to you at the email you provided as soon as I can.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-primary/70 hover:text-primary text-xs font-medium tracking-wider uppercase transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot spam trap (hidden from users) */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors placeholder:text-gray-600"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors placeholder:text-gray-600"
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="Tell me about your project or inquiry"
        rows={4}
        className="bg-[#212121] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/40 text-[#E1E0CC] transition-colors resize-none placeholder:text-gray-600"
      />

      {status === "error" && (
        <div className="flex items-start gap-2 text-red-400/90 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            {error}{" "}
            <a href="mailto:official.nammedia@gmail.com" className="underline hover:text-red-300">
              official.nammedia@gmail.com
            </a>
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-black rounded-full py-3 px-6 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all w-full sm:w-auto self-end shadow-md group disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
};
