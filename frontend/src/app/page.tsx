import CraftsmanshipSection from '../components/home/CraftsmanshipSection';
import CollectionsPreview from '../components/home/CollectionsPreview';
import HeroSection from '../components/home/HeroSection';
import NewsletterSection from '../components/home/NewsletterSection';
import SignatureWatches from '../components/home/SignatureWatches';
import StorySection from '../components/home/StorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/layout/Footer';
import { getCollections, getFeaturedProducts, getTestimonials } from '../lib/data';

export default async function HomePage() {
  const [collections, products, testimonials] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
    getTestimonials(),
  ]);

  return (
    <main>
      <HeroSection />
      <CollectionsPreview collections={collections} />
      <StorySection />
      <SignatureWatches products={products} />
      <CraftsmanshipSection />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
