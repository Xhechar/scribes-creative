"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader, ImageIcon, Link } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

export function ImageUpload({
  value,
  onChange,
  label = "Image",
  aspectRatio = "video",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "portrait"
        ? "aspect-[4/5]"
        : "aspect-video";

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!cloudName || !uploadPreset) {
      setError(
        "Cloudinary not configured — set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env",
      );
      return;
    }

    setError("");
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: fd },
      );
      const data = await res.json();

      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        throw new Error(data.error?.message ?? "Upload failed");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload failed. Check Cloudinary config.",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function applyUrl() {
    const trimmed = urlInput.trim();
    if (trimmed) {
      onChange(trimmed);
      setUrlInput("");
      setUrlMode(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
        {label}
      </label>

      {value ? (
        <div className="relative">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-lg border border-brand-navy/20",
              aspectClass,
            )}
          >
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="600px"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy/70 text-white transition-colors hover:bg-brand-red"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : urlMode ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), applyUrl())
            }
            placeholder="https://res.cloudinary.com/..."
            autoFocus
            className="flex-1 rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
          />
          <button
            type="button"
            onClick={applyUrl}
            className="rounded-lg bg-brand-navy px-4 font-body text-sm font-semibold text-brand-paper hover:bg-brand-navy/90"
          >
            Use
          </button>
          <button
            type="button"
            onClick={() => setUrlMode(false)}
            className="rounded-lg border border-brand-navy/20 px-3 text-brand-slate hover:bg-brand-navy/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-brand-navy/20 px-6 py-8 transition-colors hover:border-brand-navy/40">
          {uploading ? (
            <Loader className="h-7 w-7 animate-spin text-brand-slate" />
          ) : (
            <ImageIcon className="h-7 w-7 text-brand-navy/30" />
          )}
          <p className="font-body text-sm text-brand-slate">
            {uploading ? "Uploading…" : "Upload an image or paste a URL"}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 rounded-md bg-brand-navy px-4 py-2 font-body text-xs font-semibold text-brand-paper transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
            >
              <Upload className="h-3.5 w-3.5" />
              Choose File
            </button>
            <button
              type="button"
              onClick={() => setUrlMode(true)}
              disabled={uploading}
              className="flex items-center gap-1.5 rounded-md border border-brand-navy/20 px-4 py-2 font-body text-xs font-medium text-brand-navy hover:bg-brand-navy/5 disabled:opacity-60"
            >
              <Link className="h-3.5 w-3.5" />
              Paste URL
            </button>
          </div>
          <p className="font-mono text-[10px] text-brand-slate/60">
            PNG · JPG · WEBP · up to 10 MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleFile}
      />

      {error && <p className="font-body text-xs text-brand-red">{error}</p>}
    </div>
  );
}