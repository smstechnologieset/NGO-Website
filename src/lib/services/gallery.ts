import { createClient } from "@/lib/supabase/client";
import { GalleryImage } from "@/lib/types/database";

export const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "default-1",
    image_url: "/Founders%20giving%20speach.JPG",
    title: "SCWOP Leadership & Community Speech",
    description:
      "SCWOP leadership addressing community members and partners during an organizational milestone gathering.",
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-2",
    image_url: "/Children%20gathered%20and%20standing%20together.JPG",
    title: "Orphan & Vulnerable Children (OVC) Support",
    description:
      "Children receiving educational materials, tuition care, and seasonal clothing support in the community.",
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-3",
    image_url: "/Elderly%20sitting%20together.JPG",
    title: "Monthly Elderly Care & Fellowship",
    description:
      "Beneficiary elders gathered during monthly cash transfer and nutritional support distribution.",
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-4",
    image_url: "/Elderly%20standing%20together.JPG",
    title: "Senior Community Members Gathering",
    description:
      "Honoring elderly community members as part of SCWOP's holistic care and dignified support initiatives.",
    display_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-5",
    image_url: "/Eldery%20walking%20into%20a%20room.JPG",
    title: "Healthcare & Home Renovation Visits",
    description:
      "Social workers and volunteers providing medical follow-ups and home rehabilitation checkups for elders.",
    display_order: 5,
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
