'use client';

import { useTranslations } from '../../contexts/LocaleContext';
import SectionHeading from '../ui/SectionHeading';

export default function CollectionsIntro() {
  const { t } = useTranslations();

  return (
    <SectionHeading
      eyebrow={t('collections.pageEyebrow')}
      title={t('collections.pageTitle')}
      description={t('collections.pageDescription')}
    />
  );
}
