'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../../components/layout/Footer';
import { clearTokens, getAccessToken } from '../../lib/auth';
import { api } from '../../services/api';
import type { UserProfile } from '../../types';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getAccessToken()) {
      setError('Please sign in to access your atelier dashboard.');
      return;
    }
    api.getProfile().then(setProfile).catch(() => setError('Unable to load profile.'));
  }, []);

  return (
    <main className="pt-28">
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-12">
        <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Atelier dashboard</p>
        <h1 className="font-display mt-6 text-5xl text-offwhite">Your maison overview</h1>
        {error ? (
          <p className="mt-8 text-[#d3cbc0]">
            {error}{' '}
            <Link href="/auth/login" className="text-gold hover:text-offwhite">
              Sign in
            </Link>
          </p>
        ) : null}
        {profile ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { title: 'Member', value: profile.username, detail: profile.email },
              { title: 'Role', value: profile.role, detail: profile.company || 'Private collector' },
              { title: 'Concierge', value: 'Available', detail: 'Book a private viewing' },
            ].map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-[2rem] p-8"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-gold/70">{card.title}</p>
                <p className="font-display mt-4 text-3xl text-offwhite">{card.value}</p>
                <p className="mt-3 text-sm text-[#d3cbc0]">{card.detail}</p>
              </motion.article>
            ))}
          </div>
        ) : null}
        <div className="mt-10 flex gap-4">
          <Link href="/inquiry" className="text-xs uppercase tracking-[0.35em] text-gold hover:text-offwhite">
            New inquiry
          </Link>
          <button
            type="button"
            onClick={() => {
              clearTokens();
              window.location.href = '/auth/login';
            }}
            className="text-xs uppercase tracking-[0.35em] text-offwhite/50 hover:text-gold"
          >
            Sign out
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
