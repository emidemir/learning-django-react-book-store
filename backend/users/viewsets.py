from rest_framework import viewsets
from django.shortcuts import get_object_or_404

from .models import Profile

from .serializers import ProfileSerializer

from .permissions import IsAuthenticated, IsOwnerOrReadOnly

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        user_id = self.kwargs.get('pk')  # Get the ID from URL
        return get_object_or_404(Profile, user_id=user_id)