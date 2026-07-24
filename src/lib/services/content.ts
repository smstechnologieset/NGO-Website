import { createClient } from "@/lib/supabase/client";

export const DEFAULT_SITE_CONTENT: Record<string, string> = {
  hero_title: "Support for Children, Women and Older People (SCWOP)",
  hero_tagline:
    "Driving sustainable transformation and bringing lasting solutions for children, women, and the elderly through holistic care, strategic partnerships, and community empowerment.",
  hero_cta_primary: "Explore Our Programs",
  hero_cta_secondary: "Get Involved",

  stat_1_number: "1,100+",
  stat_1_label: "Elders Provided Monthly Cash Transfers",
  stat_2_number: "130+",
  stat_2_label: "Orphan & Vulnerable Children (OVC) Supported",
  stat_3_number: "6+",
  stat_3_label: "Key Project Interventions Active",
  stat_4_number: "100%",
  stat_4_label: "Dignified & Non-Discriminatory Service",

  mission_excerpt_title: "Our Holistic Community Mandate",
  mission_excerpt_body:
    "SCWOP works hand in hand with local communities, government bodies, and key stakeholders to deliver direct relief—from healthcare and cash transfers to home repairs and income-generating seed capital—ensuring children, mothers, and elders thrive with dignity.",

  cta_banner_title: "Join SCWOP in Driving Sustainable Community Transformation",
  cta_banner_subtitle:
    "Partner with us to protect vulnerable children, empower women, and honor our senior citizens across every community we serve.",

  about_mission:
    "To bring about lasting solutions for children, women, and the elderly by providing holistic support and addressing their specific needs, through strategic partnerships with the community, government, and relevant stakeholders.",
  about_vision:
    "To be a robust and impactful organization that drives sustainable and positive transformation in the lives of the community.",
  about_founding_story:
    "Support for Children, Women and Older People (SCWOP) was established to address the critical gaps in social protection for vulnerable households. Operating under the core values of Humanitarianism, Transparency, Integrity, and Gender Equality, SCWOP delivers essential cash transfers, healthcare, home rehabilitation, food supplies, and psychosocial support directly to families in need.",

  contact_address: "Limi kura woreda 10 around Semit Fiyel Bet, Addis Ababa",
  contact_phone: "+251 11 662 8613 / +251 11 662 8614 / +251 91 140 6118",
  contact_email: "scwop2019@gmail.com",
  contact_hours: "Monday - Friday: 8:30 AM - 5:30 PM",
};

export async function getAllSiteContent(): Promise<Record<string, string>> {
  try {
    const supabase: any = createClient();
    const { data, error } = await supabase.from("site_content").select("key, value");

    if (error || !data || data.length === 0) {
      return DEFAULT_SITE_CONTENT;
    }

    const contentMap = { ...DEFAULT_SITE_CONTENT };
    (data as any[]).forEach((item) => {
      contentMap[item.key] = item.value;
    });

    return contentMap;
  } catch (err) {
    console.warn("Failed to fetch site_content from Supabase, using default fallback", err);
    return DEFAULT_SITE_CONTENT;
  }
}

export async function updateSiteContent(key: string, value: string): Promise<boolean> {
  const supabase: any = createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) {
    console.error(`Error updating content for key ${key}:`, error);
    throw error;
  }

  return true;
}
