from django.contrib.auth import get_user_model
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.models import UserProfile
from collections_app.models import Collection
from inquiries.models import Inquiry, NewsletterSubscriber
from products.models import Category, Product
from testimonials.models import Testimonial

from .throttles import AuthRateThrottle, InquiryRateThrottle, NewsletterRateThrottle
from .serializers import (
    CategorySerializer,
    CollectionSerializer,
    InquirySerializer,
    NewsletterSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    RegisterSerializer,
    TestimonialSerializer,
    UserProfileSerializer,
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    throttle_classes = [AuthRateThrottle]


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response(UserProfileSerializer(profile).data)


class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = 'slug'


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.select_related('collection', 'category').prefetch_related('images')
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        qs = self.get_queryset().filter(featured=True)[:6]
        serializer = ProductListSerializer(qs, many=True, context={'request': request})
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_published=True)
    serializer_class = TestimonialSerializer


class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [AllowAny]
    throttle_classes = [InquiryRateThrottle]


class NewsletterCreateView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [AllowAny]
    throttle_classes = [NewsletterRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email'].strip().lower()
        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=email,
            defaults={'is_active': True},
        )
        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.save(update_fields=['is_active'])
        output = self.get_serializer(subscriber)
        return Response(output.data, status=status.HTTP_201_CREATED)


class AdminStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({
            'products': Product.objects.count(),
            'collections': Collection.objects.count(),
            'inquiries': Inquiry.objects.filter(is_resolved=False).count(),
            'subscribers': NewsletterSubscriber.objects.filter(is_active=True).count(),
            'users': User.objects.count(),
        })


class JWTLoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    throttle_classes = [AuthRateThrottle]
