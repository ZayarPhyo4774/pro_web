'use client';

import Image from 'next/image';
import { useTranslations } from '../../contexts/LocaleContext';
import { PLACEHOLDER_IMAGES } from '../../lib/constants';

export default function AboutContent() {
  const { t } = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/80">{t('about.eyebrow')}</p>
      <h1 className="font-display mt-6 max-w-4xl text-5xl text-offwhite sm:text-6xl">{t('about.title')}</h1>
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
          <Image src={PLACEHOLDER_IMAGES.story} alt={t('about.imageAlt')} fill className="object-cover" />
        </div>
        <div className="space-y-8 text-lg leading-8 text-muted">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
        </div>
      </div>
    </section>
  );
}
