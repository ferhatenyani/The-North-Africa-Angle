import type { ArticleBlock } from "@/lib/articles";

/** Renders seed-article blocks with a reading-first type treatment. */
export function Prose({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-10 border-t border-hairline pt-6 font-display text-xl font-semibold tracking-tight text-ink">
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 list-disc space-y-2 pl-5 font-serif text-[18px] leading-[1.75] text-ink marker:text-cobalt">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="mt-5 font-serif text-[18px] leading-[1.8] text-ink">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
