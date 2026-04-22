import type { GalleryDoc } from '@/app/lib/types';

export const FALLBACK_GALLERY: GalleryDoc[] = [
  { id: 'g1', fileUrl: '/diving_bg.png', caption: 'Andy — dive save', mediaType: 'image', sortOrder: 0, visible: true },
  { id: 'g2', fileUrl: '/hands_up_2.png', caption: 'Gloves', mediaType: 'image', sortOrder: 1, visible: true },
  { id: 'g3', fileUrl: '/soccer_net_bg.jpg', caption: 'Net / evening', mediaType: 'image', sortOrder: 2, visible: true },
  { id: 'g4', fileUrl: '/soccer.jpeg', caption: 'Camp huddle', mediaType: 'image', sortOrder: 3, visible: true },
  { id: 'g5', fileUrl: '/goalkeeper.jpeg', caption: 'Young keeper', mediaType: 'image', sortOrder: 4, visible: true },
  { id: 'g6', fileUrl: '/hands_up.jpg', caption: 'Camp team photo', mediaType: 'image', sortOrder: 5, visible: true },
  { id: 'g7', fileUrl: '/soccer_field.jpg', caption: 'Film session', mediaType: 'image', sortOrder: 6, visible: true },
];
