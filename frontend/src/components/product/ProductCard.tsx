'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { localizeProduct } from '../../lib/localize';
import { formatPrice } from '../../lib/utils';
import type { ProductListItem } from '../../types';

type ProductCardProps = {
  product: ProductListItem;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { locale, t } = useTranslations();
  const localized = useMemo(
    () => localizeProduct(locale, product) as ProductListItem,
    [locale, product],
  );
  const price = Number(localized.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-surface">
            <Image
              src={product.primary_image || '/images/placeholder.jpg'}
              alt={localized.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 ease-luxury group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-gold/80">
                  {localized.collection_name}
                </p>
                <h3 className="font-display mt-1 text-2xl text-offwhite">{localized.name}</h3>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-offwhite/80">
                {formatPrice(price)}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-7 text-muted/80">{localized.description}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold transition group-hover:text-offwhite">
          {t('product.viewPiece')} <span aria-hidden>→</span>
        </span>
      </Link>
    </motion.article>
  );
}
