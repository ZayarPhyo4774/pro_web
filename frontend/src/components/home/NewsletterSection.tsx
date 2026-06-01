'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { api } from '../../services/api';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

export default function NewsletterSection() {
  const { t } = useTranslations();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.subscribeNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="px-6 pb-28 lg:px-12">
      <div className="mx-auto max-w-5xl glass-panel rounded-[2.5rem] p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            align="left"
            eyebrow={t('newsletter.eyebrow')}
            title={t('newsletter.title')}
            description={t('newsletter.description')}
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
              {t('newsletter.email')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="input-field"
            />
            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? t('newsletter.subscribing') : t('newsletter.subscribe')}
            </Button>
            {status === 'success' ? <p className="text-sm text-gold">{t('newsletter.success')}</p> : null}
            {status === 'error' ? <p className="text-sm text-red-500">{t('newsletter.error')}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
