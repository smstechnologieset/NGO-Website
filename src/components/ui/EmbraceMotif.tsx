import React from "react";

interface EmbraceMotifProps {
  variant?: "hero-bg" | "divider" | "bullet" | "badge" | "watermark";
  className?: string;
}

export default function EmbraceMotif({
  variant = "divider",
  className = "",
}: EmbraceMotifProps) {
  if (variant === "hero-bg") {
    return (
      <div
        className={`aria-hidden:true pointer-events-none absolute -z-10 select-none ${className}`}
        aria-hidden="true"
      >
        <svg
          width="520"
          height="520"
          viewBox="0 0 520 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-20 text-primary"
        >
          {/* Inner ring - Children (Interactive subtle pulse) */}
          <circle
            cx="260"
            cy="260"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="animate-spin-slow origin-center"
          />
          {/* Middle ring - Women (Slow reverse spin) */}
          <circle
            cx="260"
            cy="260"
            r="160"
            stroke="#E1A94C"
            strokeWidth="1.8"
            strokeDasharray="12 12"
            className="animate-spin-reverse-slow origin-center opacity-80"
          />
          {/* Outer ring - Older People */}
          <circle
            cx="260"
            cy="260"
            r="230"
            stroke="#C97B8B"
            strokeWidth="1.5"
            className="animate-ring-expand origin-center opacity-70"
          />
          {/* Interconnected Embrace Nodes */}
          <g className="animate-spin-slow origin-center">
            <circle cx="260" cy="180" r="6" fill="#2F6F5E" />
            <circle cx="260" cy="100" r="7" fill="#E1A94C" />
            <circle cx="260" cy="30" r="8" fill="#C97B8B" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "bullet") {
    return (
      <span className="inline-flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block flex-shrink-0 align-middle ${className}`}
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8.5" stroke="#C97B8B" strokeWidth="1" />
          <circle cx="10" cy="10" r="5.5" stroke="#E1A94C" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="2.5" fill="#2F6F5E" />
        </svg>
      </span>
    );
  }

  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center justify-center p-3.5 rounded-full bg-white/80 backdrop-blur-md border border-mutedBorder shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 ${className}`}
        aria-hidden="true"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin-slow"
        >
          <circle cx="20" cy="20" r="18" stroke="#C97B8B" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="20" cy="20" r="12" stroke="#E1A94C" strokeWidth="1.8" />
          <circle cx="20" cy="20" r="6" stroke="#2F6F5E" strokeWidth="2" fill="#2F6F5E" fillOpacity="0.15" />
          <circle cx="20" cy="20" r="3" fill="#2F6F5E" />
        </svg>
      </div>
    );
  }

  if (variant === "watermark") {
    return (
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none opacity-10 ${className}`}
        aria-hidden="true"
      >
        <circle cx="110" cy="110" r="100" stroke="#C97B8B" strokeWidth="2" />
        <circle cx="110" cy="110" r="68" stroke="#E1A94C" strokeWidth="2" />
        <circle cx="110" cy="110" r="35" stroke="#2F6F5E" strokeWidth="2.5" />
      </svg>
    );
  }

  // Default: Section Divider
  return (
    <div
      className={`my-14 flex items-center justify-center gap-4 aria-hidden:true ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1px] w-20 md:w-32 bg-gradient-to-r from-transparent via-mutedBorder to-primary/40" />
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-mutedBorder/60 shadow-xs">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="hover:scale-125 transition-transform">
          <circle cx="9" cy="9" r="7.5" stroke="#C97B8B" strokeWidth="1" />
          <circle cx="9" cy="9" r="4.5" stroke="#E1A94C" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="2" fill="#2F6F5E" />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-spin-slow">
          <circle cx="12" cy="12" r="10.5" stroke="#C97B8B" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="6.5" stroke="#E1A94C" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="#2F6F5E" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="hover:scale-125 transition-transform">
          <circle cx="9" cy="9" r="7.5" stroke="#C97B8B" strokeWidth="1" />
          <circle cx="9" cy="9" r="4.5" stroke="#E1A94C" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="2" fill="#2F6F5E" />
        </svg>
      </div>
      <div className="h-[1px] w-20 md:w-32 bg-gradient-to-l from-transparent via-mutedBorder to-primary/40" />
    </div>
  );
}
