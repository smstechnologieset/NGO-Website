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
          width="480"
          height="480"
          viewBox="0 0 480 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-15 text-primary"
        >
          {/* Inner ring - Children */}
          <circle
            cx="240"
            cy="240"
            r="70"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
          {/* Middle ring - Women */}
          <circle
            cx="240"
            cy="240"
            r="140"
            stroke="#E1A94C"
            strokeWidth="2"
          />
          {/* Outer ring - Older People */}
          <circle
            cx="240"
            cy="240"
            r="210"
            stroke="#C97B8B"
            strokeWidth="1.5"
          />
          {/* Connecting embrace nodes */}
          <circle cx="240" cy="170" r="6" fill="currentColor" />
          <circle cx="240" cy="100" r="7" fill="#E1A94C" />
          <circle cx="240" cy="30" r="8" fill="#C97B8B" />
        </svg>
      </div>
    );
  }

  if (variant === "bullet") {
    return (
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
    );
  }

  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center justify-center p-3 rounded-full bg-paper border border-mutedBorder shadow-sm ${className}`}
        aria-hidden="true"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="16" stroke="#C97B8B" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="11" stroke="#E1A94C" strokeWidth="1.8" />
          <circle cx="18" cy="18" r="6" stroke="#2F6F5E" strokeWidth="2" fill="#2F6F5E" fillOpacity="0.15" />
          <circle cx="18" cy="18" r="2.5" fill="#2F6F5E" />
        </svg>
      </div>
    );
  }

  if (variant === "watermark") {
    return (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none opacity-10 ${className}`}
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="90" stroke="#C97B8B" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" stroke="#E1A94C" strokeWidth="2" />
        <circle cx="100" cy="100" r="30" stroke="#2F6F5E" strokeWidth="2.5" />
      </svg>
    );
  }

  // Default: Section Divider
  return (
    <div
      className={`my-12 flex items-center justify-center gap-3 aria-hidden:true ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-mutedBorder" />
      <div className="flex items-center gap-1.5 px-2">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="#C97B8B" strokeWidth="1" />
          <circle cx="9" cy="9" r="4.5" stroke="#E1A94C" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="2" fill="#2F6F5E" />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10.5" stroke="#C97B8B" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="6.5" stroke="#E1A94C" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="#2F6F5E" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="#C97B8B" strokeWidth="1" />
          <circle cx="9" cy="9" r="4.5" stroke="#E1A94C" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="2" fill="#2F6F5E" />
        </svg>
      </div>
      <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-mutedBorder" />
    </div>
  );
}
