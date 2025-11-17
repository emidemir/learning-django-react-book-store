from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from django.core.exceptions import ObjectDoesNotExist

from books.models import Book
from .models import CartItem, Cart

from .permissions import IsOwnerOrReadOnly

from .serializers import CartItemReadSerializer, CartItemWriteSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        qs = CartItem.objects.all()
        user = self.request.user
        
        user_items = qs.filter(cart__user = user)
        return user_items
    
    def get_serializer_class(self):
        # Use the Write Serializer for POST, PUT, PATCH
        if self.action in ['create', 'update', 'partial_update']:
            return CartItemWriteSerializer
        # Use the Read Serializer for GET requests (list, retrieve)
        return CartItemReadSerializer
    
    def perform_create(self, serializer):
        user = self.request.user
        
        cart, created = Cart.objects.get_or_create(user=user)

        bookID = serializer.validated_data["book"]
        quantity = serializer.validated_data["quantity"]

        try:
            cart_item = CartItem.objects.get(cart=cart, book=bookID)
            cart_item.quantity += quantity
            cart_item.save()

        except ObjectDoesNotExist:
            serializer.save(cart=cart)