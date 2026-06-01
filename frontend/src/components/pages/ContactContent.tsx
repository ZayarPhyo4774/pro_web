'use client';

import Link from 'next/link';
import { useTranslations } from '../../contexts/LocaleContext';
import { BRAND } from '../../lib/constants';
import Button from '../ui/Button';

export default function ContactContent() {
  const { t } = useTranslations();

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-12">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/80">{t('contact.eyebrow')}</p>
      <h1 className="font-display mt-6 text-5xl text-offwhite">{t('contact.title')}</h1>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="glass-panel rounded-[2rem] p-8">
          <h2 className="font-accent text-2xl text-gold">{t('contact.maison')}</h2>
          <p className="mt-4 text-muted">{BRAND.name}</p>
          <p className="mt-2 text-sm text-muted-soft">{t('contact.appointment')}</p>
          <p className="mt-6 text-sm text-muted-soft">concierge@{BRAND.domain}</p>
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <h2 className="font-accent text-2xl text-gold">{t('contact.consultation')}</h2>
          <p className="mt-4 text-muted">{t('contact.consultationText')}</p>
          <Button href="/inquiry" className="mt-8">
            {t('contact.startInquiry')}
          </Button>
          <Link
            href="/collections"
            className="mt-4 block text-xs uppercase tracking-[0.35em] text-offwhite/50 hover:text-gold"
          >
            {t('contact.browseCollections')}
          </Link>
        </div>
      </div>
    </section>
  );
}
