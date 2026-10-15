import { siteConfig } from "./config";
import { formatINR, type Product } from "./products";

const base = () =>
  /^\d{10,15}$/.test(siteConfig.whatsappNumber) ? `https://wa.me/${siteConfig.whatsappNumber}` : null;

/** Single place that builds every click-to-chat link. Never sends automatically. */
export function whatsappLink(message: string): string | null {
  const url = base();
  return url ? `${url}?text=${encodeURIComponent(message)}` : null;
}

export function productOrderMessage(p: Product, variant?: string): string {
  return [
    `Hi GYRA! I'm interested in ordering ${p.name}.`,
    "",
    `Price: ${formatINR(p.price)}`,
    variant ? `Selected variant: ${variant}` : null,
    `Product link: ${siteConfig.siteUrl}/product/${p.slug}`,
    "",
    "Please confirm availability and share the ordering details.",
  ].filter((l) => l !== null).join("\n");
}

export function productOrderLink(p: Product, variant?: string | undefined): string | null {
  if (!p.name || !(p.price > 0)) return null;
  return whatsappLink(productOrderMessage(p, variant));
}

export function productQuestionLink(p: Product): string | null {
  return whatsappLink(`Hi GYRA! I have a question about ${p.name} (${siteConfig.siteUrl}/product/${p.slug}).\n\n`);
}

export const enquiries = {
  general: "Hi GYRA! I'd love some help finding a piece.",
  shipping: "Hi GYRA! I have a question about shipping and delivery.",
  returns: "Hi GYRA! I need help with a return or exchange.",
  privacy: "Hi GYRA! I have a question about how my information is used.",
  collaboration: "Hi GYRA! I'd love to discuss a collaboration with you.",
  gifting: "Hi GYRA! I'd like to ask about a bulk or gifting order.",
  feedback: "Hi GYRA! I'd like to share some feedback.",
} as const;

export function generalEnquiryLink(kind: keyof typeof enquiries = "general"): string | null {
  return whatsappLink(enquiries[kind]);
}

export type CreatorApplication = {
  name: string; instagram: string; profile: string; city: string;
  followers: string; category: string; views: string; why: string; preferred: string;
};

export function creatorApplicationMessage(a: CreatorApplication): string {
  return [
    "Hi GYRA! I'd love to join the GYRA Creator Club.",
    "",
    `Name: ${a.name}`,
    `Instagram: ${a.instagram}`,
    `Profile: ${a.profile}`,
    `Location: ${a.city}`,
    a.followers ? `Follower range: ${a.followers}` : null,
    `Content category: ${a.category}`,
    a.views ? `Typical Reel views: ${a.views}` : null,
    "",
    `Why I'd love to collaborate: ${a.why}`,
    "",
    `Preferred collaboration: ${a.preferred}`,
    "",
    "I'd love to know about your upcoming collaboration opportunities.",
  ].filter((l) => l !== null).join("\n");
}
