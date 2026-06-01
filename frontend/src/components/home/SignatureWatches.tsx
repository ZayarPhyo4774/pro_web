'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useTranslations } from '../../contexts/LocaleContext';
import type { ProductListItem } from '../../types';
import ProductCard from '../product/ProductCard';
import SectionHeading from '../ui/SectionHeading';

import 'swiper/css';
import 'swiper/css/navigation';

type SignatureWatchesProps = {
  products: ProductListItem[];
};

export default function SignatureWatches({ products }: SignatureWatchesProps) {
  const { t } = useTranslations();

  return (
    <section className="border-y border-black/5 bg-surface/40 px-6 py-28 dark:border-white/5 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('signature.eyebrow')}
          title={t('signature.title')}
        />
        <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-3">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
        <div className="mt-10 lg:hidden">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1.15}
            navigation
            autoplay={{ delay: 5000 }}
          >
            {products.slice(0, 4).map((product, index) => (
              <SwiperSlide key={product.slug}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
