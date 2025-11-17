from rest_framework import serializers

from .models import CartItem

from books.serializers import BookSerializer


class CartItemReadSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True) # Nested for display
    class Meta:
        model = CartItem
        fields = '__all__'

class CartItemWriteSerializer(serializers.ModelSerializer):
    # Uses PrimaryKeyRelatedField by default for the book ForeignKey
    class Meta:
        model = CartItem
        fields = ['book', 'quantity']