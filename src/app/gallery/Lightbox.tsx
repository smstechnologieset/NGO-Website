"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/types/database";

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    };

    if (image) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose, onPrev, onNext, hasNext, hasPrev]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/90 backdrop-blur-md transition-opacity animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-paper rounded-2xl overflow-hidden shadow-2xl border border-mutedBorder flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-ink/70 hover:bg-ink text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close Lightbox"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Previous Button */}
        {onPrev && hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-ink/70 hover:bg-ink text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary shadow-lg"
            aria-label="Previous Image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {onNext && hasNext && (
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-ink/70 hover:bg-ink text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary shadow-lg"
            aria-label="Next Image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Image Container */}
        <div className="relative w-full md:w-3/5 min-h-[300px] md:min-h-[480px] bg-ink/5 flex items-center justify-center">
          <Image
            src={image.image_url}
            alt={image.title || "SCWOP Gallery Photo"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>

        {/* Caption & Metadata Container */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-3">
              SCWOP In Action
            </div>
            <h2
              id="lightbox-title"
              className="font-display text-2xl font-bold text-ink mb-3 leading-snug"
            >
              {image.title || "Untitled Image"}
            </h2>
            <p className="text-sm text-ink/80 leading-relaxed font-body whitespace-pre-line">
              {image.description || "No description provided for this photo."}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-mutedBorder/60 flex items-center justify-between text-xs text-ink/60">
            <span>
              {image.created_at
                ? new Date(image.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "SCWOP Archive"}
            </span>
            <span className="font-medium text-primary">SCWOP Community Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
