'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';
import type { ProductImage } from '../../types';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

type ProductGalleryProps = {
  images: ProductImage[];
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const slides = images.length ? images : [{ id: 0, url: '', alt_text: name, sort_order: 0 }];

  function goToSlide(index: number) {
    setActive(index);
    swiper?.slideTo(index);
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-surface lg:aspect-[3/4]">
        <Swiper
          modules={[EffectFade, Pagination]}
          effect="fade"
          pagination={{ clickable: true }}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.activeIndex)}
          className="h-full w-full"
        >
          {slides.map((img) => (
            <SwiperSlide key={img.id}>
              {img.url ? (
                <Image src={img.url} alt={img.alt_text || name} fill className="object-cover" priority />
              ) : (
                <div className="flex h-full items-center justify-center text-white/30">No image</div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {slides.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            onClick={() => goToSlide(i)}
            className={`relative aspect-square overflow-hidden rounded-xl border ${
              active === i ? 'border-gold' : 'border-white/10'
            }`}
            whileHover={{ scale: 1.03 }}
          >
            {img.url ? (
              <Image src={img.url} alt="" fill className="object-cover" sizes="120px" />
            ) : null}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
