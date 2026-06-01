'use client';

import { useEffect, useRef } from 'react';
import { gsap, registerGsap, ScrollTrigger } from '../animations/gsap';

type RevealOptions = {
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
};

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const {
    selector = '[data-reveal]',
    y = 48,
    stagger = 0.12,
    start = 'top 82%',
  } = options;

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [selector, y, stagger, start]);

  return ref;
}

export function useParallax(speed = 0.35) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

export function useTextReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;

    const lines = ref.current.querySelectorAll('[data-line]');
    const ctx = gsap.context(() => {
      gsap.from(lines, {
        y: '110%',
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
