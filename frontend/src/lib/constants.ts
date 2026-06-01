export const BRAND = {
  name: 'Échelon Atelier',
  tagline: 'Where time becomes legacy',
  domain: 'echelonatelier.com',
} as const;

/** Royalty-free Pexels footage — replace with your own brand film in production */
export const HERO_VIDEO =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
  'https://videos.pexels.com/video-files/4065153/4065153-uhd_2560_1440_25fps.mp4';

export const PLACEHOLDER_IMAGES = {
  heroPoster:
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=85',
  collection1:
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80',
  collection2:
    'https://images.unsplash.com/photo-1524592094714-afd7252f8042?w=1200&q=80',
  collection3:
    'https://images.unsplash.com/photo-1614164185128-eb2f010ed90a?w=1200&q=80',
  watch1:
    'https://images.unsplash.com/photo-1587836374828-4dbafa94f0c5?w=1200&q=80',
  watch2:
    'https://images.unsplash.com/photo-1548171916-6aef835baa12?w=1200&q=80',
  watch3:
    'https://images.unsplash.com/photo-1617038260897-41a8be41a731?w=1200&q=80',
  story:
    'https://images.unsplash.com/photo-1612817159949-1951056114ae?w=1400&q=80',
  craft:
    'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=1400&q=80',
} as const;
