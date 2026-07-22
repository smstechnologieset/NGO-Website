"use client";

import React, { useState } from "react";
import { submitContactMessage } from "@/lib/services/contact";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side rate limiting: 10 seconds between submissions
    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < 10000) {
      setStatus("error");
      setErrorMessage("Please wait a few seconds before submitting another message.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const res = await submitContactMessage(name, email, message, honeypot);

    if (res.success) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setLastSubmitTime(now);
    } else {
      setStatus("error");
      setErrorMessage(res.error || "An error occurred while submitting your message.");
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-white border border-mutedBorder shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink mb-2">
        Send Us a Message
      </h2>
      <p className="text-sm text-ink/75 mb-6 font-body">
        Have questions about our programs, partnership opportunities, or volunteering? Fill out the form below.
      </p>

      {status === "success" && (
        <div
          role="status"
          className="p-6 mb-6 rounded-2xl bg-primary/10 border border-primary/30 text-ink animate-fade-in"
        >
          <div className="flex items-center gap-3 mb-2 text-primary font-bold text-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Thank You for Reaching Out!
          </div>
          <p className="text-sm text-ink/80 leading-relaxed font-body">
            Your message has been received. A member of the SCWOP team will review your inquiry and get back to you shortly.
          </p>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="p-4 mb-6 rounded-xl bg-secondaryAccent/15 border border-secondaryAccent/30 text-ink text-sm"
        >
          <strong>Notice:</strong> {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot field (hidden from real users to catch bot spam) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_hp">Leave this blank</label>
          <input
            type="text"
            id="website_hp"
            name="website_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-ink mb-1.5"
          >
            Your Full Name <span className="text-secondaryAccent">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane Doe"
            className="w-full px-4 py-3 rounded-xl border border-mutedBorder bg-paper/50 focus:bg-white text-ink placeholder:text-ink/40 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-ink mb-1.5"
          >
            Email Address <span className="text-secondaryAccent">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. jane@example.com"
            className="w-full px-4 py-3 rounded-xl border border-mutedBorder bg-paper/50 focus:bg-white text-ink placeholder:text-ink/40 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-ink mb-1.5"
          >
            Message / Inquiry <span className="text-secondaryAccent">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us how we can assist or collaborate with you..."
            className="w-full px-4 py-3 rounded-xl border border-mutedBorder bg-paper/50 focus:bg-white text-ink placeholder:text-ink/40 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-colors text-sm resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3.5 px-6 rounded-full font-medium bg-primary text-white hover:bg-primary-hover disabled:opacity-60 transition-colors shadow-md text-base focus-visible:ring-2 focus-visible:ring-primary"
        >
          {status === "submitting" ? "Sending Message..." : "Submit Message"}
        </button>
      </form>
    </div>
  );
}
