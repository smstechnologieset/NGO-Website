import React from "react";
import Link from "next/link";
import Image from "next/image";
import EmbraceMotif from "@/components/ui/EmbraceMotif";
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
            <div className="lg:col-span-7 space-y-7 text-left">
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
                <span className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Children's Protection
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-ink text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Women's Empowerment
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-secondaryAccent/20 border border-secondaryAccent/30 text-ink text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondaryAccent" />
                  Elders' Dignity & Care
                </span>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/gallery"
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
                  className="btn-shimmer px-8 py-4 rounded-full font-semibold bg-accent text-ink hover:bg-accent-hover transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary text-base"
                >
                  {content.hero_cta_secondary}
                </Link>
              </div>
            </div>

            {/* Right Visual Image Card with Floating Badge */}
            <div className="lg:col-span-5 relative">
              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-mutedBorder shadow-lg animate-float">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  ❤
                </div>
                <div>
                  <span className="text-xs font-bold text-ink block leading-none">
                    Community Safety Net
                  </span>
                  <span className="text-[10px] font-medium text-primary block mt-0.5">
                    100% Direct Impact
                  </span>
                </div>
              </div>

              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                    alt="SCWOP children and elders in community learning center"
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
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT / STAT CARDS SECTION */}
      <section className="py-20 bg-paper border-b border-mutedBorder relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-ink mb-5 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
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
          </div>
        </div>
      </section>

      {/* MISSION EXCERPT SECTION */}
      <section className="py-24 bg-gradient-to-br from-paper via-accent/5 to-paper relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <EmbraceMotif variant="badge" className="mb-8" />

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-6">
            {content.mission_excerpt_title}
          </h2>

          <p className="text-lg sm:text-xl text-ink/85 leading-relaxed font-body max-w-3xl mx-auto mb-10">
            {content.mission_excerpt_body}
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 font-semibold text-primary hover:text-primary-hover text-lg group focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 transition-all"
          >
            <span className="border-b-2 border-primary/30 group-hover:border-primary transition-colors">
              Learn more about our history & governance
            </span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1.5 transition-transform"
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
        </div>

        <EmbraceMotif variant="divider" />
      </section>

      {/* RECENT GALLERY PREVIEW SECTION */}
      <section className="py-20 bg-paper border-b border-mutedBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Impact In Pictures
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                Recent Gallery Highlights
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover text-base group"
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
          </div>

          {/* Interactive Lightbox-enabled Gallery Grid */}
          <HomeGalleryPreview images={recentImages} />
        </div>
      </section>

      {/* CLOSING CTA BANNER */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-hover to-primary text-white relative overflow-hidden shadow-2xl">
        <EmbraceMotif variant="hero-bg" className="left-10 top-2 opacity-15" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {content.cta_banner_title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed">
            {content.cta_banner_subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Link
              href="/contact"
              className="btn-shimmer px-9 py-4 rounded-full font-semibold bg-accent text-ink hover:bg-accent-hover transition-all duration-300 shadow-xl text-base focus-visible:ring-2 focus-visible:ring-white hover:-translate-y-0.5"
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
        </div>
      </section>
    </div>
  );
}
