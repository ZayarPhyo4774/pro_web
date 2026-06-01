# Échelon Atelier — System Architecture

## Overview

Full-stack luxury watch maison platform:

| Layer | Stack | Host |
|-------|-------|------|
| Frontend | Next.js 15, React, TypeScript, Tailwind, GSAP, Framer Motion, Swiper | Vercel |
| Backend | Django 5, DRF, SimpleJWT, PostgreSQL | Railway / Render |
| Media | Django `ImageField` + external URLs (dev) | Backend storage |

## Frontend structure

```
frontend/
├── src/
│   ├── app/             # App Router pages & metadata
│   ├── components/
│   │   ├── home/        # Homepage sections
│   │   ├── layout/      # Navbar, Footer, transitions
│   │   ├── product/     # Cards, gallery
│   │   └── ui/          # Buttons, headings
│   ├── features/        # Auth, inquiry forms
│   ├── services/        # API client + fallbacks
│   ├── hooks/           # GSAP reveal, scroll
│   ├── lib/             # Fonts, constants, data loaders
│   ├── types/           # API TypeScript contracts
│   ├── animations/      # GSAP registration
│   └── styles/          # Global CSS
├── package.json
└── next.config.mjs
```

## Backend structure

```
bymm_prj/
├── frontend/            # Next.js app
├── backend/
│   ├── echelon/         # Project settings (DJANGO_SETTINGS_MODULE)
│   ├── api/             # DRF viewsets & auth routes
│   ├── accounts/        # UserProfile
│   ├── collections_app/ # Collection model (not named "collections" — Python stdlib conflict)
│   ├── products/        # Product, Category, ProductImage
│   ├── inquiries/       # Inquiry, NewsletterSubscriber
│   ├── testimonials/    # Testimonial
│   └── byvenv/          # Local virtualenv (gitignored)
├── docs/
└── README.md
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/collections/` | List collections |
| GET | `/api/collections/{slug}/` | Collection detail |
| GET | `/api/products/` | List products |
| GET | `/api/products/{slug}/` | Product detail |
| GET | `/api/products/featured/` | Featured products |
| GET | `/api/categories/` | Categories |
| GET | `/api/testimonials/` | Published testimonials |
| POST | `/api/inquiries/` | Submit inquiry |
| POST | `/api/newsletter/` | Subscribe |
| POST | `/api/auth/register/` | Register |
| POST | `/api/auth/login/` | JWT obtain |
| POST | `/api/auth/refresh/` | JWT refresh |
| GET | `/api/users/me/` | Profile (auth) |
| GET | `/api/admin/stats/` | Admin metrics (staff) |

## Database schema (summary)

- **Collection**: name, slug, description, banner_image / banner_image_url
- **Category**: name, slug
- **Product**: name, slug, description, price, collection FK, category FK, specifications JSON, featured
- **ProductImage**: product FK, image / image_url, sort_order
- **Testimonial**: name, position, comment, rating, is_published
- **Inquiry**: name, email, phone, message, product FK optional
- **NewsletterSubscriber**: email, is_active
- **UserProfile**: user FK, phone, role, company

## Data flow

1. Server Components call `lib/data.ts` loaders.
2. Loaders try Django API; on failure use `services/fallback.ts` (offline dev).
3. Client forms (auth, inquiry, newsletter) call `services/api.ts` with JWT where required.

## Deployment

### Frontend (Vercel)

1. Connect the repository and set the Vercel project root to `frontend/`.
2. Set `NEXT_PUBLIC_API_URL` to production API.
3. Set `NEXT_PUBLIC_SITE_URL` for SEO metadata.

### Backend (Railway)

1. Add PostgreSQL plugin.
2. Set `DATABASE_URL`, `SECRET_KEY`, `CORS_ALLOWED_ORIGINS`, `ALLOWED_HOSTS`.
3. Deploy with `Procfile` / `railway.toml`.
4. Run `python manage.py migrate && python manage.py seed_demo`.

## Performance & SEO

- `next/image` for optimized remote images (Unsplash in demo).
- Per-route `generateMetadata` on product/collection pages.
- Static generation via `generateStaticParams`.
- Code splitting via App Router; client islands for animation/forms only.
