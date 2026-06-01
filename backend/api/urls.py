from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    AdminStatsView,
    CategoryViewSet,
    CollectionViewSet,
    InquiryCreateView,
    JWTLoginView,
    MeView,
    NewsletterCreateView,
    ProductViewSet,
    RegisterView,
    TestimonialViewSet,
)

router = DefaultRouter()
router.register(r'collections', CollectionViewSet, basename='collection')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')

urlpatterns = [
    path('', include(router.urls)),
    path('inquiries/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('newsletter/', NewsletterCreateView.as_view(), name='newsletter-create'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/login/', JWTLoginView.as_view(), name='auth-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('users/me/', MeView.as_view(), name='users-me'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
]
