import type { Metadata } from 'next';
import ContactContent from '../../components/pages/ContactContent';
import Footer from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Connect with Échelon Atelier for appointments and enquiries.',
};

export default function ContactPage() {
  return (
    <main className="pt-28">
      <ContactContent />
      <Footer />
    </main>
  );
}
