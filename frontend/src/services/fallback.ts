import { PLACEHOLDER_IMAGES } from '../lib/constants';
import type { Collection, ProductDetail, ProductListItem, Testimonial } from '../types';

export const fallbackCollections: Collection[] = [
  {
    id: 1,
    name: 'Noir Chronograph',
    slug: 'noir-chronograph',
    description: 'Structurally bold with a matte black presence.',
    banner_image: PLACEHOLDER_IMAGES.collection1,
  },
  {
    id: 2,
    name: 'Emerald Reserve',
    slug: 'emerald-reserve',
    description: 'Deep green sophistication with refined finishing.',
    banner_image: PLACEHOLDER_IMAGES.collection2,
  },
  {
    id: 3,
    name: 'Heritage Reserve',
    slug: 'heritage-reserve',
    description: 'Classic artisanship for the modern connoisseur.',
    banner_image: PLACEHOLDER_IMAGES.collection3,
  },
];

export const fallbackProducts: ProductListItem[] = [
  {
    id: 1,
    name: 'Noir Chronograph',
    slug: 'noir-chronograph',
    description: 'A sleek matte black timepiece with luminous detailing.',
    price: '24800.00',
    collection: 1,
    collection_name: 'Noir Chronograph',
    featured: true,
    primary_image: PLACEHOLDER_IMAGES.collection1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Emerald Reserve',
    slug: 'emerald-reserve',
    description: 'Deep green lacquer dial with superior finishing.',
    price: '26800.00',
    collection: 2,
    collection_name: 'Emerald Reserve',
    featured: true,
    primary_image: PLACEHOLDER_IMAGES.collection2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Heritage Reserve',
    slug: 'heritage-reserve',
    description: 'Classic silhouettes for the modern connoisseur.',
    price: '22900.00',
    collection: 3,
    collection_name: 'Heritage Reserve',
    featured: true,
    primary_image: PLACEHOLDER_IMAGES.collection3,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Aurum Heritage',
    slug: 'aurum-heritage',
    description: 'Warm gold accents with sapphire crystal clarity.',
    price: '31200.00',
    collection: 3,
    collection_name: 'Heritage Reserve',
    featured: true,
    primary_image: PLACEHOLDER_IMAGES.watch1,
    created_at: new Date().toISOString(),
  },
];

export function toProductDetail(item: ProductListItem): ProductDetail {
  const collection = fallbackCollections.find((c) => c.id === item.collection) || null;
  return {
    ...item,
    images: [
      { id: 1, url: item.primary_image, alt_text: item.name, sort_order: 0 },
      {
        id: 2,
        url: PLACEHOLDER_IMAGES.watch2,
        alt_text: `${item.name} detail`,
        sort_order: 1,
      },
    ],
    collection,
    category: { id: 1, name: 'Chronograph', slug: 'chronograph' },
    specifications: {
      Dial: 'Sunburst lacquer',
      Case: 'Brushed titanium',
      Movement: 'Automatic calibre',
      'Power reserve': '72 hours',
      'Water resistance': '50m',
    },
  };
}

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Arielle S.',
    position: 'Collector',
    comment: 'Understated yet unforgettable — the finishing rewards every glance.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Damian L.',
    position: 'Creative Director',
    comment: 'A statement without volume. Precisely the tone I wanted.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Nadia V.',
    position: 'Global Executive',
    comment: 'Comfort, precision, and presence in perfect equilibrium.',
    rating: 5,
  },
];
