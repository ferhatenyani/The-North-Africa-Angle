"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The app router's built-in hash scroll lands short on cross-page navigation
 * (it computes the offset before the destination layout settles), and every
 * "Contact" / "Work with us" CTA deep-links to /{lang}#contact — so scroll
 * explicitly, re-checking briefly in case late layout shifts move the target.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const timers: number[] = [];

    const scroll = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const settle = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scroll);
    };

    settle();
    timers.push(window.setTimeout(settle, 250), window.setTimeout(settle, 800));
    window.addEventListener("hashchange", settle);
    window.addEventListener("load", settle);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("hashchange", settle);
      window.removeEventListener("load", settle);
    };
  }, [pathname]);

  return null;
}
