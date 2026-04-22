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

export interface GalleryDoc {
  id: string;
  fileUrl: string;
  caption: string;
  mediaType: 'image' | 'video';
  sortOrder: number;
  visible: boolean;
}
