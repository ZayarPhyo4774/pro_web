from rest_framework import viewsets, permissions
from .models import Testimonial
from .serializers import TestimonialSerializer

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all().order_by('-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]
