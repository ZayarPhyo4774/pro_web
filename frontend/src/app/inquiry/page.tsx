import type { Metadata } from 'next';
import { Suspense } from 'react';
import Footer from '../../components/layout/Footer';
import InquiryIntro from '../../components/pages/InquiryIntro';
import InquiryForm from '../../features/inquiry/InquiryForm';

export const metadata: Metadata = {
  title: 'Inquiry',
  description: 'Request a private viewing or bespoke consultation.',
};

export default function InquiryPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-12">
        <InquiryIntro />
        <Suspense fallback={<div className="mt-10 h-64 animate-pulse rounded-[2rem] bg-black/5 dark:bg-white/5" />}>
          <InquiryForm />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
