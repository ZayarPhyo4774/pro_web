'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { BRAND } from '../../lib/constants';
import { cn } from '../../lib/utils';
import PreferenceControls from '../preferences/PreferenceControls';

export default function Navbar() {
  const { t } = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: t('nav.collections'), href: '/collections' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
    { label: t('nav.inquire'), href: '/inquiry' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxury',
        scrolled
          ? 'border-b border-black/5 bg-primary/75 py-4 backdrop-blur-2xl dark:border-white/5'
          : 'bg-transparent py-6',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="font-display text-lg uppercase tracking-[0.35em] text-gold transition hover:text-offwhite"
        >
          {BRAND.name.split(' ')[0]}
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-[0.7rem] uppercase tracking-[0.35em] text-offwhite/70 transition hover:text-gold"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-luxury group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <PreferenceControls />
          <Link
            href="/dashboard"
            className="text-[0.65rem] uppercase tracking-[0.3em] text-offwhite/50 transition hover:text-gold"
          >
            {t('nav.atelier')}
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full border border-gold/50 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.3em] text-gold transition hover:bg-gold/10"
          >
            {t('nav.signIn')}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <PreferenceControls />
          <button
            type="button"
            aria-label={t('nav.toggleMenu')}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={cn('h-px w-6 bg-offwhite transition', open && 'translate-y-2 rotate-45')} />
            <span className={cn('h-px w-6 bg-offwhite transition', open && 'opacity-0')} />
            <span className={cn('h-px w-6 bg-offwhite transition', open && '-translate-y-2 -rotate-45')} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-3xl md:hidden"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-screen flex-col items-center justify-center gap-8"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-offwhite"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full border border-gold px-8 py-3 text-xs uppercase tracking-[0.35em] text-gold"
              >
                {t('nav.signIn')}
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
