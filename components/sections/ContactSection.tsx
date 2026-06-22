"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/lib/data/site-config";

type Status = "idle" | "loading" | "success" | "error";

const serviceOptions = [
  "Branding & Identity",
  "Print & Signage",
  "Events, Weddings & Memorials",
  "Branded Merchandise",
  "Photography",
  "Web Development",
  "Digital Marketing & Social Media",
  "Government & Cyber Services",
  "Other / Not sure",
];

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-brand-paper py-20 sm:py-24" id="contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            Get In Touch
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            Let&rsquo;s build something great.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-brand-slate">
            Tell us what you need and we&rsquo;ll get back to you within a few
            hours — or WhatsApp us directly if it&rsquo;s urgent.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr]">
          {/* ── Left: contact info + map ── */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-brand-navy/10 bg-white p-6">
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy/10">
                    <Phone className="h-4 w-4 text-brand-navy" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
                      Call us
                    </p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15">
                    <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
                      WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Scribes%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy/10">
                    <Mail className="h-4 w-4 text-brand-navy" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy/10">
                    <MapPin className="h-4 w-4 text-brand-navy" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
                      Visit Us
                    </p>
                    <p className="font-body text-sm font-semibold text-brand-navy">
                      {siteConfig.address}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map embed — replace the src with your real Google Maps embed URL */}
            <div className="overflow-hidden rounded-xl border border-brand-navy/10">
              <iframe
                title="Scribes Creative Solutions location"
                src={`https://maps.google.com/maps?q=${siteConfig.latitude},${siteConfig.longitude}&z=16&output=embed`}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          {/* ── Right: inquiry form ── */}
          <div className="rounded-xl border border-brand-navy/10 bg-white p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <h3 className="font-display text-xl font-bold text-brand-navy">
                  Message received!
                </h3>
                <p className="font-body text-sm text-brand-slate">
                  We&rsquo;ll be in touch within a few hours. You can also
                  WhatsApp us if it&rsquo;s urgent.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-body text-sm font-medium text-brand-red hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Wanjiku"
                      className="rounded-md border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0700 000 000"
                      className="rounded-md border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@yourbusiness.co.ke"
                    className="rounded-md border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="service"
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate"
                  >
                    Service You Need
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="rounded-md border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate"
                  >
                    Tell Us More
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Quantities, deadlines, any special requirements..."
                    className="resize-none rounded-md border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
                  />
                </div>

                {status === "error" && (
                  <p className="flex items-center gap-2 font-body text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please try again or WhatsApp us
                    directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}