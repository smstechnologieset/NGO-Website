"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/types/database";
import Lightbox from "./Lightbox";

interface GalleryGridClientProps {
  initialImages: GalleryImage[];
}

export default function GalleryGridClient({
  initialImages,
}: GalleryGridClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeImage = selectedIndex !== null ? initialImages[selectedIndex] : null;

  if (!initialImages || initialImages.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-mutedBorder p-8 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-paper flex items-center justify-center mx-auto mb-4 text-ink/40">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-ink mb-2">No Gallery Photos Yet</h3>
        <p className="text-sm text-ink/70">Check back soon as our team uploads new photos of our work in the field.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className="group rounded-3xl overflow-hidden bg-white border border-mutedBorder/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            tabIndex={0}
            role="button"
            aria-label={`View photo: ${image.title || "SCWOP photo"}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIndex(index);
              }
            }}
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
              <Image
                src={image.image_url}
                alt={image.title || "SCWOP Gallery Photo"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  View High-Res Photo
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-ink group-hover:text-primary transition-colors line-clamp-1 mb-2">
                  {image.title || "Untitled Image"}
                </h2>
                <p className="text-sm text-ink/75 font-body line-clamp-3 leading-relaxed">
                  {image.description || "No description provided for this photo."}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-mutedBorder/50 flex items-center justify-between text-xs text-ink/60">
                <span className="font-medium text-primary">SCWOP Archive</span>
                <span>Click to Expand</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <Lightbox
          image={activeImage}
          onClose={() => setSelectedIndex(null)}
          onPrev={() =>
            setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
          }
          onNext={() =>
            setSelectedIndex((prev) =>
              prev !== null && prev < initialImages.length - 1 ? prev + 1 : prev
            )
          }
          hasPrev={selectedIndex !== null && selectedIndex > 0}
          hasNext={selectedIndex !== null && selectedIndex < initialImages.length - 1}
        />
      )}
    </>
  );
}
