from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import CartItem

from .serializers import CartItemSerializer

class CartItem(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    