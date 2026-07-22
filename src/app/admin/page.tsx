import React from "react";
import Link from "next/link";
import { getGalleryImages } from "@/lib/services/gallery";
import { getAllSiteContent } from "@/lib/services/content";
import { getContactMessages } from "@/lib/services/contact";

export const revalidate = 0; // Dynamic dashboard overview

export default async function AdminDashboardPage() {
  const galleryImages = await getGalleryImages();
  const content = await getAllSiteContent();
  const messages = await getContactMessages();

  const unreadMessages = messages.filter((m) => !m.is_read);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
          Management Portal
        </span>
        <h1 className="font-display text-3xl font-bold text-ink">
          Dashboard Overview
        </h1>
        <p className="text-sm text-ink/75 font-body mt-1">
          Welcome to the SCWOP content management platform. Select a module below or use the sidebar to start editing.
        </p>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gallery Metric */}
        <Link
          href="/admin/gallery"
          className="p-6 rounded-2xl bg-white border border-mutedBorder shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Gallery Items
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <span className="font-display text-4xl font-bold text-ink block mb-1">
            {galleryImages.length}
          </span>
          <span className="text-xs text-ink/60 block">
            Manage photo uploads, titles, and display order
          </span>
        </Link>

        {/* Content Metric */}
        <Link
          href="/admin/content"
          className="p-6 rounded-2xl bg-white border border-mutedBorder shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Editable Text Blocks
            </span>
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-ink group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          <span className="font-display text-4xl font-bold text-ink block mb-1">
            {Object.keys(content).length}
          </span>
          <span className="text-xs text-ink/60 block">
            Edit hero headlines, mission text, and contact details
          </span>
        </Link>

        {/* Messages Metric */}
        <Link
          href="/admin/messages"
          className="p-6 rounded-2xl bg-white border border-mutedBorder shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondaryAccent">
              Contact Submissions
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondaryAccent/20 flex items-center justify-center text-ink group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-display text-4xl font-bold text-ink">
              {messages.length}
            </span>
            {unreadMessages.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondaryAccent text-white">
                {unreadMessages.length} unread
              </span>
            )}
          </div>
          <span className="text-xs text-ink/60 block">
            Read inquiries submitted via the public contact form
          </span>
        </Link>
      </div>

      {/* QUICK ACTIONS SECTION */}
      <div className="p-8 rounded-3xl bg-white border border-mutedBorder shadow-sm">
        <h2 className="font-display text-xl font-bold text-ink mb-4">
          Quick Management Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/gallery"
            className="p-4 rounded-xl border border-mutedBorder hover:border-primary bg-paper/40 hover:bg-white text-ink text-sm font-medium transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              +
            </div>
            Upload New Gallery Image
          </Link>
          <Link
            href="/admin/content"
            className="p-4 rounded-xl border border-mutedBorder hover:border-accent bg-paper/40 hover:bg-white text-ink text-sm font-medium transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-ink">
              ✎
            </div>
            Edit Hero & Mission Content
          </Link>
          <Link
            href="/admin/messages"
            className="p-4 rounded-xl border border-mutedBorder hover:border-secondaryAccent bg-paper/40 hover:bg-white text-ink text-sm font-medium transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-secondaryAccent/20 flex items-center justify-center text-ink">
              ✉
            </div>
            View Recent Inquiries ({unreadMessages.length} unread)
          </Link>
        </div>
      </div>
    </div>
  );
}
