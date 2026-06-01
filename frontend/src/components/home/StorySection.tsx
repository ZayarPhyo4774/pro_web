'use client';

import Image from 'next/image';
import { useTranslations } from '../../contexts/LocaleContext';
import { PLACEHOLDER_IMAGES } from '../../lib/constants';
import { useParallax, useTextReveal } from '../../hooks/useGsapReveal';
import SectionHeading from '../ui/SectionHeading';

export default function StorySection() {
  const { t } = useTranslations();
  const textRef = useTextReveal();
  const imageRef = useParallax(0.2);

  const points = [t('story.point1'), t('story.point2'), t('story.point3')];

  return (
    <section className="px-6 py-28 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div ref={textRef}>
          <SectionHeading
            align="left"
            eyebrow={t('story.eyebrow')}
            title={t('story.title')}
            description={t('story.description')}
          />
          <ul className="mt-10 space-y-4 border-l border-gold/30 pl-6 text-muted">
            {points.map((point) => (
              <li key={point} data-line className="line-reveal text-sm leading-7">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
          <Image
            src={PLACEHOLDER_IMAGES.story}
            alt={t('story.imageAlt')}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-forest/20 mix-blend-multiply" />
        </div>
      </div>
    </section>
  );
}
