'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../../components/layout/Footer';
import { getAccessToken } from '../../lib/auth';
import { api } from '../../services/api';
import type { AdminStats } from '../../types';

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getAccessToken()) {
      setError('Admin access requires authentication.');
      return;
    }
    api
      .getAdminStats()
      .then(setStats)
      .catch(() => setError('Admin privileges required. Sign in with a staff account.'));
  }, []);

  const cards = stats
    ? [
        { label: 'Products', value: stats.products },
        { label: 'Collections', value: stats.collections },
        { label: 'Open inquiries', value: stats.inquiries },
        { label: 'Subscribers', value: stats.subscribers },
        { label: 'Users', value: stats.users },
      ]
    : [];

  return (
    <main className="pt-28">
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-12">
        <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Administration</p>
        <h1 className="font-display mt-6 text-5xl text-offwhite">Maison control panel</h1>
        <p className="mt-4 text-[#d3cbc0]">
          Manage catalogue, inquiries, and subscribers via Django admin or REST API.
        </p>
        {error ? <p className="mt-8 text-red-300">{error}</p> : null}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.label} className="glass-panel rounded-[2rem] p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">{card.label}</p>
              <p className="font-display mt-4 text-4xl text-offwhite">{card.value}</p>
            </article>
          ))}
        </div>
        <a
          href={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace('/api', '')}/admin/`}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block text-xs uppercase tracking-[0.35em] text-gold hover:text-offwhite"
        >
          Open Django admin →
        </a>
        <Link href="/dashboard" className="ml-6 text-xs uppercase tracking-[0.35em] text-offwhite/50 hover:text-gold">
          Back to dashboard
        </Link>
      </section>
      <Footer />
    </main>
  );
}
