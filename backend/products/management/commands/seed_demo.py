from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from collections_app.models import Collection
from inquiries.models import NewsletterSubscriber
from products.models import Category, Product, ProductImage
from testimonials.models import Testimonial

User = get_user_model()

UNSPLASH = {
    'noir': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80',
    'emerald': 'https://images.unsplash.com/photo-1524592094714-afd7252f8042?w=1200&q=80',
    'heritage': 'https://images.unsplash.com/photo-1614164185128-eb2f010ed90a?w=1200&q=80',
    'aurum': 'https://images.unsplash.com/photo-1587836374828-4dbafa94f0c5?w=1200&q=80',
    'verdant': 'https://images.unsplash.com/photo-1548171916-6aef835baa12?w=1200&q=80',
    'nocturne': 'https://images.unsplash.com/photo-1617038260897-41a8be41a731?w=1200&q=80',
}

SPECS_EN = {
    'Dial': 'Sunburst lacquer',
    'Case': 'Brushed titanium',
    'Movement': 'Automatic calibre',
    'Power reserve': '72 hours',
    'Water resistance': '50m',
}

SPECS_MM = {
    'Dial': 'နေရောင်ခြည်ပွင့်လက်မှတ်',
    'Case': 'တိုက်စားထားသော တိုက်တိနီယမ်',
    'Movement': 'အလိုအလျောက်ကယ်လီဘာ',
    'Power reserve': '၇၂ နာရီ',
    'Water resistance': '၅၀ မီတာ',
}


class Command(BaseCommand):
    help = 'Seed demo catalog, testimonials, and admin user'

    def handle(self, *args, **options):
        admin, created = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@echelon.local', 'is_staff': True, 'is_superuser': True},
        )
        if created:
            admin.set_password('admin12345')
            admin.save()
            self.stdout.write(self.style.SUCCESS('Created admin (admin / admin12345)'))

        collections_data = [
            (
                'Noir Chronograph',
                'နွယ်ရောင်ခရိုနိုဂရပ်',
                'noir-chronograph',
                'Structurally bold with a matte black presence.',
                'မတ်မဲ့အနက်ရောင်ဖြင့် ခိုင်မာသော ပုံစံ။',
                UNSPLASH['noir'],
            ),
            (
                'Emerald Reserve',
                'မြမြတ်ရောင်ရီဆာဗ်',
                'emerald-reserve',
                'Deep green sophistication with refined finishing.',
                'နက်ရှိုင်းသော အစိမ်းရောင်နှင့် ပြီးပြည့်စုံသော ပြီးမြောက်မှု။',
                UNSPLASH['emerald'],
            ),
            (
                'Heritage Reserve',
                'အမွေအနှစ်ရီဆာဗ်',
                'heritage-reserve',
                'Classic artisanship for the modern connoisseur.',
                'ခေတ်မီစုဆောင်းသူများအတွက် ဂန္ထဝင်လက်မှုပညာ။',
                UNSPLASH['heritage'],
            ),
        ]
        collections = {}
        for name, name_mm, slug, desc, desc_mm, img in collections_data:
            col, _ = Collection.objects.update_or_create(
                slug=slug,
                defaults={
                    'name': name,
                    'name_mm': name_mm,
                    'description': desc,
                    'description_mm': desc_mm,
                    'banner_image_url': img,
                },
            )
            collections[slug] = col

        cat, _ = Category.objects.get_or_create(
            slug='chronograph',
            defaults={'name': 'Chronograph', 'name_mm': 'ခရိုနိုဂရပ်'},
        )

        products_data = [
            ('Noir Chronograph', 'နွယ်ရောင်ခရိုနိုဂရပ်', 'noir-chronograph', collections['noir-chronograph'], Decimal('24800'), True, UNSPLASH['noir']),
            ('Emerald Reserve', 'မြမြတ်ရောင်ရီဆာဗ်', 'emerald-reserve', collections['emerald-reserve'], Decimal('26800'), True, UNSPLASH['emerald']),
            ('Heritage Reserve', 'အမွေအနှစ်ရီဆာဗ်', 'heritage-reserve', collections['heritage-reserve'], Decimal('22900'), True, UNSPLASH['heritage']),
            ('Aurum Heritage', 'ရွှေရောင်အမွေ', 'aurum-heritage', collections['heritage-reserve'], Decimal('31200'), True, UNSPLASH['aurum']),
            ('Verdant Eclipse', 'စိမ်းလန်တိမ်တိမ်', 'verdant-eclipse', collections['emerald-reserve'], Decimal('27500'), False, UNSPLASH['verdant']),
            ('Nocturne Edition', 'ညအချိန်ထုတ်ဝေ', 'nocturne-edition', collections['noir-chronograph'], Decimal('25900'), False, UNSPLASH['nocturne']),
        ]

        for name, name_mm, slug, collection, price, featured, img in products_data:
            desc_en = f'{name} — an original Échelon Atelier composition balancing restraint and presence.'
            desc_mm = f'{name_mm} — စနစ်တကျမှုနှင့် တည်ရှိမှုကို ဟန်ချက်ညီစွာ ပေါင်းစပ်ထားသော Échelon Atelier မူရင်းဖန်တီးမှု။'
            product, _ = Product.objects.update_or_create(
                slug=slug,
                defaults={
                    'name': name,
                    'name_mm': name_mm,
                    'description': desc_en,
                    'description_mm': desc_mm,
                    'price': price,
                    'collection': collection,
                    'category': cat,
                    'specifications': SPECS_EN,
                    'specifications_mm': SPECS_MM,
                    'featured': featured,
                },
            )
            ProductImage.objects.get_or_create(
                product=product,
                sort_order=0,
                defaults={'image_url': img, 'alt_text': name},
            )

        testimonials = [
            ('Arielle S.', 'Collector', 'Understated yet unforgettable — the finishing rewards every glance.', 5),
            ('Damian L.', 'Creative Director', 'A statement without volume. Precisely the tone I wanted.', 5),
            ('Nadia V.', 'Global Executive', 'Comfort, precision, and presence in perfect equilibrium.', 5),
        ]
        for name, position, comment, rating in testimonials:
            Testimonial.objects.get_or_create(
                name=name,
                defaults={'position': position, 'comment': comment, 'rating': rating, 'is_published': True},
            )

        NewsletterSubscriber.objects.get_or_create(email='demo@echelon.local')

        self.stdout.write(self.style.SUCCESS('Demo data seeded successfully.'))
