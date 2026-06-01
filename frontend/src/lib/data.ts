import { unstable_noStore as noStore } from 'next/cache';
import { cache } from 'react';
import { api } from '../services/api';
import { ApiError } from '../services/errors';
import {
  fallbackCollections,
  fallbackProducts,
  fallbackTestimonials,
  toProductDetail,
} from '../services/fallback';
import type { Collection, ProductDetail, ProductListItem, Testimonial } from '../types';

function isApiUnreachable(error: unknown): boolean {
  if (error instanceof ApiError) return false;
  if (!(error instanceof Error)) return true;
  const msg = error.message.toLowerCase();
  return (
    msg.includes('fetch failed') ||
    msg.includes('network') ||
    msg.includes('econnrefused') ||
    msg.includes('failed to fetch')
  );
}

function isNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}

async function fetchCollections(): Promise<Collection[]> {
  noStore();
  try {
    return await api.getCollections();
  } catch (error) {
    if (!isApiUnreachable(error)) throw error;
    return fallbackCollections;
  }
}

async function fetchFeaturedProducts(): Promise<ProductListItem[]> {
  noStore();
  try {
    return await api.getFeaturedProducts();
  } catch (error) {
    if (!isApiUnreachable(error)) throw error;
    return fallbackProducts.filter((p) => p.featured);
  }
}

async function fetchProducts(): Promise<ProductListItem[]> {
  noStore();
  try {
    return await api.getProducts();
  } catch (error) {
    if (!isApiUnreachable(error)) throw error;
    return fallbackProducts;
  }
}

async function fetchProduct(slug: string): Promise<ProductDetail | null> {
  noStore();
  try {
    return await api.getProduct(slug);
  } catch (error) {
    if (isNotFound(error)) return null;
    if (!isApiUnreachable(error)) throw error;
    const item = fallbackProducts.find((p) => p.slug === slug);
    return item ? toProductDetail(item) : null;
  }
}

async function fetchTestimonials(): Promise<Testimonial[]> {
  noStore();
  try {
    return await api.getTestimonials();
  } catch (error) {
    if (!isApiUnreachable(error)) throw error;
    return fallbackTestimonials;
  }
}

async function fetchCollection(slug: string): Promise<Collection | null> {
  noStore();
  try {
    return await api.getCollection(slug);
  } catch (error) {
    if (isNotFound(error)) return null;
    if (!isApiUnreachable(error)) throw error;
    return fallbackCollections.find((c) => c.slug === slug) || null;
  }
}

export const getCollections = cache(fetchCollections);
export const getFeaturedProducts = cache(fetchFeaturedProducts);
export const getProducts = cache(fetchProducts);
export const getProduct = cache(fetchProduct);
export const getTestimonials = cache(fetchTestimonials);
export const getCollection = cache(fetchCollection);
