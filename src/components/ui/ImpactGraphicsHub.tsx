"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import EmbraceMotif from "./EmbraceMotif";

export default function ImpactGraphicsHub() {
  // Donut chart dialing animation state
  const [dialProgress, setDialProgress] = useState(0);

  // Interactive Impact Calculator State
  const [familyCount, setFamilyCount] = useState<number>(5);

  // Animate the donut dial from 0 to 100% on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setDialProgress(1);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const PRESETS = [1, 5, 10, 20, 50];

  return (
    <div className="space-y-0">
      {/* SECTION 1: STANDALONE ANIMATED BENEFICIARY DONUT DIAL */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-paper via-white to-paper border-b border-mutedBorder relative overflow-hidden">
        <EmbraceMotif variant="hero-bg" className="left-4 top-10 opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Beneficiary Breakdown • 100% Direct Relief
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
              Intergenerational Community Distribution
            </h2>
            <p className="text-sm sm:text-lg text-ink/80 font-body leading-relaxed max-w-2xl mx-auto">
              SCWOP focuses on holistic family support—ensuring vulnerable senior citizens and their orphaned grandchildren receive direct monthly aid.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="scale-up" duration={0.7} className="bg-white rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-xl p-5 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Animated Donut Graphic */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
                <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Background track circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#F0F5F9"
                      strokeWidth="13"
                    />

                    {/* Segment 1: Elders (89.4% -> circumference ~238.7px) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#0B284C"
                      strokeWidth="13"
                      strokeDasharray="238.7"
                      strokeDashoffset={238.7 * (1 - dialProgress * 0.894)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />

                    {/* Segment 2: OVC Children (10.6%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#0284C7"
                      strokeWidth="13"
                      strokeDasharray="238.7"
                      strokeDashoffset={238.7 * (1 - dialProgress * 0.106)}
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "center",
                        transform: `rotate(${dialProgress * 321.8}deg)`,
                      }}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Dial Center Info */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 sm:p-4">
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-accent block">
                      Total Beneficiaries
                    </span>
                    <span className="font-display text-3xl sm:text-5xl font-bold text-ink block my-0.5 sm:my-1">
                      1,230
                    </span>
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] sm:text-xs">
                      Active Households
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-ink">Elders Care (89.4%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-ink">OVC Children (10.6%)</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Cards & Metrics */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  {/* Elders Card */}
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-paper border border-mutedBorder hover:border-primary/40 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg sm:text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        👵
                      </div>
                      <div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-ink">
                          1,100 Senior Citizens Supported
                        </h3>
                        <p className="text-xs text-ink/75 font-body leading-relaxed mt-0.5">
                          Receiving direct monthly cash transfers, food baskets, healthcare, and home repairs.
                        </p>
                      </div>
                    </div>
                    <span className="font-display text-lg sm:text-xl font-bold text-primary self-end sm:self-center">
                      89.4%
                    </span>
                  </div>

                  {/* OVC Children Card */}
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-paper border border-mutedBorder hover:border-accent/40 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-lg sm:text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        🧒
                      </div>
                      <div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-ink">
                          130 Orphan & Vulnerable Children
                        </h3>
                        <p className="text-xs text-ink/75 font-body leading-relaxed mt-0.5">
                          Full term tuition coverage, educational materials, seasonal clothes & hygiene supplies.
                        </p>
                      </div>
                    </div>
                    <span className="font-display text-lg sm:text-xl font-bold text-accent self-end sm:self-center">
                      10.6%
                    </span>
                  </div>
                </div>

                {/* Additional Badges */}
                <div className="pt-2 border-t border-mutedBorder flex flex-wrap gap-2">
                  <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-mutedBorder text-ink text-[11px] sm:text-xs font-semibold shadow-xs flex items-center gap-1.5">
                    <span>🏠</span> Home Renovations & Repairs
                  </span>
                  <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-mutedBorder text-ink text-[11px] sm:text-xs font-semibold shadow-xs flex items-center gap-1.5">
                    <span>👁️</span> Cataract Eye Surgeries
                  </span>
                  <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-mutedBorder text-ink text-[11px] sm:text-xs font-semibold shadow-xs flex items-center gap-1.5">
                    <span>💼</span> IGA Micro-Enterprise Capital
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: STANDALONE VISUAL COMMUNITY IMPACT ESTIMATOR */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-mutedBorder relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-ink text-xs font-semibold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              Interactive Community Calculator
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
              See How Your Support Changes Lives
            </h2>
            <p className="text-sm sm:text-lg text-ink/80 font-body leading-relaxed max-w-2xl mx-auto">
              Select or adjust the number of supported families below to see the exact tangible relief SCWOP delivers.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="scale-up" duration={0.6} className="bg-paper rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-xl p-5 sm:p-8 lg:p-12 space-y-8 sm:space-y-10">
            {/* Friendly Preset Chips & Counter Controls */}
            <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink/70 block">
                Step 1: Choose Number of Supported Families
              </span>

              {/* Quick Choice Preset Buttons */}
              <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setFamilyCount(preset)}
                    className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                      familyCount === preset
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white text-ink/80 hover:bg-white/80 border border-mutedBorder"
                    }`}
                  >
                    {preset} {preset === 1 ? "Family" : "Families"}
                  </button>
                ))}
              </div>

              {/* Plus / Minus Counter Widget */}
              <div className="flex items-center justify-between sm:inline-flex gap-2 sm:gap-4 bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-sm w-full sm:w-auto">
                <button
                  onClick={() => setFamilyCount(Math.max(1, familyCount - 1))}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-paper hover:bg-mutedBorder text-ink font-bold text-xl sm:text-2xl flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0"
                  aria-label="Decrease family count"
                >
                  -
                </button>

                <div className="px-3 sm:px-6 text-center flex-1 sm:flex-none">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-ink block leading-none">
                    {familyCount}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-primary block mt-0.5 sm:mt-1 uppercase">
                    {familyCount === 1 ? "Household" : "Households"}
                  </span>
                </div>

                <button
                  onClick={() => setFamilyCount(Math.min(100, familyCount + 1))}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xl sm:text-2xl flex items-center justify-center transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0"
                  aria-label="Increase family count"
                >
                  +
                </button>
              </div>
            </div>

            {/* Step 2: Visual Tangible Outcomes Grid */}
            <div className="space-y-4">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink/70 block text-center">
                Step 2: Direct Community Impact Delivered
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Outcome 1: Cash Transfers */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-sm hover:shadow-md transition-all space-y-2.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl sm:text-2xl font-bold">
                    💵
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-primary block">
                      {familyCount} Months
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-ink mt-0.5">
                      Direct Cash Stipends
                    </h4>
                    <p className="text-xs text-ink/75 font-body leading-relaxed mt-1">
                      Guaranteed monthly cash aid providing seniors with financial dignity and basic living independence.
                    </p>
                  </div>
                </div>

                {/* Outcome 2: Food Packages */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-sm hover:shadow-md transition-all space-y-2.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent/20 flex items-center justify-center text-accent text-xl sm:text-2xl font-bold">
                    🌾
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-accent block">
                      {familyCount * 2} Baskets
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-ink mt-0.5">
                      Nutritious Food Packages
                    </h4>
                    <p className="text-xs text-ink/75 font-body leading-relaxed mt-1">
                      Flour, cooking oil, grains, and fresh food staples to ensure full nutritional security.
                    </p>
                  </div>
                </div>

                {/* Outcome 3: OVC Education */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-sm hover:shadow-md transition-all space-y-2.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondaryAccent/20 flex items-center justify-center text-secondaryAccent text-xl sm:text-2xl font-bold">
                    🎒
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-secondaryAccent block">
                      {Math.ceil(familyCount * 0.8)} Children
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-ink mt-0.5">
                      Full School Sponsorship
                    </h4>
                    <p className="text-xs text-ink/75 font-body leading-relaxed mt-1">
                      Tuition fees, uniforms, bags, books, and hygiene kits for grandchildren of elderly households.
                    </p>
                  </div>
                </div>

                {/* Outcome 4: Healthcare & Surgeries */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-mutedBorder shadow-sm hover:shadow-md transition-all space-y-2.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl sm:text-2xl font-bold">
                    🩺
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-primary block">
                      {familyCount} Visits
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-ink mt-0.5">
                      Health & Eye Screenings
                    </h4>
                    <p className="text-xs text-ink/75 font-body leading-relaxed mt-1">
                      Geriatric health visits, medical prescriptions, and eligibility for free cataract eye surgeries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
