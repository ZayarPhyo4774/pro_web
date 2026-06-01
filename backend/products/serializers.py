from rest_framework import serializers
from .models import Product, ProductImage, Specification

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image', 'order']

class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = ['key', 'value']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    specifications = SpecificationSerializer(many=True, read_only=True)
    collection = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'collection', 'images', 'specifications', 'featured', 'created_at']
