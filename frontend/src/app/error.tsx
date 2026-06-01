'use client';

import { useEffect } from 'react';
import Button from '../components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Unexpected interruption</p>
      <h1 className="font-display mt-6 text-4xl text-offwhite">The atelier momentarily pauses</h1>
      <p className="mt-4 max-w-md text-[#d3cbc0]">Please try again — our craftsmen are attending to the experience.</p>
      <Button onClick={reset} className="mt-10">
        Retry
      </Button>
    </main>
  );
}
