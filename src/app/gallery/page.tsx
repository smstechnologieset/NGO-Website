import React from "react";
import Metadata from "next";
import EmbraceMotif from "@/components/ui/EmbraceMotif";
import { getGalleryImages } from "@/lib/services/gallery";
import GalleryGridClient from "./GalleryGridClient";

export const metadata = {
  title: "Photo Gallery | SCWOP NGO",
  description:
    "Explore photo highlights from SCWOP's community programs supporting children, women, and older adults.",
};

export const revalidate = 30; // Revalidate every 30s

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="flex flex-col min-h-screen">
      {/* GALLERY HERO */}
      <section className="relative py-14 lg:py-20 bg-gradient-to-b from-paper via-paper to-accent/5 border-b border-mutedBorder">
        <EmbraceMotif variant="hero-bg" className="right-8 top-4" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-ink text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Visual Archive • Field Stories
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4 leading-tight">
            Our Community Gallery
          </h1>

          <p className="text-lg text-ink/80 font-body leading-relaxed max-w-2xl mx-auto">
            Witness our intergenerational impact across communities. Click any photo to view full details and captions.
          </p>
        </div>
      </section>

      {/* GALLERY GRID CLIENT */}
      <section className="py-16 bg-paper flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGridClient initialImages={images} />
        </div>
      </section>

      <EmbraceMotif variant="divider" />
    </div>
  );
}
