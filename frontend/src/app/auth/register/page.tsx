import type { Metadata } from 'next';
import AuthForm from '../../../features/auth/AuthForm';
import Footer from '../../../components/layout/Footer';

export const metadata: Metadata = { title: 'Register' };

export default function RegisterPage() {
  return (
    <main className="pt-28">
      <div className="mx-auto px-6 pb-24 lg:px-12">
        <AuthForm mode="register" />
      </div>
      <Footer />
    </main>
  );
}
