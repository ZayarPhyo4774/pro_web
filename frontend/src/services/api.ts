import { getAccessToken, getTokens, setTokens } from '../lib/auth';
import type {
  AdminStats,
  AuthResponse,
  Collection,
  Paginated,
  ProductDetail,
  ProductListItem,
  Testimonial,
  UserProfile,
} from '../types';
import { ApiError } from './errors';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type RequestOptions = RequestInit & { auth?: boolean; _retried?: boolean };

async function refreshAccessToken(): Promise<string | null> {
  const tokens = getTokens();
  if (!tokens?.refresh) return null;

  const res = await fetch(`${API_BASE}/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: tokens.refresh }),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { access: string };
  setTokens({ access: data.access, refresh: tokens.refresh });
  return data.access;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (options.auth) {
    const token = getAccessToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    cache: options.method === 'GET' || !options.method ? 'no-store' : undefined,
  });

  if (res.status === 401 && options.auth && !options._retried) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return request<T>(path, { ...options, _retried: true });
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail =
      typeof body.detail === 'string'
        ? body.detail
        : res.status === 404
          ? 'Not found'
          : typeof body.message === 'string'
            ? body.message
            : res.statusText;
    throw new ApiError(detail, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function unwrapList<T>(data: T[] | Paginated<T>): T[] {
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}

export const api = {
  getCollections: () => request<Collection[] | Paginated<Collection>>('/collections/').then(unwrapList),
  getCollection: (slug: string) => request<Collection>(`/collections/${slug}/`),
  getProducts: () => request<ProductListItem[] | Paginated<ProductListItem>>('/products/').then(unwrapList),
  getFeaturedProducts: () => request<ProductListItem[]>('/products/featured/'),
  getProduct: (slug: string) => request<ProductDetail>(`/products/${slug}/`),
  getTestimonials: () => request<Testimonial[] | Paginated<Testimonial>>('/testimonials/').then(unwrapList),
  subscribeNewsletter: (email: string) =>
    request('/newsletter/', { method: 'POST', body: JSON.stringify({ email }) }),
  submitInquiry: (payload: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    product?: number;
  }) => request('/inquiries/', { method: 'POST', body: JSON.stringify(payload) }),
  login: (username: string, password: string) =>
    request<AuthResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  register: (payload: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => request('/auth/register/', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => request<UserProfile>('/users/me/', { auth: true }),
  getAdminStats: () => request<AdminStats>('/admin/stats/', { auth: true }),
};
