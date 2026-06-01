from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.models import UserProfile
from collections_app.models import Collection
from inquiries.models import Inquiry, NewsletterSubscriber
from products.models import Category, Product, ProductImage
from testimonials.models import Testimonial

User = get_user_model()


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ('id', 'url', 'alt_text', 'sort_order')

    def get_url(self, obj):
        request = self.context.get('request')
        url = obj.url
        if url and request and url.startswith('/'):
            return request.build_absolute_uri(url)
        return url


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'name_mm', 'slug')


class CollectionSerializer(serializers.ModelSerializer):
    banner_image = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = (
            'id', 'name', 'name_mm', 'slug', 'description', 'description_mm',
            'banner_image', 'created_at',
        )

    def get_banner_image(self, obj):
        request = self.context.get('request')
        banner = obj.banner
        if banner and request and banner.startswith('/'):
            return request.build_absolute_uri(banner)
        return banner


class ProductListSerializer(serializers.ModelSerializer):
    collection_name = serializers.CharField(source='collection.name', read_only=True)
    collection_name_mm = serializers.CharField(source='collection.name_mm', read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'name_mm', 'slug', 'description', 'description_mm', 'price',
            'collection', 'collection_name', 'collection_name_mm', 'featured', 'primary_image',
            'created_at',
        )

    def get_primary_image(self, obj):
        image = obj.images.first()
        if not image:
            return ''
        request = self.context.get('request')
        url = image.url
        if url and request and url.startswith('/'):
            return request.build_absolute_uri(url)
        return url


class ProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    collection = CollectionSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'name_mm', 'slug', 'description', 'description_mm', 'price',
            'collection', 'category', 'images', 'specifications', 'specifications_mm',
            'featured', 'created_at',
        )


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ('id', 'name', 'position', 'comment', 'rating', 'created_at')


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ('id', 'name', 'email', 'phone', 'message', 'product', 'created_at')
        read_only_fields = ('id', 'created_at')


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ('id', 'email', 'subscribed_at')
        read_only_fields = ('id', 'subscribed_at')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.get_or_create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone', 'role', 'company', 'created_at',
        )
