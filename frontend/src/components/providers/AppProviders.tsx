'use client';

import type { ReactNode } from 'react';
import { LocaleProvider } from '../../contexts/LocaleContext';
import ThemeProvider from './ThemeProvider';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
