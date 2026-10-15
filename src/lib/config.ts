// Central site settings — edit here, not in components.
export const siteConfig = {
  name: "GYRA",
  siteUrl: "https://gyra.lovable.app",
  /** International format, digits only. */
  whatsappNumber: "918111832076",
  /** Set to the real profile URL, e.g. "https://instagram.com/yourhandle". Null hides Instagram links. */
  instagramUrl: null as string | null,
  announcements: ["Discover the latest arrivals.", "New pieces, handpicked for you."],
  /** Add genuine reviews only. The section hides while empty. */
  reviews: [] as { name: string; text: string; rating?: number; product?: string }[],
};
