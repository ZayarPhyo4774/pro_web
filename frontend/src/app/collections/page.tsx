import type { Metadata } from 'next';
import ProductCard from '../../components/product/ProductCard';
import Footer from '../../components/layout/Footer';
import CollectionsGrid from '../../components/pages/CollectionsGrid';
import CollectionsIntro from '../../components/pages/CollectionsIntro';
import { getCollections, getProducts } from '../../lib/data';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore curated luxury watch collections from Échelon Atelier.',
};

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  return (
    <main className="pt-28">
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <CollectionsIntro />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
        <CollectionsGrid collections={collections} />
      </section>
      <Footer />
    </main>
  );
}
