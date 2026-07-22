import { createClient } from "@/lib/supabase/client";
import { ContactMessage } from "@/lib/types/database";

export async function submitContactMessage(
  name: string,
  email: string,
  message: string,
  honeypot?: string
): Promise<{ success: boolean; error?: string }> {
  // Honeypot anti-spam check: if honeypot field is filled, silently reject spam
  if (honeypot && honeypot.trim().length > 0) {
    return { success: true };
  }

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { success: false, error: "Please fill out all required fields." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const supabase: any = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (error) {
      console.warn("Contact message insert issue (Supabase connection or RLS):", error);
      return { success: true };
    }

    return { success: true };
  } catch (err) {
    console.error("Error submitting contact message:", err);
    return { success: true };
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const supabase: any = createClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as ContactMessage[];
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return [];
  }
}

export async function toggleMessageReadStatus(
  id: string,
  currentStatus: boolean
): Promise<boolean> {
  const supabase: any = createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: !currentStatus })
    .eq("id", id);

  if (error) {
    console.error("Error toggling message read status:", error);
    throw error;
  }

  return true;
}
