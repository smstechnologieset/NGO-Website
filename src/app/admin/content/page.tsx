"use client";

import React, { useState, useEffect, useRef } from "react";
import { getAllSiteContent, updateSiteContent, uploadContentImage } from "@/lib/services/content";

interface FieldDef {
  key: string;
  label: string;
  rows: number;
  isImage?: boolean;
}

interface SectionDef {
  title: string;
  description: string;
  fields: FieldDef[];
}

const PRESET_PUBLIC_IMAGES = [
  { label: "Founders & Leadership Address", path: "/Founders%20giving%20speach.JPG" },
  { label: "Children Gathered (OVC Support)", path: "/Children%20gathered%20and%20standing%20together.JPG" },
  { label: "Elderly Sitting Together (Care)", path: "/Elderly%20sitting%20together.JPG" },
  { label: "Elderly Standing Gathering", path: "/Elderly%20standing%20together.JPG" },
  { label: "Home Renovation & Doctor Visit", path: "/Eldery%20walking%20into%20a%20room.JPG" },
];

const CONTENT_SECTIONS: SectionDef[] = [
  {
    title: "Hero Section & Visual Image",
    description: "Main headline, tagline, and hero visual image displayed at the top of the Home page",
    fields: [
      { key: "hero_title", label: "Hero Main Headline", rows: 2 },
      { key: "hero_tagline", label: "Hero Mission Tagline", rows: 3 },
      { key: "hero_cta_primary", label: "Primary CTA Button Text", rows: 1 },
      { key: "hero_cta_secondary", label: "Secondary CTA Button Text", rows: 1 },
      { key: "hero_image_url", label: "Hero Visual Image", rows: 1, isImage: true },
    ],
  },
  {
    title: "Impact Stats & Metric Cards",
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
    title: "Primary Strategic Objectives",
    description: "The 3 core strategic objectives displayed on the About Us page",
    fields: [
      { key: "objective_1_title", label: "Objective 1 - Title", rows: 1 },
      { key: "objective_1_desc", label: "Objective 1 - Description", rows: 3 },
      { key: "objective_2_title", label: "Objective 2 - Title", rows: 1 },
      { key: "objective_2_desc", label: "Objective 2 - Description", rows: 3 },
      { key: "objective_3_title", label: "Objective 3 - Title", rows: 1 },
      { key: "objective_3_desc", label: "Objective 3 - Description", rows: 3 },
    ],
  },
  {
    title: "Success Stories & Field Interventions",
    description: "Titles, descriptions, and image URLs for the 4 success story showcase cards",
    fields: [
      { key: "story_renovation_title", label: "Story 1 (Renovation) - Title", rows: 1 },
      { key: "story_renovation_tagline", label: "Story 1 (Renovation) - Tagline", rows: 1 },
      { key: "story_renovation_desc", label: "Story 1 (Renovation) - Body Narrative", rows: 3 },
      { key: "story_renovation_image_url", label: "Story 1 (Renovation) - Image", rows: 1, isImage: true },

      { key: "story_eyecare_title", label: "Story 2 (Eye Care) - Title", rows: 1 },
      { key: "story_eyecare_tagline", label: "Story 2 (Eye Care) - Tagline", rows: 1 },
      { key: "story_eyecare_desc", label: "Story 2 (Eye Care) - Body Narrative", rows: 3 },
      { key: "story_eyecare_image_url", label: "Story 2 (Eye Care) - Image", rows: 1, isImage: true },

      { key: "story_mobility_title", label: "Story 3 (Medical Equipment) - Title", rows: 1 },
      { key: "story_mobility_tagline", label: "Story 3 (Medical Equipment) - Tagline", rows: 1 },
      { key: "story_mobility_desc", label: "Story 3 (Medical Equipment) - Body Narrative", rows: 3 },
      { key: "story_mobility_image_url", label: "Story 3 (Medical Equipment) - Image", rows: 1, isImage: true },

      { key: "story_livelihood_title", label: "Story 4 (IGA Livelihoods) - Title", rows: 1 },
      { key: "story_livelihood_tagline", label: "Story 4 (IGA Livelihoods) - Tagline", rows: 1 },
      { key: "story_livelihood_desc", label: "Story 4 (IGA Livelihoods) - Body Narrative", rows: 3 },
      { key: "story_livelihood_image_url", label: "Story 4 (IGA Livelihoods) - Image", rows: 1, isImage: true },
    ],
  },
  {
    title: "About Us & Program Section Images",
    description: "Mission, vision, founding story narrative, and featured section images",
    fields: [
      { key: "about_mission", label: "Official Mission Statement", rows: 3 },
      { key: "about_vision", label: "Official Vision Statement", rows: 3 },
      { key: "about_founding_story", label: "Founding Story Narrative", rows: 5 },
      { key: "about_founding_image_url", label: "Founding Story Section Image", rows: 1, isImage: true },
      { key: "ovc_section_image_url", label: "OVC Special Program Image", rows: 1, isImage: true },
    ],
  },
  {
    title: "Contact Info & Location Google Map",
    description: "Public contact details shown on /contact, in the Footer, and embedded Google Map URL",
    fields: [
      { key: "contact_address", label: "Physical Address", rows: 2 },
      { key: "contact_phone", label: "Phone / WhatsApp Contact Numbers", rows: 2 },
      { key: "contact_email", label: "Email Addresses", rows: 2 },
      { key: "contact_hours", label: "Office Operating Hours", rows: 1 },
      { key: "contact_map_url", label: "Google Maps Embed URL (iframe src)", rows: 2 },
    ],
  },
];

export default function AdminContentPage() {
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const handleDeviceFileUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);
    setErrorMsg("");
    try {
      const publicUrl = await uploadContentImage(file);
      handleFieldChange(key, publicUrl);
      setSuccessMsg(`Image uploaded from device for "${key}"`);
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image from device.";
      setErrorMsg(msg);
    } finally {
      setUploadingKey(null);
    }
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
            Site Content & Device Image Management
          </span>
          <h1 className="font-display text-3xl font-bold text-ink">
            Editable Site Text & Image Manager
          </h1>
          <p className="text-sm text-ink/75 mt-1 font-body">
            Upload images directly from your device file manager, choose from public photos, or edit live site copy and Google Map embeds.
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
          <strong>Notice:</strong> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-10">
        {CONTENT_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-mutedBorder shadow-sm space-y-6"
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
                      disabled={savingKey === field.key || uploadingKey === field.key}
                      className="text-xs text-primary hover:underline font-semibold disabled:opacity-50"
                    >
                      {savingKey === field.key ? "Saving..." : "Save Field"}
                    </button>
                  </div>

                  {/* SPECIAL IMAGE FIELD INTERFACE */}
                  {field.isImage ? (
                    <div className="p-4 rounded-2xl bg-paper/60 border border-mutedBorder space-y-4">
                      {/* Image Preview Thumbnail */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-mutedBorder bg-white flex-shrink-0 shadow-sm">
                          {contentMap[field.key] ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={contentMap[field.key]}
                              alt="Live Image Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-ink/40 text-[10px]">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2 w-full">
                          {/* File manager upload button */}
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              ref={(el) => {
                                fileInputRefs.current[field.key] = el;
                              }}
                              onChange={(e) => handleDeviceFileUpload(field.key, e)}
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRefs.current[field.key]?.click()}
                              disabled={uploadingKey === field.key}
                              className="px-4 py-2 rounded-xl bg-accent text-white hover:bg-accent-hover text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              <span>{uploadingKey === field.key ? "Uploading..." : "Upload Photo from Device"}</span>
                            </button>

                            {/* Preset Dropdown */}
                            <select
                              onChange={(e) => {
                                if (e.target.value) handleFieldChange(field.key, e.target.value);
                              }}
                              defaultValue=""
                              className="px-3 py-2 rounded-xl border border-mutedBorder bg-white text-ink text-xs outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="" disabled>
                                -- Select Existing Photo --
                              </option>
                              {PRESET_PUBLIC_IMAGES.map((img) => (
                                <option key={img.path} value={img.path}>
                                  {img.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <p className="text-[11px] text-ink/60 font-body">
                            Click <strong>Upload Photo from Device</strong> to select an image from your computer or phone file manager.
                          </p>
                        </div>
                      </div>

                      {/* Text URL Input Fallback */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-ink/50 block">
                          Image URL / Path Target:
                        </label>
                        <input
                          id={`field-${field.key}`}
                          type="text"
                          value={contentMap[field.key] || ""}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          placeholder="/path/to/image.jpg or https://..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-mutedBorder bg-white text-ink text-xs font-mono outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                  ) : field.rows === 1 ? (
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
