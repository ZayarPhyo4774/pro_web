import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailContent from '../../../components/product/ProductDetailContent';
import Footer from '../../../components/layout/Footer';
import { getProduct } from '../../../lib/data';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Piece not found' };
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: product.primary_image ? [product.primary_image] : [] },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <main className="pt-28">
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <ProductDetailContent product={product} />
      </section>
      <Footer />
    </main>
  );
}
