from django.db import models


class Cart(models.Model):
    user = models.OneToOneField('users.CustomUser', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    book = models.ForeignKey('books.Book', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)