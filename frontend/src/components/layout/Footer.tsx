'use client';

import Link from 'next/link';
import { useTranslations } from '../../contexts/LocaleContext';
import { BRAND } from '../../lib/constants';

export default function Footer() {
  const { t } = useTranslations();

  const links = [
    { label: t('nav.collections'), href: '/collections' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
    { label: t('nav.inquire'), href: '/inquiry' },
    { label: t('nav.atelier'), href: '/dashboard' },
    { label: t('nav.admin'), href: '/admin' },
  ];

  return (
    <footer className="border-t border-black/10 bg-surface/80 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="font-display text-3xl text-offwhite">{BRAND.name}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-soft">{t('footer.description')}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.3em] text-gold/80 transition hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-black/10 pt-8 text-xs uppercase tracking-[0.35em] text-offwhite/35 dark:border-white/10 sm:flex-row sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {BRAND.name}
          </span>
          <span>{t('brand.tagline')}</span>
        </div>
      </div>
    </footer>
  );
}
