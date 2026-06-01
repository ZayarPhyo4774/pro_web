'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { localizeCollection } from '../../lib/localize';
import type { Collection, ProductListItem } from '../../types';
import ProductCard from '../product/ProductCard';

type CollectionDetailContentProps = {
  collection: Collection;
  products: ProductListItem[];
};

export default function CollectionDetailContent({
  collection,
  products,
}: CollectionDetailContentProps) {
  const { locale, t } = useTranslations();
  const localized = useMemo(() => localizeCollection(locale, collection), [locale, collection]);

  return (
    <>
      <div className="relative aspect-[21/9] overflow-hidden rounded-[2.5rem]">
        {localized.banner_image ? (
          <Image
            src={localized.banner_image}
            alt={localized.name}
            fill
            className="object-cover"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold/80">{t('product.collectionLabel')}</p>
          <h1 className="font-display mt-3 text-5xl text-offwhite">{localized.name}</h1>
          <p className="mt-4 text-muted">{localized.description}</p>
        </div>
      </div>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </>
  );
}
