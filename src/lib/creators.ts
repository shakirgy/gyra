/**
 * GYRA Creator Club showcase data — edit here and redeploy.
 * Add ONLY real, authorised creators, Reels and figures. Sections stay in their
 * empty state while these lists are empty.
 */
export type FeaturedCreator = {
  name: string;
  handle: string; // e.g. "@name"
  profileUrl: string;
  image: string; // authorised photo path or URL
  category?: string;
  city?: string;
};

export type CreatorReel = {
  title: string;
  creatorHandle: string;
  reelUrl: string;
  thumbnail: string;
  views?: number;
  viewsVerifiedOn?: string; // ISO date the view count was checked
};

export type Collaboration = {
  creatorHandle: string;
  image: string;
  postUrl: string;
  caption?: string;
};

export const featuredCreators: FeaturedCreator[] = [];
export const topReels: CreatorReel[] = [];
export const pastCollaborations: Collaboration[] = [];

export const formatViews = (n: number) =>
  new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(n);
