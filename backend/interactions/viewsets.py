from rest_framework import viewsets

from .permissions import IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly

from .models import Review

from .serializers import ReviewSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class FavoritesViewSet(viewsets.ViewSet):
    pass