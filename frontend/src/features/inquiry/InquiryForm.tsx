'use client';

import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { api } from '../../services/api';
import Button from '../../components/ui/Button';

export default function InquiryForm() {
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    try {
      await api.submitInquiry({
        name: String(form.get('name')),
        email: String(form.get('email')),
        phone: String(form.get('phone') || ''),
        message: String(form.get('message')),
        product: productId ? Number(productId) : undefined,
      });
      setStatus('success');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel mt-10 grid gap-6 rounded-[2.5rem] p-10">
      <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
        {t('inquiry.name')}
        <input name="name" required className="input-field mt-2" />
      </label>
      <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
        {t('inquiry.email')}
        <input name="email" type="email" required className="input-field mt-2" />
      </label>
      <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
        {t('inquiry.phone')}
        <input name="phone" className="input-field mt-2" />
      </label>
      <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
        {t('inquiry.message')}
        <textarea name="message" required rows={5} className="input-field mt-2" />
      </label>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? t('inquiry.sending') : t('inquiry.submit')}
      </Button>
      {status === 'success' ? <p className="text-sm text-gold">{t('inquiry.success')}</p> : null}
      {status === 'error' ? <p className="text-sm text-red-500">{t('inquiry.error')}</p> : null}
    </form>
  );
}
