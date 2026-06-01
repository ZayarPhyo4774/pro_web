import type { Locale } from '../i18n/locales';
import type { Collection, ProductDetail, ProductListItem } from '../types';

export function pickLocalized(
  locale: Locale,
  english: string,
  myanmar?: string | null,
): string {
  if (locale === 'mm' && myanmar?.trim()) return myanmar.trim();
  return english;
}

export function localizeCollection(locale: Locale, collection: Collection): Collection {
  return {
    ...collection,
    name: pickLocalized(locale, collection.name, collection.name_mm),
    description: pickLocalized(locale, collection.description, collection.description_mm),
  };
}

export function localizeSpecifications(
  locale: Locale,
  english: Record<string, string>,
  myanmar?: Record<string, string> | null,
): Record<string, string> {
  if (locale !== 'mm' || !myanmar || !Object.keys(myanmar).length) {
    return english;
  }
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(english)) {
    result[key] = myanmar[key]?.trim() || value;
  }
  for (const [key, value] of Object.entries(myanmar)) {
    if (!(key in result) && value?.trim()) {
      result[key] = value.trim();
    }
  }
  return result;
}

export function localizeProductListItem(
  locale: Locale,
  product: ProductListItem,
): ProductListItem {
  return {
    ...product,
    name: pickLocalized(locale, product.name, product.name_mm),
    description: pickLocalized(locale, product.description, product.description_mm),
    collection_name: pickLocalized(
      locale,
      product.collection_name,
      product.collection_name_mm,
    ),
  };
}

export function localizeProductDetail(locale: Locale, product: ProductDetail): ProductDetail {
  return {
    ...product,
    name: pickLocalized(locale, product.name, product.name_mm),
    description: pickLocalized(locale, product.description, product.description_mm),
    specifications: localizeSpecifications(
      locale,
      product.specifications,
      product.specifications_mm,
    ),
    collection: product.collection ? localizeCollection(locale, product.collection) : null,
    category: product.category
      ? {
          ...product.category,
          name: pickLocalized(locale, product.category.name, product.category.name_mm),
        }
      : null,
  };
}

export function localizeProduct(
  locale: Locale,
  product: ProductListItem | ProductDetail,
): ProductListItem | ProductDetail {
  if ('images' in product) {
    return localizeProductDetail(locale, product);
  }
  return localizeProductListItem(locale, product);
}
