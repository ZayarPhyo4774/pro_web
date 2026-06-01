'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { localizeCollection } from '../../lib/localize';
import type { Collection } from '../../types';
import SectionHeading from '../ui/SectionHeading';

type CollectionsPreviewProps = {
  collections: Collection[];
};

export default function CollectionsPreview({ collections }: CollectionsPreviewProps) {
  const { locale, t } = useTranslations();
  const ref = useGsapReveal({ selector: '[data-reveal]' });
  const localizedCollections = useMemo(
    () => collections.map((c) => localizeCollection(locale, c)),
    [collections, locale],
  );

  return (
    <section ref={ref} className="luxury-gradient px-6 py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('collections.eyebrow')}
          title={t('collections.title')}
          description={t('collections.description')}
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {localizedCollections.slice(0, 3).map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              data-reveal
              className="group relative block overflow-hidden rounded-[2rem]"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={collection.banner_image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 ease-luxury group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gold/80">
                    0{index + 1}
                  </p>
                  <h3 className="font-display mt-2 text-3xl text-offwhite">{collection.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">{collection.description}</p>
                  <span className="mt-6 inline-block text-xs uppercase tracking-[0.35em] text-gold opacity-0 transition group-hover:opacity-100">
                    {t('collections.discover')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
