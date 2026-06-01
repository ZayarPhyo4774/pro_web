'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { localizeProduct } from '../../lib/localize';
import { formatPrice } from '../../lib/utils';
import type { ProductDetail } from '../../types';
import Button from '../ui/Button';
import ProductGallery from './ProductGallery';

type ProductDetailContentProps = {
  product: ProductDetail;
};

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  const { locale, t } = useTranslations();
  const localized = useMemo(
    () => localizeProduct(locale, product),
    [locale, product],
  ) as ProductDetail;
  const price = Number(localized.price);

  return (
    <>
      <div className="grid gap-16 lg:grid-cols-2">
        <ProductGallery images={localized.images} name={localized.name} />
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs uppercase tracking-[0.4em] text-gold/80">
            {localized.collection?.name ?? ''}
          </p>
          <h1 className="font-display mt-4 text-5xl text-offwhite lg:text-6xl">{localized.name}</h1>
          <p className="mt-6 text-lg leading-8 text-muted">{localized.description}</p>
          <p className="mt-8 font-accent text-3xl text-gold">{formatPrice(price)}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`/inquiry?product=${product.id}`}>{t('product.requestViewing')}</Button>
            <Link
              href="/collections"
              className="text-xs uppercase tracking-[0.35em] text-offwhite/50 hover:text-gold"
            >
              {t('product.allCollections')}
            </Link>
          </div>
          <dl className="mt-12 space-y-4 border-t border-black/10 pt-10 dark:border-white/10">
            {Object.entries(localized.specifications || {}).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-4 text-sm">
                <dt className="uppercase tracking-[0.3em] text-gold/70">{key}</dt>
                <dd className="text-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {localized.images[1]?.url ? (
        <div className="relative mt-24 aspect-[21/9] overflow-hidden rounded-[2.5rem]">
          <Image src={localized.images[1].url} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary" />
        </div>
      ) : null}
    </>
  );
}
