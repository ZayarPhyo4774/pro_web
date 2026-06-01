'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '../../contexts/LocaleContext';
import { HERO_VIDEO, PLACEHOLDER_IMAGES } from '../../lib/constants';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import LiveClock from '../LiveClock';
import Button from '../ui/Button';

export default function HeroSection() {
  const { t } = useTranslations();
  const sectionRef = useGsapReveal<HTMLElement>({ selector: '[data-reveal]' });

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={PLACEHOLDER_IMAGES.heroPoster}
          className="h-full w-full scale-105 object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-primary)_75%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-28 pt-32 lg:px-12 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p data-reveal className="text-xs uppercase tracking-[0.45em] text-gold/90">
              {t('hero.eyebrow')}
            </p>
            <h1
              data-reveal
              className="font-display mt-6 max-w-4xl text-5xl leading-[1.05] text-offwhite sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {t('hero.title')}
            </h1>
            <p data-reveal className="mt-8 max-w-xl text-lg leading-8 text-muted">
              {t('hero.description')}
            </p>
            <div data-reveal className="mt-12 flex flex-wrap items-center gap-4">
              <Button href="/collections">{t('hero.exploreCollections')}</Button>
              <Link
                href="/inquiry"
                className="text-xs uppercase tracking-[0.35em] text-offwhite/60 transition hover:text-gold"
              >
                {t('hero.privateConsultation')}
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block"
          >
            <LiveClock timezone="Europe/Paris" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.45em] text-offwhite/50">{t('hero.scroll')}</span>
        <span className="h-14 w-px bg-gradient-to-b from-gold/80 to-transparent" />
      </motion.div>
    </section>
  );
}
