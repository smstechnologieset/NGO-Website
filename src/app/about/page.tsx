import React from "react";
import Metadata from "next";
import Image from "next/image";
import Link from "next/link";
import EmbraceMotif from "@/components/ui/EmbraceMotif";
import { getAllSiteContent } from "@/lib/services/content";

export const metadata = {
  title: "About Us | SCWOP NGO",
  description:
    "Learn about SCWOP's history, mission, vision, and strategic goals for children, women, and older people.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const content = await getAllSiteContent();

  return (
    <div className="flex flex-col min-h-screen">
      {/* PAGE HEADER / HERO */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-paper via-paper to-primary/5 border-b border-mutedBorder">
        <EmbraceMotif variant="hero-bg" className="left-6 top-6" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Who We Are • Our Mandate
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-6 leading-tight">
            Nurturing Generations, Transforming Communities
          </h1>

          <p className="text-lg sm:text-xl text-ink/80 font-body leading-relaxed max-w-3xl mx-auto">
            SCWOP (Support for Children, Women and Older People) is a registered
            non-governmental organization committed to creating interconnected safety
            nets for society’s most vital yet often vulnerable populations.
          </p>
        </div>
      </section>

      {/* MISSION & VISION GRID */}
      <section className="py-20 bg-paper border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-mutedBorder shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-ink/80 leading-relaxed font-body">
                  {content.about_mission}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-mutedBorder/50 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <EmbraceMotif variant="bullet" />
                Intergenerational Support Action
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-mutedBorder shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-ink">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Our Vision
                </h2>
                <p className="text-base sm:text-lg text-ink/80 leading-relaxed font-body">
                  {content.about_vision}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-mutedBorder/50 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <EmbraceMotif variant="bullet" />
                Sustainable Future & Human Dignity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE OBJECTIVES SECTION */}
      <section className="py-20 bg-gradient-to-b from-paper to-accent/5 border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondaryAccent block mb-2">
              Strategic Focus
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              Core Strategic Objectives
            </h2>
            <p className="text-base text-ink/75 mt-3">
              Designed around the 3 pillars of community care: youth development, women's self-reliance, and senior wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Objective 1: Children */}
            <div className="p-8 rounded-3xl bg-white border border-mutedBorder shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 font-display font-bold text-xl">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-3">
                Child Development & Education
              </h3>
              <ul className="space-y-3 text-sm text-ink/80 font-body">
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Ensure access to quality early childhood learning and nutritional support.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Protect children against neglect, exploitation, and educational disruption.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Provide safe recreational and creative learning spaces.</span>
                </li>
              </ul>
            </div>

            {/* Objective 2: Women */}
            <div className="p-8 rounded-3xl bg-white border border-mutedBorder shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-ink mb-6 font-display font-bold text-xl">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-3">
                Women's Economic Rights & Health
              </h3>
              <ul className="space-y-3 text-sm text-ink/80 font-body">
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Facilitate vocational skills, micro-grants, and financial literacy.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Promote maternal healthcare awareness, hygiene, and reproductive wellness.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Advocate against gender-based violence and foster community leadership.</span>
                </li>
              </ul>
            </div>

            {/* Objective 3: Older People */}
            <div className="p-8 rounded-3xl bg-white border border-mutedBorder shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondaryAccent/20 flex items-center justify-center text-ink mb-6 font-display font-bold text-xl">
                03
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-3">
                Senior Care & Dignified Aging
              </h3>
              <ul className="space-y-3 text-sm text-ink/80 font-body">
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Provide routine geriatric health checks, mobility aids, and home visits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Combat social isolation through intergenerational circles and companionship.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <EmbraceMotif variant="bullet" className="mt-1" />
                  <span>Safeguard elderly rights and heritage preservation in local communities.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING STORY & HISTORY SECTION */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                  alt="SCWOP founding gathering and community elders"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
                Our Journey & Roots
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                Founding Story & History
              </h2>
              <p className="text-base sm:text-lg text-ink/80 leading-relaxed font-body">
                {content.about_founding_story}
              </p>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <blockquote className="font-display text-lg italic text-ink">
                  &ldquo;When a grandmother is cared for, a mother is supported, and a child is educated, the entire village flourishes.&rdquo;
                </blockquote>
                <span className="text-xs font-semibold text-primary block mt-3 uppercase tracking-wider">
                  — SCWOP Founding Principle
                </span>
              </div>
            </div>
          </div>
        </div>

        <EmbraceMotif variant="divider" />
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-ink text-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display text-3xl font-bold text-paper">
            Partner with SCWOP Today
          </h2>
          <p className="text-base text-paper/80 font-body max-w-2xl mx-auto">
            Whether you represent a community organization, a donor entity, or an eager volunteer, your collaboration strengthens our intergenerational support network.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full font-medium bg-accent text-ink hover:bg-accent-hover transition-colors shadow-md text-base inline-block focus-visible:ring-2 focus-visible:ring-white"
            >
              Get in Touch With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
