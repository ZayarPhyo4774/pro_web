from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from api.throttles import AuthRateThrottle, InquiryRateThrottle, NewsletterRateThrottle
from api.views import InquiryCreateView, JWTLoginView, NewsletterCreateView, RegisterView
from collections_app.models import Collection
from products.models import Product

User = get_user_model()


class ProductAPITests(APITestCase):
    def setUp(self):
        self.collection = Collection.objects.create(
            name='Heritage',
            slug='heritage',
            description='Test collection',
            banner_image_url='https://example.com/banner.jpg',
        )
        self.product = Product.objects.create(
            name='Chronograph I',
            slug='chronograph-i',
            description='A test piece',
            price='12500.00',
            collection=self.collection,
            featured=True,
        )

    def test_product_detail_by_slug(self):
        response = self.client.get('/api/products/chronograph-i/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Chronograph I')
        self.assertEqual(response.data['collection']['slug'], 'heritage')

    def test_product_not_found(self):
        response = self.client.get('/api/products/missing-slug/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class NewsletterAPITests(APITestCase):
    def test_subscribe_creates_subscriber(self):
        response = self.client.post('/api/newsletter/', {'email': 'collector@example.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], 'collector@example.com')

    def test_public_endpoints_have_rate_limits(self):
        rates = settings.REST_FRAMEWORK['DEFAULT_THROTTLE_RATES']
        self.assertEqual(NewsletterCreateView.throttle_classes, [NewsletterRateThrottle])
        self.assertEqual(InquiryCreateView.throttle_classes, [InquiryRateThrottle])
        self.assertEqual(RegisterView.throttle_classes, [AuthRateThrottle])
        self.assertEqual(JWTLoginView.throttle_classes, [AuthRateThrottle])
        self.assertIn('newsletter', rates)
        self.assertIn('inquiry', rates)
        self.assertIn('auth', rates)


class RegisterAPITests(APITestCase):
    def test_register_creates_user(self):
        response = self.client.post(
            '/api/auth/register/',
            {
                'username': 'newcollector',
                'email': 'new@example.com',
                'password': 'securepass1',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newcollector').exists())
