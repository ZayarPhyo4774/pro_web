'use client';

import { useTranslations } from '../../contexts/LocaleContext';

export default function InquiryIntro() {
  const { t } = useTranslations();

  return (
    <>
      <p className="text-xs uppercase tracking-[0.4em] text-gold/80">{t('inquiry.eyebrow')}</p>
      <h1 className="font-display mt-6 text-5xl text-offwhite">{t('inquiry.title')}</h1>
      <p className="mt-6 text-lg text-muted">{t('inquiry.description')}</p>
    </>
  );
}
