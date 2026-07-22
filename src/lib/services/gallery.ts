import { createClient } from "@/lib/supabase/client";
import { GalleryImage } from "@/lib/types/database";

export const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "default-1",
    image_url:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    title: "Early Childhood Education & Nutrition",
    description:
      "Providing interactive learning materials, healthy meals, and foundational literacy for children in underserved communities.",
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-2",
    image_url:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    title: "Women's Micro-Enterprise Workshop",
    description:
      "Skills training, financial literacy, and peer support networks empowering women entrepreneurs to gain economic independence.",
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-3",
    image_url:
      "https://images.unsplash.com/photo-1581579438747-1dc8d1e05842?q=80&w=1200&auto=format&fit=crop",
    title: "Older Adults Wellness & Social Circle",
    description:
      "Weekly health checkups, physical wellness activities, and social gatherings honoring our senior community members.",
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-4",
    image_url:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    title: "Generations Together Storytelling",
    description:
      "Intergenerational program connecting youth and elders to share wisdom, heritage preservation, and mutual companionship.",
    display_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-5",
    image_url:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
    title: "Community Health & Medical Outreach",
    description:
      "Mobile healthcare units delivering preventative care, essential supplies, and health education to families.",
    display_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-6",
    image_url:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    title: "Youth Leadership & Mentorship",
    description:
      "Fostering confidence, peer mentoring, and community civic participation among teenagers and young adults.",
    display_order: 6,
    created_at: new Date().toISOString(),
  },
];

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase: any = createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_GALLERY_IMAGES;
    }

    return data as GalleryImage[];
  } catch (err) {
    console.warn("Failed to fetch gallery_images from Supabase, using default fallback", err);
    return DEFAULT_GALLERY_IMAGES;
  }
}

export async function uploadGalleryImage(
  file: File,
  title: string,
  description: string,
  displayOrder: number = 0
): Promise<GalleryImage> {
  const supabase: any = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `gallery/${fileName}`;

  // Upload file to Supabase Storage bucket 'gallery'
  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    throw new Error(`Failed to upload image to storage: ${uploadError.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filePath);
  const imageUrl = urlData.publicUrl;

  // Insert database record
  const { data, error: dbError } = await supabase
    .from("gallery_images")
    .insert({
      image_url: imageUrl,
      title: title || "Untitled Image",
      description: description || "",
      display_order: displayOrder,
    })
    .select()
    .single();

  if (dbError || !data) {
    console.error("Database insert error:", dbError);
    throw new Error(`Failed to insert gallery record: ${dbError?.message || "Unknown error"}`);
  }

  return data as GalleryImage;
}

export async function updateGalleryImage(
  id: string,
  updates: Partial<Omit<GalleryImage, "id" | "created_at">>
): Promise<boolean> {
  const supabase: any = createClient();
  const { error } = await supabase
    .from("gallery_images")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating gallery image:", error);
    throw error;
  }

  return true;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const supabase: any = createClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);

  if (error) {
    console.error("Error deleting gallery image:", error);
    throw error;
  }

  return true;
}
