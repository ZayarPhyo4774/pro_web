from rest_framework import viewsets, permissions
from .models import Collection
from .serializers import CollectionSerializer

class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
