export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function absoluteUrl(path: string, base?: string) {
  if (path.startsWith('http')) return path;
  const apiBase = base || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const origin = apiBase.replace(/\/api\/?$/, '');
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}
