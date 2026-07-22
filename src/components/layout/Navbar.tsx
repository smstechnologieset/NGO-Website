"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EmbraceMotif from "@/components/ui/EmbraceMotif";

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
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-mutedBorder transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Branding */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
            aria-label="SCWOP NGO Home"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="14" cy="14" r="12.5" stroke="#C97B8B" strokeWidth="1.2" />
                <circle cx="14" cy="14" r="8" stroke="#E1A94C" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="4" fill="#2F6F5E" />
              </svg>
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-ink block leading-none">
                SCWOP
              </span>
              <span className="text-[10px] tracking-wider uppercase font-medium text-ink/75 block mt-0.5">
                Children • Women • Elders
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-ink hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Admin Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-accent text-ink hover:bg-accent-hover transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
            >
              Get Involved
            </Link>
            <Link
              href="/admin"
              className="p-2 text-ink/60 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-full"
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
              className="p-2.5 rounded-lg text-ink hover:bg-mutedBorder/40 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
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
        <div className="md:hidden border-b border-mutedBorder bg-paper/98 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
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
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-ink hover:bg-primary/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-mutedBorder flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-3 rounded-full text-base font-medium bg-accent text-ink hover:bg-accent-hover shadow-sm"
            >
              Get Involved
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm text-ink/70 hover:text-primary flex items-center justify-center gap-2"
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
