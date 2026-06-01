import type { Metadata } from 'next';
import AboutContent from '../../components/pages/AboutContent';
import Footer from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story, philosophy, and atelier practice of Échelon Atelier.',
};

export default function AboutPage() {
  return (
    <main className="pt-28">
      <AboutContent />
      <Footer />
    </main>
  );
}
