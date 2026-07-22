"use client";

import React, { useState, useEffect } from "react";
import { getAllSiteContent, updateSiteContent } from "@/lib/services/content";

const CONTENT_SECTIONS = [
  {
    title: "Hero Section",
    description: "Main headline and tagline displayed at the top of the Home page",
    fields: [
      { key: "hero_title", label: "Hero Main Headline", rows: 2 },
      { key: "hero_tagline", label: "Hero Mission Tagline", rows: 3 },
      { key: "hero_cta_primary", label: "Primary CTA Button Text", rows: 1 },
      { key: "hero_cta_secondary", label: "Secondary CTA Button Text", rows: 1 },
    ],
  },
  {
    title: "Impact Stats & Highlight Cards",
    description: "The 4 highlight metric cards displayed on the Home page",
    fields: [
      { key: "stat_1_number", label: "Stat Card 1 - Number / Value", rows: 1 },
      { key: "stat_1_label", label: "Stat Card 1 - Description Label", rows: 1 },
      { key: "stat_2_number", label: "Stat Card 2 - Number / Value", rows: 1 },
      { key: "stat_2_label", label: "Stat Card 2 - Description Label", rows: 1 },
      { key: "stat_3_number", label: "Stat Card 3 - Number / Value", rows: 1 },
      { key: "stat_3_label", label: "Stat Card 3 - Description Label", rows: 1 },
      { key: "stat_4_number", label: "Stat Card 4 - Number / Value", rows: 1 },
      { key: "stat_4_label", label: "Stat Card 4 - Description Label", rows: 1 },
    ],
  },
  {
    title: "Mission Excerpt & Closing Banner",
    description: "Featured home page mission text and closing CTA banner",
    fields: [
      { key: "mission_excerpt_title", label: "Mission Excerpt Heading", rows: 1 },
      { key: "mission_excerpt_body", label: "Mission Excerpt Body Copy", rows: 4 },
      { key: "cta_banner_title", label: "Closing Banner Headline", rows: 2 },
      { key: "cta_banner_subtitle", label: "Closing Banner Subtitle", rows: 3 },
    ],
  },
  {
    title: "About Us Page Text",
    description: "Mission, vision statement, and founding story on /about",
    fields: [
      { key: "about_mission", label: "Official Mission Statement", rows: 3 },
      { key: "about_vision", label: "Official Vision Statement", rows: 3 },
      { key: "about_founding_story", label: "Founding Story Narrative", rows: 5 },
    ],
  },
  {
    title: "Contact Information",
    description: "Public contact details shown on /contact and in the Footer",
    fields: [
      { key: "contact_address", label: "Physical Address", rows: 2 },
      { key: "contact_phone", label: "Phone / WhatsApp Contact Numbers", rows: 2 },
      { key: "contact_email", label: "Email Addresses", rows: 2 },
      { key: "contact_hours", label: "Office Operating Hours", rows: 1 },
    ],
  },
];

export default function AdminContentPage() {
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const data = await getAllSiteContent();
    setContentMap(data);
    setLoading(false);
  };

  const handleFieldChange = (key: string, value: string) => {
    setContentMap((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSingle = async (key: string) => {
    setSavingKey(key);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await updateSiteContent(key, contentMap[key] || "");
      setSuccessMsg(`Successfully updated "${key}"`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update field.";
      setErrorMsg(msg);
    } finally {
      setSavingKey(null);
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAll(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const keys = Object.keys(contentMap);
      for (const key of keys) {
        await updateSiteContent(key, contentMap[key] || "");
      }
      setSuccessMsg("All site content fields updated successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save all fields.";
      setErrorMsg(msg);
    } finally {
      setSavingAll(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-ink/60">
        Loading site content keys from database...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent block mb-1">
            Site Copy Management
          </span>
          <h1 className="font-display text-3xl font-bold text-ink">
            Editable Text Block Editor
          </h1>
          <p className="text-sm text-ink/75 mt-1 font-body">
            Edit live text strings across the public website. Changes update the `site_content` table in Supabase.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={savingAll}
          className="px-6 py-3 rounded-full font-medium bg-primary text-white hover:bg-primary-hover disabled:opacity-60 transition-colors shadow-md text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          {savingAll ? "Saving All Fields..." : "Save All Changes"}
        </button>
      </div>

      {successMsg && (
        <div
          role="status"
          className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-ink text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-secondaryAccent/15 border border-secondaryAccent/30 text-ink text-sm"
        >
          <strong>Save Error:</strong> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-10">
        {CONTENT_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="p-8 rounded-3xl bg-white border border-mutedBorder shadow-sm space-y-6"
          >
            <div className="border-b border-mutedBorder/60 pb-4">
              <h2 className="font-display text-xl font-bold text-ink">
                {section.title}
              </h2>
              <p className="text-xs text-ink/65 mt-0.5">{section.description}</p>
            </div>

            <div className="space-y-6">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`field-${field.key}`}
                      className="block text-xs font-semibold text-ink uppercase tracking-wider"
                    >
                      {field.label}{" "}
                      <span className="text-[10px] text-ink/40 font-normal lowercase">
                        ({field.key})
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSaveSingle(field.key)}
                      disabled={savingKey === field.key}
                      className="text-xs text-primary hover:underline font-semibold disabled:opacity-50"
                    >
                      {savingKey === field.key ? "Saving..." : "Save Field"}
                    </button>
                  </div>

                  {field.rows === 1 ? (
                    <input
                      id={`field-${field.key}`}
                      type="text"
                      value={contentMap[field.key] || ""}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mutedBorder bg-paper/50 focus:bg-white text-ink text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  ) : (
                    <textarea
                      id={`field-${field.key}`}
                      rows={field.rows}
                      value={contentMap[field.key] || ""}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mutedBorder bg-paper/50 focus:bg-white text-ink text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y font-body"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={savingAll}
            className="px-8 py-3.5 rounded-full font-medium bg-primary text-white hover:bg-primary-hover disabled:opacity-60 transition-colors shadow-lg text-base"
          >
            {savingAll ? "Saving All Content..." : "Save All Site Content Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
