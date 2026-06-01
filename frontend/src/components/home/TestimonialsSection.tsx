'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '../../contexts/LocaleContext';
import type { Testimonial } from '../../types';
import SectionHeading from '../ui/SectionHeading';

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t } = useTranslations();

  return (
    <section className="px-6 py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="glass-panel rounded-[2rem] p-8"
            >
              <p className="font-accent text-2xl leading-relaxed text-muted">&ldquo;{item.comment}&rdquo;</p>
              <footer className="mt-8 border-t border-black/10 pt-6 dark:border-white/10">
                <p className="text-sm font-medium text-offwhite">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/70">{item.position}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
