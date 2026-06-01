'use client';

import Image from 'next/image';
import { useTranslations } from '../../contexts/LocaleContext';
import { PLACEHOLDER_IMAGES } from '../../lib/constants';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function CraftsmanshipSection() {
  const { t } = useTranslations();
  const ref = useGsapReveal({ selector: '[data-reveal]' });

  const items = [
    { label: t('craft.movement'), text: t('craft.movementText') },
    { label: t('craft.materials'), text: t('craft.materialsText') },
    { label: t('craft.finishing'), text: t('craft.finishingText') },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28 lg:px-12 lg:py-36">
      <div className="absolute inset-0 opacity-30">
        <Image src={PLACEHOLDER_IMAGES.craft} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <p data-reveal className="text-xs uppercase tracking-[0.4em] text-gold/80">
          {t('craft.eyebrow')}
        </p>
        <h2 data-reveal className="font-display mt-5 max-w-3xl text-4xl text-offwhite sm:text-5xl">
          {t('craft.title')}
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.label} data-reveal className="glass-panel rounded-[2rem] p-8">
              <h3 className="font-accent text-2xl text-gold">{item.label}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
