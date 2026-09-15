/**
 * Site-wide constants shared by both locales.
 * Values marked "pending" come from the client brief and must be replaced at handover.
 */
export const site = {
  name: "The North Africa Angle",
  shortName: "NAA",
  // PENDING (client): professional mailbox to be created — brief §5.
  email: "hello@thenorthafricangle.com",
  substack: "https://substack.com/@thenorthafricangle",
  // PENDING (client): LinkedIn / Instagram / X profiles.
  linkedin: null as string | null,
  instagram: null as string | null,
  x: null as string | null,
  // PENDING (client): WhatsApp number — brief §4. Placeholder until provided.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thenorthafricangle.com",
} as const;

export function waLink(message?: string): string {
  const digits = site.whatsapp.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
