from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model

from .models import Profile
from orders.models import Cart

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(instance, sender, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def create_user_cart(instance, sender, created, *args, **kwargs):
    if created:
        Cart.objects.create(user=instance)
