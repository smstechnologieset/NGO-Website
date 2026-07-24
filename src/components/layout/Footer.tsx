"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import EmbraceMotif from "@/components/ui/EmbraceMotif";

export default function Footer() {
  const pathname = usePathname();

  // Hide main public footer on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-primary text-paper pt-16 pb-12 mt-auto border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-paper/15">
          {/* Brand & Purpose Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 shadow-sm">
                <Image
                  src="/Logo.png"
                  alt="SCWOP Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-paper block leading-none">
                  SCWOP
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-accent block mt-1">
                  NGO Ethiopia
                </span>
              </div>
            </div>
            <p className="text-sm text-paper/80 leading-relaxed">
              Support for Children, Women and Older People (SCWOP) is a robust organization driving sustainable transformation and bringing lasting solutions for children, women, and the elderly.
            </p>
            <div className="pt-2">
              <EmbraceMotif variant="bullet" className="mr-2" />
              <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                Humanitarianism • Integrity • Equality
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
                  About Our Vision & Core Values
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-accent transition-colors"
                >
                  Photo Gallery & Field Stories
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

          {/* Key Interventions */}
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-4">
              Key Project Interventions
            </h3>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Monthly Cash Transfers (1,100 Elders & 130 OVCs)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Healthcare & Medication Access
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Home Renovation & Rehabilitation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Income Generating Activities (IGA)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Food & Seasonal Clothing Supply
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Sanitation, Hygiene & Psychosocial Support
              </li>
            </ul>
          </div>

          {/* Contact Snippet */}
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-4">
              Office Contact
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
                <span>Limi kura woreda 10 around Semit Fiyel Bet</span>
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
                <span>scwop2019@gmail.com</span>
              </p>
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+251 11 662 8613 / 14<br />+251 91 140 6118</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/60">
          <p>
            © {new Date().getFullYear()} SCWOP (Support for Children, Women and Older People). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-paper transition-colors">
              Privacy & Safeguarding
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-paper transition-colors inline-flex items-center gap-1.5"
              title="Admin Dashboard Login"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="opacity-60"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              A
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
