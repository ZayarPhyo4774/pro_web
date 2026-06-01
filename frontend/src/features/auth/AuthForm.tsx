'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useTranslations } from '../../contexts/LocaleContext';
import { setTokens } from '../../lib/auth';
import { api } from '../../services/api';
import Button from '../../components/ui/Button';

type AuthFormProps = {
  mode: 'login' | 'register';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const { t } = useTranslations();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(e.currentTarget);

    try {
      if (mode === 'login') {
        const tokens = await api.login(
          String(form.get('username')),
          String(form.get('password')),
        );
        setTokens(tokens);
        router.push('/dashboard');
      } else {
        await api.register({
          username: String(form.get('username')),
          email: String(form.get('email')),
          password: String(form.get('password')),
          first_name: String(form.get('first_name') || ''),
          last_name: String(form.get('last_name') || ''),
        });
        const tokens = await api.login(
          String(form.get('username')),
          String(form.get('password')),
        );
        setTokens(tokens);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.authFailed'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl glass-panel rounded-[2.5rem] p-10">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/80">
        {mode === 'login' ? t('auth.memberAccess') : t('auth.joinAtelier')}
      </p>
      <h1 className="font-display mt-6 text-4xl text-offwhite">
        {mode === 'login' ? t('auth.signInTitle') : t('auth.createTitle')}
      </h1>
      <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
        <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
          {t('auth.username')}
          <input name="username" required className="input-field mt-2" />
        </label>
        {mode === 'register' ? (
          <>
            <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
              {t('auth.email')}
              <input name="email" type="email" required className="input-field mt-2" />
            </label>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
                {t('auth.firstName')}
                <input name="first_name" className="input-field mt-2" />
              </label>
              <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
                {t('auth.lastName')}
                <input name="last_name" className="input-field mt-2" />
              </label>
            </div>
          </>
        ) : null}
        <label className="block text-xs uppercase tracking-[0.35em] text-offwhite/50">
          {t('auth.password')}
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="input-field mt-2"
          />
        </label>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <Button type="submit" disabled={loading}>
          {loading
            ? t('auth.pleaseWait')
            : mode === 'login'
              ? t('auth.signIn')
              : t('auth.createAccount')}
        </Button>
      </form>
      <p className="mt-6 text-sm text-gold/80">
        {mode === 'login' ? (
          <>
            {t('auth.newCollector')}{' '}
            <Link href="/auth/register" className="text-gold hover:text-offwhite">
              {t('auth.register')}
            </Link>
          </>
        ) : (
          <>
            {t('auth.alreadyMember')}{' '}
            <Link href="/auth/login" className="text-gold hover:text-offwhite">
              {t('auth.signIn')}
            </Link>
          </>
        )}
      </p>
    </section>
  );
}
