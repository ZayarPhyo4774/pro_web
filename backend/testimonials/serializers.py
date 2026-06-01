from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'position', 'comment', 'rating', 'created_at']
        read_only_fields = ['created_at']
