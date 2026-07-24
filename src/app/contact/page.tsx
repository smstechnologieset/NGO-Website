import React from "react";
import Metadata from "next";
import EmbraceMotif from "@/components/ui/EmbraceMotif";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllSiteContent } from "@/lib/services/content";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | SCWOP NGO",
  description:
    "Get in touch with SCWOP NGO in Addis Ababa. Find our office address, phone numbers, email, location map, or send us a direct message.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const content = await getAllSiteContent();

  return (
    <div className="flex flex-col min-h-screen">
      {/* CONTACT HERO */}
      <section className="relative py-14 lg:py-20 bg-gradient-to-b from-paper via-paper to-primary/5 border-b border-mutedBorder overflow-hidden">
        <EmbraceMotif variant="hero-bg" className="left-8 top-4" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Connect With SCWOP • We Are Here To Help
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4 leading-tight">
              Get in Touch With Our Office
            </h1>

            <p className="text-lg text-ink/80 font-body leading-relaxed max-w-2xl mx-auto">
              Whether you want to partner, inquire about our community programs, or volunteer, we welcome your communication.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT CONTENT GRID */}
      <section className="py-16 bg-paper flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal animation="slide-right">
                <div className="p-8 rounded-3xl bg-white border border-mutedBorder shadow-sm space-y-6">
                  <h2 className="font-display text-2xl font-bold text-ink border-b border-mutedBorder/60 pb-4">
                    Organization Details
                  </h2>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-1">
                        Main Office Address
                      </h3>
                      <p className="text-base text-ink font-body font-medium">
                        {content.contact_address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-1">
                        Telephone Lines
                      </h3>
                      <p className="text-base text-ink font-body font-medium whitespace-pre-line">
                        {content.contact_phone}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-1">
                        Email Communication
                      </h3>
                      <p className="text-base text-ink font-body font-medium">
                        {content.contact_email}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-1">
                        Working Hours
                      </h3>
                      <p className="text-base text-ink font-body font-medium">
                        {content.contact_hours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EMBEDDED MAP IFRAME */}
                <div className="rounded-3xl overflow-hidden border border-mutedBorder shadow-sm bg-white aspect-[16/10] relative mt-8">
                  <iframe
                    title="SCWOP NGO Location Map"
                    src="https://maps.google.com/maps?q=Semit+Fiyel+Bet+Addis+Ababa&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="slide-left" delay={0.15}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <EmbraceMotif variant="divider" />
    </div>
  );
}
