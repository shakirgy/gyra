import earrings from "@/assets/earrings.jpg";
import necklace from "@/assets/necklace.jpg";
import bracelets from "@/assets/bracelets.jpg";
import rings from "@/assets/rings.jpg";
import handpicked from "@/assets/handpicked.jpg";
import hoops from "@/assets/hoops.jpg";

export type CategorySlug = "earrings" | "necklaces" | "bracelets-bangles" | "rings" | "handpicked";

export const categories: { slug: CategorySlug; name: string; image: string; blurb: string }[] = [
  { slug: "earrings", name: "Earrings", image: earrings, blurb: "Studs, drops and hoops for every mood." },
  { slug: "necklaces", name: "Necklaces", image: necklace, blurb: "Dainty layers and statement pendants." },
  { slug: "bracelets-bangles", name: "Bracelets & Bangles", image: bracelets, blurb: "Stack them, mix them, make them yours." },
  { slug: "rings", name: "Rings", image: rings, blurb: "Little bands with a lot of personality." },
  { slug: "handpicked", name: "Handpicked Pieces", image: handpicked, blurb: "Our favourite finds, picked with love." },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: CategorySlug;
  collections?: CategorySlug[];
  images: string[];
  variants?: { label: string; options: string[] };
  material?: string;
  color?: string;
  careInstructions?: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isActive: boolean;
  availability?: "in-stock" | "out-of-stock";
  tags: string[];
  instagramUrl?: string;
  createdAt: string;
};

/**
 * SAMPLE CATALOGUE — placeholder records for layout only.
 * Replace with GYRA's real products and photos before launch.
 */
export const IS_SAMPLE_CATALOGUE = true;

const all: Product[] = [
  { id: "s1", slug: "pearl-drop-earrings", name: "Pearl Drop Earrings", shortDescription: "Soft, glowy drops for everyday polish.", description: "Sample product description. A smooth gold-tone stud with a pearl-look drop — easy to wear from class to dinner.", price: 349, originalPrice: 449, category: "earrings", images: [earrings, hoops], color: "Gold", isNewArrival: true, isFeatured: true, isActive: true, tags: ["pearl", "drop", "everyday"], createdAt: "2026-10-01" },
  { id: "s2", slug: "lilac-charm-huggies", name: "Lilac Charm Huggies", shortDescription: "Tiny hoops with a pop of lilac.", description: "Sample product description. Snug huggie hoops with a little lilac stone charm.", price: 299, category: "earrings", collections: ["handpicked"], images: [hoops, earrings], color: "Gold", variants: { label: "Stone colour", options: ["Lilac", "Clear"] }, isNewArrival: true, isBestseller: true, isActive: true, tags: ["hoops", "huggie", "lilac"], createdAt: "2026-10-05" },
  { id: "s3", slug: "layered-heart-necklace", name: "Layered Heart Necklace", shortDescription: "Two delicate layers, one sweet heart.", description: "Sample product description. A double-layer chain with a bead and a puffed heart pendant.", price: 499, category: "necklaces", images: [necklace], color: "Gold", isBestseller: true, isFeatured: true, isActive: true, tags: ["heart", "layered", "pendant"], createdAt: "2026-09-20" },
  { id: "s4", slug: "everyday-bangle-stack", name: "Everyday Bangle Stack", shortDescription: "A ready-made stack of slim bangles.", description: "Sample product description. A set of slim and hammered bangles with a beaded bracelet.", price: 599, originalPrice: 699, category: "bracelets-bangles", images: [bracelets], color: "Gold", variants: { label: "Size", options: ["2.4", "2.6", "2.8"] }, isNewArrival: true, isBestseller: true, isActive: true, tags: ["bangles", "stack", "beaded"], createdAt: "2026-10-08" },
  { id: "s5", slug: "trio-stacking-rings", name: "Trio Stacking Rings", shortDescription: "Three bands, endless combinations.", description: "Sample product description. A plain band, a twisted band and a pearl-look band to stack your way.", price: 399, category: "rings", images: [rings], color: "Gold", variants: { label: "Size", options: ["Small", "Medium", "Adjustable"] }, isNewArrival: true, isActive: true, tags: ["stacking", "pearl", "minimal"], createdAt: "2026-10-10" },
  { id: "s6", slug: "celestial-charm-set", name: "Celestial Charm Set", shortDescription: "Sun, moon and stars — a little set of magic.", description: "Sample product description. A curated set with a charm bracelet, mini hoops, a ring and a pendant.", price: 899, category: "handpicked", images: [handpicked], color: "Gold", isBestseller: true, isFeatured: true, isActive: true, tags: ["charm", "set", "celestial", "gift"], createdAt: "2026-09-12" },
  { id: "s7", slug: "twisted-band-ring", name: "Twisted Band Ring", shortDescription: "A rope-texture ring that goes with everything.", description: "Sample product description. A slim twisted band to wear alone or stacked.", price: 199, category: "rings", collections: ["handpicked"], images: [rings], color: "Gold", isActive: true, tags: ["twisted", "band"], createdAt: "2026-08-30" },
  { id: "s8", slug: "beaded-charm-bracelet", name: "Beaded Charm Bracelet", shortDescription: "Soft beads with gold-tone accents.", description: "Sample product description. A stretchy beaded bracelet with gold-tone spacer beads.", price: 249, category: "bracelets-bangles", images: [bracelets], color: "Ivory", isActive: true, tags: ["beaded", "stretch"], createdAt: "2026-09-02" },
];

export const products = all.filter((p) => p.isActive);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const inCategory = (p: Product, slug: CategorySlug) =>
  p.category === slug || (p.collections ?? []).includes(slug);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const discountPercent = (p: Product) =>
  p.originalPrice && p.originalPrice > p.price && p.price > 0
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : null;
