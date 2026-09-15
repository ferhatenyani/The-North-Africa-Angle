"use client";

import Link from "next/link";
import { useState } from "react";

import { images, type ImageSlot } from "@/lib/images";
import { IconArrowRight } from "./icons";

type Props = {
  href: string;
  kicker: string;
  title: string;
  dek: string;
  meta: string;
  image?: ImageSlot;
  /** Compact image-beside-text row, used in mobile snap rows. */
  layout?: "stacked" | "horizontal";
};

/** Article card — thumbnail + kicker + headline, hairline border, flat. */
export function ArticleCard({ href, kicker, title, dek, meta, image, layout = "stacked" }: Props) {
  const [failed, setFailed] = useState(false);
  const src = image ? images[image] : undefined;
  const showImage = image && !failed && src;

  if (layout === "horizontal") {
    return (
      <Link href={href} className="group flex gap-4 border-b border-hairline py-4">
        {showImage ? (
          <img
            src={src}
            alt=""
            onError={() => setFailed(true)}
            loading="lazy"
            className="h-[4.5rem] w-28 shrink-0 object-cover"
          />
        ) : null}
        <div className="min-w-0">
          <p className="kicker text-cobalt">{kicker}</p>
          <h3 className="mt-1.5 font-display text-[15px] font-semibold leading-snug tracking-tight text-ink">
            {title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-ink-muted">{meta}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col border border-hairline bg-white transition-colors hover:border-ink"
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <p className="kicker text-cobalt">{kicker}</p>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">{dek}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-xs text-ink-muted">
          <span className="font-mono">{meta}</span>
          <IconArrowRight className="text-ink transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
