export interface StaffDoc {
  id: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
  certifications: string[];
  achievements: string[];
  imageUrl?: string;
  quote?: string;
  sortOrder: number;
}

export interface PlanDoc {
  id: string;
  pushpressId: string;
  name: string;
  tag: string;
  fallbackPrice: number;
  unit: string;
  desc: string;
  items: string[];
  featured?: boolean;
  href: string;
  type: 'monthly' | 'pack';
  sortOrder: number;
}

export type AboutSlot = 'main' | 'left' | 'right';

// Announcement types
export type HeadlineAccent = 'cream' | 'flag' | 'blue';
export type DisplayMode = 'modal' | 'banner' | 'both';
export type DismissBehavior = 'session' | 'every-visit';
export type AnnouncementMediaType = 'video-upload' | 'video-embed' | 'image' | null;
export type CtaLinkOption = '#programs' | '#about' | '#locations' | '#booking' | '#gallery' | 'external';

export interface AnnouncementDoc {
  id: string;
  headline: string;
  headlineAccent: HeadlineAccent;
  subtitle: string;
  body: string;
  mediaType: AnnouncementMediaType;
  mediaUrl: string;
  ctaEnabled: boolean;
  ctaText: string;
  ctaLink: CtaLinkOption;
  ctaExternalUrl: string;
  startDate: string;
  endDate: string | null;
  displayMode: DisplayMode;
  videoAutoplay: boolean;
  dismissBehavior: DismissBehavior;
  enabled: boolean;
}

export interface GalleryDoc {
  id: string;
  fileUrl: string;
  caption: string;
  mediaType: 'image' | 'video';
  sortOrder: number;
  visible: boolean;
  aboutSlot?: AboutSlot | null;
}
