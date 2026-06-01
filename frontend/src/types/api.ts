export type Collection = {
  id: number;
  name: string;
  name_mm?: string;
  slug: string;
  description: string;
  description_mm?: string;
  banner_image: string;
  created_at?: string;
};

export type Category = {
  id: number;
  name: string;
  name_mm?: string;
  slug: string;
};

export type ProductImage = {
  id: number;
  url: string;
  alt_text: string;
  sort_order: number;
};

export type ProductListItem = {
  id: number;
  name: string;
  name_mm?: string;
  slug: string;
  description: string;
  description_mm?: string;
  price: string;
  collection: number | null;
  collection_name: string;
  collection_name_mm?: string;
  featured: boolean;
  primary_image: string;
  created_at: string;
};

export type ProductDetail = Omit<ProductListItem, 'collection' | 'collection_name' | 'collection_name_mm'> & {
  images: ProductImage[];
  collection: Collection | null;
  category: Category | null;
  specifications: Record<string, string>;
  specifications_mm?: Record<string, string>;
};

export type Testimonial = {
  id: number;
  name: string;
  position: string;
  comment: string;
  rating: number;
  created_at?: string;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'client' | 'staff' | 'admin';
  company: string;
  created_at: string;
};

export type AdminStats = {
  products: number;
  collections: number;
  inquiries: number;
  subscribers: number;
  users: number;
};

export type AuthResponse = {
  access: string;
  refresh: string;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
