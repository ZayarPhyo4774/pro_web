'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { localizeCollection } from '../../lib/localize';
import type { Collection } from '../../types';

type CollectionsGridProps = {
  collections: Collection[];
};

export default function CollectionsGrid({ collections }: CollectionsGridProps) {
  const { locale } = useTranslations();
  const localized = useMemo(
    () => collections.map((c) => localizeCollection(locale, c)),
    [collections, locale],
  );

  return (
    <div className="mt-24 grid gap-6 md:grid-cols-3">
      {localized.map((collection) => (
        <Link
          key={collection.slug}
          href={`/collections/${collection.slug}`}
          className="glass-panel block rounded-[2rem] p-8 transition hover:border-gold/30"
        >
          <h3 className="font-display text-2xl text-offwhite">{collection.name}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{collection.description}</p>
        </Link>
      ))}
    </div>
  );
}
