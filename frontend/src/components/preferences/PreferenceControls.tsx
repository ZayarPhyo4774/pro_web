'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LOCALE_LABELS, type Locale } from '../../i18n/locales';
import { useTranslations } from '../../contexts/LocaleContext';
import { cn } from '../../lib/utils';

export default function PreferenceControls({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { locale, setLocale, t } = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn('h-9 w-[7.5rem]', className)} aria-hidden />;
  }

  const isDark = (resolvedTheme ?? theme) === 'dark';

  function toggleTheme() {
    setTheme(isDark ? 'light' : 'dark');
  }

  function selectLocale(next: Locale) {
    setLocale(next);
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? t('preferences.themeLight') : t('preferences.themeDark')}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-offwhite/60 transition hover:border-gold/40 hover:text-gold dark:border-white/10 dark:text-offwhite/70"
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div
        role="group"
        aria-label={t('preferences.language')}
        className="flex rounded-full border border-black/10 p-0.5 text-[0.6rem] uppercase tracking-[0.2em] dark:border-white/10"
      >
        {(['en', 'mm'] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => selectLocale(code)}
            className={cn(
              'rounded-full px-2.5 py-1.5 transition',
              locale === code
                ? 'bg-gold/20 text-gold'
                : 'text-offwhite/50 hover:text-gold',
            )}
          >
            {LOCALE_LABELS[code]}
          </button>
        ))}
      </div>
    </div>
  );
}
