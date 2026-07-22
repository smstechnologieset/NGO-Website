"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide main public navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-xl border-b border-mutedBorder/80 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Branding */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1.5 transition-all"
            aria-label="SCWOP NGO Home"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white border border-mutedBorder shadow-sm group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-md transition-all duration-300">
              <svg
                width="30"
                height="30"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:rotate-12 transition-transform duration-500"
              >
                <circle cx="14" cy="14" r="12.5" stroke="#C97B8B" strokeWidth="1.2" />
                <circle cx="14" cy="14" r="8" stroke="#E1A94C" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="4" fill="#2F6F5E" />
              </svg>
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-ink block leading-none group-hover:text-primary transition-colors">
                SCWOP
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-primary/90 block mt-1">
                Children • Women • Elders
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/60 p-1.5 rounded-full border border-mutedBorder/60 shadow-xs backdrop-blur-sm" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-md font-semibold"
                      : "text-ink/80 hover:text-primary hover:bg-paper/80"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Admin Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-shimmer px-6 py-2.5 rounded-full text-sm font-semibold bg-accent text-ink hover:bg-accent-hover transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-2"
            >
              <span>Get Involved</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/admin"
              className="p-2.5 text-ink/60 hover:text-primary hover:bg-white rounded-full border border-transparent hover:border-mutedBorder transition-all duration-300"
              title="Admin Portal"
              aria-label="Admin Portal Login"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2.5 rounded-xl bg-white border border-mutedBorder text-ink hover:bg-paper transition-all focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-mutedBorder bg-paper/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm font-semibold"
                      : "text-ink hover:bg-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-mutedBorder flex flex-col gap-2.5">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-3.5 rounded-full text-base font-semibold bg-accent text-ink hover:bg-accent-hover shadow-md transition-all"
            >
              Get Involved
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-semibold text-ink/70 hover:text-primary flex items-center justify-center gap-2"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Admin Dashboard Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
