import React from "react";
import Metadata from "next";
import Image from "next/image";
import Link from "next/link";
import EmbraceMotif from "@/components/ui/EmbraceMotif";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SuccessStoriesSection from "@/components/ui/SuccessStoriesSection";
import ImpactGraphicsHub from "@/components/ui/ImpactGraphicsHub";
import { getAllSiteContent } from "@/lib/services/content";

export const metadata = {
  title: "About Us | SCWOP NGO",
  description:
    "Learn about SCWOP's vision, mission, core values, strategic objectives (Elderly Care, Economic Empowerment, OVC Education), and 2001 founding history.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const content = await getAllSiteContent();

  return (
    <div className="flex flex-col min-h-screen">
      {/* PAGE HEADER / HERO */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-paper via-paper to-primary/5 border-b border-mutedBorder overflow-hidden">
        <EmbraceMotif variant="hero-bg" className="left-6 top-6" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Who We Are • Our Mandate
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-6 leading-tight">
              Support for Children, Women and Older People (SCWOP)
            </h1>

            <p className="text-lg sm:text-xl text-ink/80 font-body leading-relaxed max-w-3xl mx-auto">
              A robust and impactful organization driving sustainable and positive transformation in the lives of children, women, and elders through holistic care and strategic community partnerships.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* MISSION & VISION GRID */}
      <section className="py-20 bg-paper border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="stagger-children" stagger={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-mutedBorder shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Our Vision
                </h2>
                <p className="text-base sm:text-lg text-ink/80 leading-relaxed font-body">
                  &ldquo;{content.about_vision}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-mutedBorder/50 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <EmbraceMotif variant="bullet" />
                Sustainable Community Transformation
              </div>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-mutedBorder shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
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
                  &ldquo;{content.about_mission}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-mutedBorder/50 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <EmbraceMotif variant="bullet" />
                Holistic Support & Strategic Partnerships
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CORE OBJECTIVES SECTION */}
      <section className="py-24 bg-gradient-to-b from-paper to-white border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary block">
              Strategic Mandate
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
              Our Primary Objectives
            </h2>
            <p className="text-base text-ink/75 font-body leading-relaxed">
              Targeted focus areas guiding all SCWOP humanitarian operations and intergenerational community interventions.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="stagger-children" stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Objective 1: Elderly Care */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  01
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">
                  {content.objective_1_title || "Elderly Care & Well-being"}
                </h3>
                <p className="text-base text-ink/80 leading-relaxed font-body">
                  {content.objective_1_desc || "To provide elderly individuals with love, comprehensive care, and essential basic needs, ensuring they spend their remaining years in dignity."}
                </p>
              </div>

              <div className="pt-4 border-t border-mutedBorder/60 space-y-2 text-xs font-medium text-ink/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Monthly Cash Transfers & Food Packages
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Cataract Eye Surgeries & Medical Aids
                </div>
              </div>
            </div>

            {/* Objective 2: Economic Empowerment */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                  02
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">
                  {content.objective_2_title || "Economic Empowerment"}
                </h3>
                <p className="text-base text-ink/80 leading-relaxed font-body">
                  {content.objective_2_desc || "To transition the elderly away from begging by fostering self-reliance, enabling them to sustainably support themselves and their families."}
                </p>
              </div>

              <div className="pt-4 border-t border-mutedBorder/60 space-y-2 text-xs font-medium text-ink/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  IGA Seed Capital & Skill Workshops
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Micro-Enterprise Business Training
                </div>
              </div>
            </div>

            {/* Objective 3: Educational Support for OVC */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent font-bold text-xl">
                  03
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">
                  {content.objective_3_title || "Educational Support for OVC"}
                </h3>
                <p className="text-base text-ink/80 leading-relaxed font-body">
                  {content.objective_3_desc || "To empower the grandchildren of the elderly by providing access to high-quality education, equipping them to become supportive pillars for their families and impactful citizens for their country."}
                </p>
              </div>

              <div className="pt-4 border-t border-mutedBorder/60 space-y-2 text-xs font-medium text-ink/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondaryAccent" />
                  Tuition, Uniforms & Learning Supplies
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondaryAccent" />
                  Holiday Food Gifts & Hygiene Support
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INTERACTIVE IMPACT GRAPHICS HUB */}
      <ImpactGraphicsHub />

      {/* SUCCESS STORIES SECTION */}
      <SuccessStoriesSection content={content} />

      {/* CORE VALUES SECTION */}
      <section className="py-24 bg-white border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-accent block">
              Ethical Standards & Principles
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
              Our Core Values
            </h2>
            <p className="text-base text-ink/80 leading-relaxed font-body">
              Our organization respects human equality without discrimination based on gender, race, ethnicity, or religion, and upholds the following core principles:
            </p>
          </ScrollReveal>

          <ScrollReveal animation="stagger-children" stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Humanitarianism
              </h3>
              <p className="text-sm text-ink/80 leading-relaxed font-body">
                Serving individuals with dignity and placing human well-being above all.
              </p>
            </div>

            {/* Value 2 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Transparency & Accountability
              </h3>
              <p className="text-sm text-ink/80 leading-relaxed font-body">
                Operating with openness and taking full responsibility for our actions.
              </p>
            </div>

            {/* Value 3 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent font-bold text-xl">
                03
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Integrity
              </h3>
              <p className="text-sm text-ink/80 leading-relaxed font-body">
                Ensuring honesty, trustworthiness, and ethical conduct in all operations and resource management.
              </p>
            </div>

            {/* Value 4 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                04
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Gender Equality
              </h3>
              <p className="text-sm text-ink/80 leading-relaxed font-body">
                Promoting fairness, inclusivity, and equal opportunities across all programs.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOUNDING STORY & HISTORY SECTION */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <ScrollReveal animation="slide-right">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] w-full group">
                  <Image
                    src={content.about_founding_image_url || "/Founders%20giving%20speach.JPG"}
                    alt="SCWOP founders addressing community members"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-paper text-xs font-semibold">
                    SCWOP Founders & Leadership Community Address
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6">
              <ScrollReveal animation="slide-left" className="space-y-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
                  Our Journey & Roots (Est. 2001)
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                  Organization Founding Story & History
                </h2>
                <p className="text-base sm:text-lg text-ink/80 leading-relaxed font-body">
                  {content.about_founding_story}
                </p>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                  <blockquote className="font-display text-lg italic text-ink">
                    &ldquo;From 5 founders supporting 30 vulnerable people in 2001 to now serving 1,100 elders and 130 children.&rdquo;
                  </blockquote>
                  <span className="text-xs font-semibold text-primary block uppercase tracking-wider">
                    — SCWOP 20+ Year Milestone Impact
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <EmbraceMotif variant="divider" />
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-primary text-paper">
        <ScrollReveal animation="fade-up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display text-3xl font-bold text-paper">
            Partner with SCWOP Today
          </h2>
          <p className="text-base text-paper/80 font-body max-w-2xl mx-auto">
            Whether you represent a community organization, a government entity, or an international donor partner, your collaboration strengthens our impact across vulnerable households.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-shimmer px-8 py-3.5 rounded-full font-medium bg-accent text-white hover:bg-accent-hover transition-colors shadow-md text-base inline-block focus-visible:ring-2 focus-visible:ring-white"
            >
              Get in Touch With Us
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
