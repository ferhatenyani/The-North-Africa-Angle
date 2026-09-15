"use client";

import { useState } from "react";

import { imageSrcSet, images, type ImageSlot } from "@/lib/images";

type Props = {
  slot: ImageSlot;
  alt: string;
  /** CSS aspect-ratio value, e.g. "16 / 9". */
  ratio?: string;
  className?: string;
  eager?: boolean;
  /** Browser hint for picking the right srcset candidate. */
  sizes?: string;
};

/**
 * Image with graceful fallback: if the file is missing or fails to load,
 * renders a flat placeholder labelled with the filename to drop in.
 * Plain <img> on purpose — no build-time dependency on the files existing.
 * Serves the 800w WebP variant on small screens via srcset.
 */
export function PlaceImage({ slot, alt, ratio = "3 / 2", className = "", eager, sizes = "(max-width: 768px) 100vw, 50vw" }: Props) {
  const [failed, setFailed] = useState(false);
  const src = images[slot];

  if (failed || !src) {
    return (
      <div
        className={`grid place-items-center border border-hairline bg-surface ${className}`}
        style={{ aspectRatio: ratio }}
        aria-hidden
      >
        <span className="kicker text-ink-muted/40">{slot}.webp</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      srcSet={imageSrcSet(slot)}
      sizes={sizes}
      alt={alt}
      onError={() => setFailed(true)}
      loading={eager ? "eager" : "lazy"}
      className={`object-cover ${className}`}
    />
  );
}
