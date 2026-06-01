import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionDetailContent from '../../../components/pages/CollectionDetailContent';
import Footer from '../../../components/layout/Footer';
import { getCollection, getProducts } from '../../../lib/data';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  return { title: collection?.name || 'Collection' };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  const products = (await getProducts()).filter(
    (p) => p.collection === collection.id,
  );

  return (
    <main className="pt-28">
      <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <CollectionDetailContent collection={collection} products={products} />
      </section>
      <Footer />
    </main>
  );
}
