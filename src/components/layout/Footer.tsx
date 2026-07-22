"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EmbraceMotif from "@/components/ui/EmbraceMotif";

export default function Footer() {
  const pathname = usePathname();

  // Hide main public footer on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-ink text-paper pt-16 pb-12 mt-auto border-t border-ink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-paper/15">
          {/* Brand & Purpose Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-paper/10 border border-paper/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="14" cy="14" r="12.5" stroke="#C97B8B" strokeWidth="1.2" />
                  <circle cx="14" cy="14" r="8" stroke="#E1A94C" strokeWidth="1.5" />
                  <circle cx="14" cy="14" r="4" fill="#2F6F5E" />
                </svg>
              </div>
              <span className="font-display text-2xl font-bold text-paper">
                SCWOP
              </span>
            </div>
            <p className="text-sm text-paper/75 leading-relaxed">
              Support for Children, Women and Older People (SCWOP) is dedicated
              to fostering resilient, caring communities where every generation
              receives protection, empowerment, and respect.
            </p>
            <div className="pt-2">
              <EmbraceMotif variant="bullet" className="mr-2" />
              <span className="text-xs text-accent font-medium uppercase tracking-wider">
                Intergenerational Care & Advocacy
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-accent transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-accent transition-colors text-paper/50 text-xs"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Focus Areas */}
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-4">
              Our Key Pillars
            </h3>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Child Education & Protection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondaryAccent" />
                Women Empowerment & Micro-Grants
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Elderly Health & Dignified Care
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Intergenerational Community Centers
              </li>
            </ul>
          </div>

          {/* Contact Snippet */}
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-4">
              Contact Snippet
            </h3>
            <div className="space-y-3 text-sm text-paper/80">
              <p className="flex items-start gap-2.5">
                <svg
                  className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Harmony Way, Community Care District</span>
              </p>
              <p className="flex items-center gap-2.5">
                <svg
                  className="w-5 h-5 text-accent flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@scwop.org</span>
              </p>
              <p className="flex items-center gap-2.5">
                <svg
                  className="w-5 h-5 text-accent flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+1 (555) 234-5678</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/60">
          <p>
            © {new Date().getFullYear()} SCWOP (Support for Children, Women and
            Older People). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-paper transition-colors">
              Privacy & Safeguarding
            </Link>
            <Link href="/admin/login" className="hover:text-paper transition-colors">
              Staff / Admin Area
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
