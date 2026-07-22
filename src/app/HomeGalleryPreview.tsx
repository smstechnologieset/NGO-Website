"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/types/database";
import Lightbox from "./gallery/Lightbox";

interface HomeGalleryPreviewProps {
  images: GalleryImage[];
}

export default function HomeGalleryPreview({ images }: HomeGalleryPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative rounded-2xl overflow-hidden bg-white border border-mutedBorder cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
              <Image
                src={image.image_url}
                alt={image.title || "SCWOP Gallery Photo"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Click to Expand
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-ink line-clamp-1 group-hover:text-primary transition-colors">
                {image.title || "Untitled Image"}
              </h3>
              <p className="text-xs text-ink/70 line-clamp-2 mt-1 font-body">
                {image.description || "No description provided."}
              </p>
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
              prev !== null && prev < images.length - 1 ? prev + 1 : prev
            )
          }
          hasPrev={selectedIndex !== null && selectedIndex > 0}
          hasNext={selectedIndex !== null && selectedIndex < images.length - 1}
        />
      )}
    </>
  );
}
