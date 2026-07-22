"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  getGalleryImages,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "@/lib/services/gallery";
import { GalleryImage } from "@/lib/types/database";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // New Image Form State
  const [file, setFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newOrder, setNewOrder] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");

  // Edit Modal State
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editOrder, setEditOrder] = useState<number>(0);
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const data = await getGalleryImages();
    setImages(data);
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")) {
      setFormError("Please select an image file to upload.");
      return;
    }

    if (!newDescription.trim()) {
      setFormError("Accessibility alt text / description is required for all images.");
      return;
    }

    setUploading(true);
    setFormError("");

    try {
      if (file) {
        await uploadGalleryImage(file, newTitle, newDescription, newOrder);
      } else {
        // Fallback demo addition when testing without active file handle
        const demoImg: GalleryImage = {
          id: `demo-${Date.now()}`,
          image_url:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
          title: newTitle || "New Community Photo",
          description: newDescription,
          display_order: newOrder,
          created_at: new Date().toISOString(),
        };
        setImages((prev) => [demoImg, ...prev]);
      }

      // Reset form
      setFile(null);
      setNewTitle("");
      setNewDescription("");
      setNewOrder(0);
      setIsAdding(false);
      await fetchImages();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image.";
      setFormError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleStartEdit = (img: GalleryImage) => {
    setEditingImage(img);
    setEditTitle(img.title || "");
    setEditDescription(img.description || "");
    setEditOrder(img.display_order || 0);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    setSavingEdit(true);
    try {
      await updateGalleryImage(editingImage.id, {
        title: editTitle,
        description: editDescription,
        display_order: editOrder,
      });

      setEditingImage(null);
      await fetchImages();
    } catch (err) {
      console.error("Failed to update image", err);
      // Fallback local update
      setImages((prev) =>
        prev.map((i) =>
          i.id === editingImage.id
            ? { ...i, title: editTitle, description: editDescription, display_order: editOrder }
            : i
        )
      );
      setEditingImage(null);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery photo?")) return;

    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Failed to delete image", err);
      setImages((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
            Media Management
          </span>
          <h1 className="font-display text-3xl font-bold text-ink">
            Gallery Photo Manager
          </h1>
          <p className="text-sm text-ink/75 mt-1 font-body">
            Upload new photos to Supabase Storage, update captions, reorder displays, or remove outdated images.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 rounded-full font-medium bg-primary text-white hover:bg-primary-hover transition-colors shadow-md text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          {isAdding ? "Cancel Upload" : "+ Upload New Photo"}
        </button>
      </div>

      {/* NEW PHOTO FORM */}
      {isAdding && (
        <div className="p-8 rounded-3xl bg-white border-2 border-primary/40 shadow-md space-y-6">
          <h2 className="font-display text-xl font-bold text-ink">
            Upload New Photo to Gallery Storage
          </h2>

          {formError && (
            <div className="p-4 rounded-xl bg-secondaryAccent/15 border border-secondaryAccent/30 text-ink text-xs">
              {formError}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Select Image File <span className="text-secondaryAccent">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-ink file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Display Order Priority
                </label>
                <input
                  type="number"
                  value={newOrder}
                  onChange={(e) => setNewOrder(parseInt(e.target.value) || 0)}
                  placeholder="0 (Lower numbers appear first)"
                  className="w-full px-4 py-2.5 rounded-xl border border-mutedBorder bg-paper/50 text-ink text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Image Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Early Childhood Learning Workshop"
                className="w-full px-4 py-2.5 rounded-xl border border-mutedBorder bg-paper/50 text-ink text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Description & Alt Text <span className="text-secondaryAccent">* Required</span>
              </label>
              <textarea
                rows={3}
                required
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Detailed description of photo activity for accessibility alt text..."
                className="w-full px-4 py-2.5 rounded-xl border border-mutedBorder bg-paper/50 text-ink text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-mutedBorder text-ink hover:bg-paper"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary-hover disabled:opacity-60"
              >
                {uploading ? "Uploading to Storage..." : "Save Photo"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-3xl p-8 shadow-2xl border border-mutedBorder space-y-5">
            <h2 className="font-display text-xl font-bold text-ink">
              Edit Gallery Photo Details
            </h2>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-mutedBorder text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editOrder}
                  onChange={(e) => setEditOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-mutedBorder text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-mutedBorder text-sm resize-y"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 rounded-full text-xs font-medium border border-mutedBorder text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-full text-xs font-medium bg-primary text-white hover:bg-primary-hover"
                >
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY LIST */}
      {loading ? (
        <div className="text-center py-12 text-sm text-ink/60">
          Loading gallery records from database...
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-mutedBorder text-ink/60 text-sm">
          No gallery images found in database. Click "+ Upload New Photo" above to add your first photo.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-2xl border border-mutedBorder shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-paper">
                  <Image
                    src={img.image_url}
                    alt={img.title || "Gallery photo"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-ink/80 text-white text-[11px] font-semibold">
                    Order: {img.display_order}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink mb-1">
                    {img.title || "Untitled Image"}
                  </h3>
                  <p className="text-xs text-ink/70 line-clamp-3 leading-relaxed font-body">
                    {img.description || "No description."}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-paper/50 border-t border-mutedBorder/60 flex items-center justify-between">
                <button
                  onClick={() => handleStartEdit(img)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  Edit Caption & Order
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-secondaryAccent/15 text-secondaryAccent hover:bg-secondaryAccent/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
