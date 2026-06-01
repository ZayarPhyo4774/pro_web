'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type LiveClockProps = {
  timezone?: string;
};

export default function LiveClock({ timezone = 'Europe/Paris' }: LiveClockProps) {
  const [time, setTime] = useState('--:--:--');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timezone,
      }).format(new Date());
      setTime(formatted);
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return (
    <div className="flex flex-col items-end gap-2">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold/70">Atelier time</p>
      <motion.div
        key={time}
        initial={{ opacity: 0.6, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="glass-panel min-w-[9rem] rounded-2xl px-5 py-3 text-center font-accent text-3xl tracking-[0.15em] text-offwhite tabular-nums"
      >
        {mounted ? time : '--:--:--'}
      </motion.div>
      <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/40">
        {timezone.replace('_', ' ')}
      </p>
    </div>
  );
}
