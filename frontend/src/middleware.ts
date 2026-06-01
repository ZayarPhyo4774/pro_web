import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Legacy product URLs lived under /collections/{slug} — redirect to /products/{slug} */
const PRODUCT_SLUGS = new Set([
  'noir-chronograph',
  'emerald-reserve',
  'heritage-reserve',
  'aurum-heritage',
  'verdant-eclipse',
  'nocturne-edition',
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/collections\/([^/]+)$/);
  if (match && PRODUCT_SLUGS.has(match[1])) {
    return NextResponse.redirect(new URL(`/products/${match[1]}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/collections/:slug'],
};
