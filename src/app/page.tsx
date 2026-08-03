import React from "react";
import Link from "next/link";
import Image from "next/image";
import EmbraceMotif from "@/components/ui/EmbraceMotif";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SuccessStoriesSection from "@/components/ui/SuccessStoriesSection";
import ImpactGraphicsHub from "@/components/ui/ImpactGraphicsHub";
import { getAllSiteContent } from "@/lib/services/content";
import { getGalleryImages } from "@/lib/services/gallery";
import HomeGalleryPreview from "./HomeGalleryPreview";

export const revalidate = 60; // Revalidate content every 60s

export default async function HomePage() {
  const content = await getAllSiteContent();
  const galleryImages = await getGalleryImages();
  const recentImages = galleryImages.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-paper via-paper to-primary/5 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-mutedBorder">
        {/* Animated Embrace Motif background graphic */}
        <EmbraceMotif variant="hero-bg" className="right-4 top-8 lg:right-24 lg:top-12" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left">
              <ScrollReveal animation="slide-right" duration={0.8} className="space-y-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-mutedBorder shadow-xs text-ink text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  Intergenerational Support • NGO
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-primary leading-[1.15] tracking-tight">
                  {content.hero_title}
                </h1>

                <p className="text-lg sm:text-xl text-ink/85 max-w-2xl font-body leading-relaxed">
                  {content.hero_tagline}
                </p>

                {/* Three Generation Pillars Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Children's Support & OVC
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-ink text-xs font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Women's Empowerment & IGA
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-secondaryAccent/20 border border-secondaryAccent/30 text-ink text-xs font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondaryAccent" />
                    Elders' Care & Cash Transfers
                  </span>
                </div>

                {/* CTAs */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href="/about"
                    className="btn-shimmer px-8 py-4 rounded-full font-semibold bg-primary text-white hover:bg-primary-hover transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary text-base inline-flex items-center gap-3 group"
                  >
                    <span>{content.hero_cta_primary}</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="/contact"
                    className="btn-shimmer px-8 py-4 rounded-full font-semibold bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary text-base"
                  >
                    {content.hero_cta_secondary}
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Visual Image Card with Floating Badge */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal animation="scale-up" delay={0.2} duration={1}>
                {/* Floating Badge */}
                <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-mutedBorder shadow-lg animate-float">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    ❤
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block leading-none">
                      Non-Discriminatory Care
                    </span>
                    <span className="text-[10px] font-medium text-primary block mt-0.5">
                      Humanitarianism & Equality
                    </span>
                  </div>
                </div>

                <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={content.hero_image_url || "/Children%20gathered%20and%20standing%20together.JPG"}
                      alt="SCWOP children gathered and standing together"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-7 text-paper space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                      Three Generations, One Mission
                    </span>
                    <p className="font-display text-2xl font-bold leading-snug">
                      Children • Women • Older Adults
                    </p>
                    <p className="text-xs text-paper/80 font-body">
                      Empowering vulnerable families with care, dignity, and education.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT / STAT CARDS SECTION */}
      <section className="py-20 bg-paper border-b border-mutedBorder relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="stagger-children" stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Stat Card 1 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-display text-4xl font-bold text-ink block mb-1">
                {content.stat_1_number}
              </span>
              <span className="text-sm font-semibold text-ink/80 block">
                {content.stat_1_label}
              </span>
            </div>

            {/* Stat Card 2 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-ink mb-5 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0a2 2 0 01-2-2V8a2 2 0 012-2h2a2 2 0 012 2v11a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-display text-4xl font-bold text-ink block mb-1">
                {content.stat_2_number}
              </span>
              <span className="text-sm font-semibold text-ink/80 block">
                {content.stat_2_label}
              </span>
            </div>

            {/* Stat Card 3 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-secondaryAccent/20 flex items-center justify-center text-ink mb-5 group-hover:scale-110 group-hover:bg-secondaryAccent group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-display text-4xl font-bold text-ink block mb-1">
                {content.stat_3_number}
              </span>
              <span className="text-sm font-semibold text-ink/80 block">
                {content.stat_3_label}
              </span>
            </div>

            {/* Stat Card 4 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-display text-4xl font-bold text-ink block mb-1">
                {content.stat_4_number}
              </span>
              <span className="text-sm font-semibold text-ink/80 block">
                {content.stat_4_label}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* KEY PROJECT INTERVENTIONS SECTION */}
      <section className="py-24 bg-white border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
              Action In The Field
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
              Key Project Interventions & Activities
            </h2>
            <p className="text-base text-ink/75 mt-4 font-body">
              Targeted humanitarian programs designed to restore dignity, improve health, and provide economic self-reliance across our community.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="stagger-children" stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Monthly Cash Transfers */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  01
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Monthly Cash Transfers
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed font-body">
                  Providing direct monthly financial aid to <strong>1,100 Elders</strong> and <strong>130 Orphan & Vulnerable Children (OVC)</strong> selected beneficiaries to cover basic living expenses.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-mutedBorder/50 text-xs font-semibold text-primary">
                Direct Relief • 1,230 Beneficiaries
              </div>
            </div>

            {/* 2. Healthcare Services */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                  02
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Healthcare Services & Eye Surgeries
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed font-body">
                  Access to essential medical treatments, routine check-ups, and life-changing cataract eye surgeries for elderly community members.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-mutedBorder/50 text-xs font-semibold text-accent">
                Medical Care & Eye Surgery
              </div>
            </div>

            {/* 3. Home Renovation and Repairs */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent font-bold text-lg">
                  03
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Home Renovation & Repairs
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed font-body">
                  Rehabilitating dilapidated houses to ensure safe, hygienic, and dignified living conditions for vulnerable elders.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-mutedBorder/50 text-xs font-semibold text-secondaryAccent">
                Shelter Rehabilitation
              </div>
            </div>

            {/* 4. Income Generating Activities (IGA) */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                  04
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Income Generating Activities (IGA)
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed font-body">
                  Empowering active elderly individuals or caregivers with seed capital and business training to foster self-reliance and transition away from begging.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-mutedBorder/50 text-xs font-semibold text-accent">
                Livelihood & Economic Empowerment
              </div>
            </div>

            {/* 5. Medical Equipment & Mobility Aids */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  05
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Medical Equipment & Mobility Aids
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed font-body">
                  Providing wheelchairs, crutches, and blind canes to enhance physical mobility and independence for senior citizens.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-mutedBorder/50 text-xs font-semibold text-primary">
                Mobility & Adaptive Assistive Devices
              </div>
            </div>

            {/* 6. Sanitation and Hygiene */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent font-bold text-lg">
                  06
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Sanitation, Hygiene & Home Visits
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed font-body">
                  Home visits by social workers or volunteers to provide psychosocial support, hygiene kits, medical follow-ups, and companionship for bedridden elders.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-mutedBorder/50 text-xs font-semibold text-secondaryAccent">
                Home Visits & Companion Care
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NEW INTERACTIVE GRAPHICS & STATS HUB */}
      <ImpactGraphicsHub />

      {/* OVC (ORPHAN & VULNERABLE CHILDREN) SPECIAL PROGRAM SECTION */}
      <section className="py-24 bg-gradient-to-b from-paper via-paper to-white border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal animation="slide-right">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full group">
                  <Image
                    src={content.ovc_section_image_url || "/Children%20gathered%20and%20standing%20together.JPG"}
                    alt="SCWOP Orphan and Vulnerable Children (OVC) program"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-paper">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                      130 OVC Children Supported
                    </span>
                    <p className="font-display text-xl font-bold">
                      Comprehensive Child Care & Education
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="slide-left" className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/20 border border-accent/40 text-ink text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Specialized Intervention • OVC Program
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                  Orphan & Vulnerable Children (OVC) Educational Support
                </h2>
                <p className="text-base text-ink/80 leading-relaxed font-body">
                  Empowering the grandchildren of the elderly by providing access to high-quality education, equipping them to become supportive pillars for their families and impactful citizens for their country through a 5-pillar support framework:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* A */}
                  <div className="p-4 rounded-2xl bg-white border border-mutedBorder/80 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0 mt-0.5">
                      A
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">Monthly Tuition & Care Fee</h4>
                      <p className="text-xs text-ink/75 mt-0.5">Covering monthly school or institutional fees to ensure continuous education without interruption.</p>
                    </div>
                  </div>

                  {/* B */}
                  <div className="p-4 rounded-2xl bg-white border border-mutedBorder/80 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xs flex-shrink-0 mt-0.5">
                      B
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">Educational Materials Support</h4>
                      <p className="text-xs text-ink/75 mt-0.5">Providing essential learning supplies including notebooks, pens, pencils, school bags, and uniforms.</p>
                    </div>
                  </div>

                  {/* C */}
                  <div className="p-4 rounded-2xl bg-white border border-mutedBorder/80 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent font-bold text-xs flex-shrink-0 mt-0.5">
                      C
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">Christmas Food Gift Support</h4>
                      <p className="text-xs text-ink/75 mt-0.5">Distributing holiday gift packages containing flour, cooking oil, grains, and food staples for joyful celebrations.</p>
                    </div>
                  </div>

                  {/* D */}
                  <div className="p-4 rounded-2xl bg-white border border-mutedBorder/80 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xs flex-shrink-0 mt-0.5">
                      D
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">Clothing & Footwear Support</h4>
                      <p className="text-xs text-ink/75 mt-0.5">Providing appropriate seasonal clothing and shoes for all supported children.</p>
                    </div>
                  </div>

                  {/* E */}
                  <div className="p-4 sm:col-span-2 rounded-2xl bg-white border border-mutedBorder/80 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0 mt-0.5">
                      E
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">Hygiene Supplies & Health Protection</h4>
                      <p className="text-xs text-ink/75 mt-0.5">Providing body soap, toothbrushes, and toothpaste, alongside sanitary pads and tissues for adolescent girls.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <SuccessStoriesSection content={content} />

      {/* MISSION EXCERPT SECTION */}
      <section className="py-24 bg-gradient-to-br from-paper via-accent/5 to-paper relative overflow-hidden">
        <ScrollReveal animation="fade-up" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <EmbraceMotif variant="badge" className="mb-8" />

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-6">
            {content.mission_excerpt_title}
          </h2>

          <p className="text-lg sm:text-xl text-ink/85 leading-relaxed font-body max-w-3xl mx-auto mb-10">
            {content.mission_excerpt_body}
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 font-semibold text-primary hover:text-accent text-lg group focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 transition-all"
          >
            <span className="border-b-2 border-primary/30 group-hover:border-accent transition-colors">
              Learn more about our vision, strategic objectives & core values
            </span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </ScrollReveal>

        <EmbraceMotif variant="divider" />
      </section>

      {/* RECENT GALLERY PREVIEW SECTION */}
      <section className="py-20 bg-paper border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                Impact In Pictures
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                Recent Gallery Highlights
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent text-base group"
            >
              Explore Full Gallery ({galleryImages.length} items)
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>

          {/* Interactive Lightbox-enabled Gallery Grid */}
          <HomeGalleryPreview images={recentImages} />
        </div>
      </section>

      {/* CLOSING CTA BANNER */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-hover to-primary text-white relative overflow-hidden shadow-2xl">
        <EmbraceMotif variant="hero-bg" className="left-10 top-2 opacity-15" />

        <ScrollReveal animation="scale-up" duration={0.9} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {content.cta_banner_title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed">
            {content.cta_banner_subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Link
              href="/contact"
              className="btn-shimmer px-9 py-4 rounded-full font-semibold bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-xl text-base focus-visible:ring-2 focus-visible:ring-white hover:-translate-y-0.5"
            >
              Contact Our Team
            </Link>
            <Link
              href="/about"
              className="px-9 py-4 rounded-full font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all duration-300 text-base hover:-translate-y-0.5"
            >
              Read About SCWOP
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
