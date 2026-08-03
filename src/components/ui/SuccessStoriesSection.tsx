"use client";

import React, { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import EmbraceMotif from "./EmbraceMotif";

interface StoryItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  highlights: string[];
  icon: React.ReactNode;
}

const SUCCESS_STORIES: StoryItem[] = [
  {
    id: "renovation",
    category: "Shelter & Dignity",
    title: "Elderly Home Renovation",
    tagline: "Restoring dignity and safety for vulnerable seniors",
    description:
      "Restoring dignity and safety by transforming the living homes of vulnerable Elders. SCWOP rehabilitates dilapidated structures, repairs roofs, installs hygienic sanitation facilities, and creates safe, weather-proof living environments.",
    image: "/Eldery%20walking%20into%20a%20room.JPG",
    badge: "Safe Shelter Rehabilitation",
    highlights: ["Roof & Structural Repairs", "Hygienic Sanitation Systems", "Weather-proof Living Spaces"],
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "eyecare",
    category: "Health & Sight",
    title: "Elderly Eye Care Services",
    tagline: "Restoring vision and hope through medical intervention",
    description:
      "Restoring vision and hope through life-changing cataract surgeries and comprehensive eye exams. SCWOP partners with medical specialists to provide free screenings, prescription eyeglasses, and surgical procedures for elderly community members.",
    image: "/Elderly%20sitting%20together.JPG",
    badge: "Cataract Surgeries & Sight Restored",
    highlights: ["Free Comprehensive Eye Exams", "Cataract Surgical Procedures", "Prescription Eyeglasses Distribution"],
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: "mobility",
    category: "Mobility & Inclusion",
    title: "Medical Equipment Distribution",
    tagline: "Enhancing mobility and independence for bedridden & disabled elders",
    description:
      "Enhancing mobility and independence by providing essential aids like wheelchairs, crutches, and blind canes. This initiative enables senior citizens to navigate their homes and communities with confidence and minimal physical assistance.",
    image: "/Elderly%20standing%20together.JPG",
    badge: "Wheelchairs, Crutches & Blind Canes",
    highlights: ["Custom Wheelchair Fitting", "Walking Crutches & Mobility Frames", "Blind Canes & Adaptive Aids"],
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: "livelihood",
    category: "Economic Empowerment",
    title: "Income-Generating Activities (IGA)",
    tagline: "Empowering individuals to achieve financial independence",
    description:
      "Empowering individuals and families to build sustainable livelihoods and achieve financial independence. SCWOP provides seed capital, micro-enterprise training, and ongoing mentorship to transition vulnerable households away from begging toward self-reliance.",
    image: "/Founders%20giving%20speach.JPG",
    badge: "Seed Capital & Business Mentorship",
    highlights: ["Micro-Enterprise Seed Capital", "Basic Business & Financial Skills", "Transitioning Away From Begging"],
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function SuccessStoriesSection() {
  const [activeId, setActiveId] = useState<string>("renovation");
  const [modalStory, setModalStory] = useState<StoryItem | null>(null);

  const activeStory = SUCCESS_STORIES.find((s) => s.id === activeId) || SUCCESS_STORIES[0];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-paper to-paper border-b border-mutedBorder relative overflow-hidden">
      {/* Background graphic motif */}
      <EmbraceMotif variant="hero-bg" className="right-4 top-12 opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-ink text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Transformative Impact • Real Stories
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
            SCWOP Success Stories & Transformations
          </h2>
          <p className="text-sm sm:text-lg text-ink/75 font-body leading-relaxed max-w-2xl mx-auto">
            Discover how targeted interventions in housing, eye surgery, mobility distribution, and income-generating seed capital restore hope and dignity across our community.
          </p>
        </ScrollReveal>

        {/* Interactive Story Selector Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {SUCCESS_STORIES.map((story) => {
            const isSelected = story.id === activeId;
            return (
              <button
                key={story.id}
                onClick={() => setActiveId(story.id)}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? "bg-primary text-white shadow-lg scale-102 sm:scale-105"
                    : "bg-white text-ink/80 hover:bg-paper hover:text-accent border border-mutedBorder"
                }`}
              >
                <span className={`p-0.5 sm:p-1 rounded-lg ${isSelected ? "text-accent bg-white/10" : "text-primary"}`}>
                  {story.icon}
                </span>
                <span className="truncate">{story.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Story Featured Showcase Card */}
        <ScrollReveal animation="scale-up" duration={0.6} className="bg-white rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Side */}
            <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[460px] group overflow-hidden">
              <Image
                src={activeStory.image}
                alt={activeStory.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-mutedBorder text-primary font-bold text-[11px] sm:text-xs shadow-md">
                  {activeStory.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-paper space-y-1">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-accent block">
                  {activeStory.category}
                </span>
                <h3 className="font-display text-xl sm:text-3xl font-bold">
                  {activeStory.title}
                </h3>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 p-5 sm:p-8 lg:p-12 flex flex-col justify-between space-y-5 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-primary/10 text-primary font-semibold text-xs">
                  <span>SCWOP Field Intervention</span>
                </div>

                <h3 className="font-display text-xl sm:text-3xl font-bold text-ink leading-snug">
                  {activeStory.tagline}
                </h3>

                <p className="text-xs sm:text-base text-ink/80 font-body leading-relaxed">
                  {activeStory.description}
                </p>

                {/* Key Highlight Bullets */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-ink/60 block">
                    Core Intervention Highlights
                  </span>
                  {activeStory.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-ink font-body font-medium">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-[10px] sm:text-xs flex-shrink-0">
                        ✓
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-mutedBorder flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setModalStory(activeStory)}
                  className="btn-shimmer w-full sm:w-auto px-6 py-3 rounded-full font-semibold bg-accent text-white hover:bg-accent-hover transition-all shadow-md text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <span>View Story Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>

                <div className="text-[11px] sm:text-xs text-ink/60 font-medium flex items-center gap-1.5 hidden sm:flex">
                  <EmbraceMotif variant="bullet" />
                  Humanitarian & Dignified Support
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Cards Grid for Quick Scannability */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveId(story.id)}
              className={`glass-card glass-card-hover p-5 sm:p-6 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 border ${
                story.id === activeId
                  ? "border-accent ring-2 ring-accent/30 bg-accent/5 shadow-lg scale-102"
                  : "border-mutedBorder hover:border-accent/40"
              }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3 sm:mb-4">
                {story.icon}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent block mb-1">
                {story.category}
              </span>
              <h4 className="font-display text-base sm:text-lg font-bold text-ink mb-1.5">
                {story.title}
              </h4>
              <p className="text-xs text-ink/75 line-clamp-3 font-body leading-relaxed">
                {story.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View for Detailed Story Lightbox */}
      {modalStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-mutedBorder relative space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalStory(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-paper hover:bg-mutedBorder text-ink transition-colors"
              aria-label="Close story modal"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
              <Image src={modalStory.image} alt={modalStory.title} fill className="object-cover" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <span className="px-3 py-1 rounded-full bg-accent/20 text-ink font-semibold text-[11px] sm:text-xs">
                {modalStory.badge}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">{modalStory.title}</h3>
              <p className="text-xs sm:text-sm font-semibold text-primary">{modalStory.tagline}</p>
              <p className="text-xs sm:text-sm text-ink/80 font-body leading-relaxed">{modalStory.description}</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-paper border border-mutedBorder space-y-2">
              <h5 className="text-[11px] sm:text-xs font-bold uppercase text-ink/70">Key Program Components</h5>
              <ul className="space-y-1.5 text-xs text-ink/85 font-medium">
                {modalStory.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setModalStory(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-primary-hover transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
