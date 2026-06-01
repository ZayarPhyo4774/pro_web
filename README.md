# Échelon Atelier — Luxury Watch Maison Platform

Original premium watch brand experience built with **Next.js 15** and **Django REST Framework**. Inspired by the elegance of leading maisons — without copying any proprietary assets or branding.

## Features

- Cinematic homepage with hero video, GSAP scroll reveals, Framer Motion transitions
- Collections catalogue & fullscreen product detail with Swiper gallery
- About, Contact, Inquiry, Newsletter
- JWT authentication, user dashboard, admin stats
- Django admin for products, media, inquiries, subscribers
- API fallbacks for frontend-only development

## Quick start

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

The Django project uses a local virtual environment at `backend/byvenv` (already created on your machine).

```bash
cd backend
source byvenv/bin/activate    # Windows: byvenv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

Without activating, you can run commands directly:

```bash
cd backend
byvenv/bin/python manage.py runserver
```

API: [http://localhost:8000/api/](http://localhost:8000/api/)  
Admin: [http://localhost:8000/admin/](http://localhost:8000/admin/) — `admin` / `admin12345`

Set in `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Project structure

```text
bymm_prj/
├── frontend/   # Next.js app
├── backend/    # Django REST API
├── docs/       # Architecture and deployment notes
└── README.md
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full architecture, API reference, and deployment notes.

## Design system

| Token | Value |
|-------|-------|
| Black | `#0B0B0B` |
| Gold | `#C8A96B` |
| Forest | `#0F3D2E` |
| White | `#F8F8F8` |
| Surface | `#1A1A1A` |

Fonts: Playfair Display, Cormorant Garamond, Inter (via `next/font`).

## Deployment

- **Frontend**: Vercel — use `frontend/` as the project root, then set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL`
- **Backend**: Railway or Render — PostgreSQL + `gunicorn echelon.wsgi`

## License

Private / educational use. Replace demo imagery with licensed brand assets before production launch.
