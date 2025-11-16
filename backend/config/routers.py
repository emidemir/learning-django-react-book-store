from rest_framework import routers

from users.viewsets import ProfileViewSet
from orders.viewsets import CartItem
from interactions.viewsets import FavoritesViewSet, ReviewViewSet
from books.viewsets import BookViewSet, GenreViewSet, AuthorViewSet

router = routers.DefaultRouter()

router.register(prefix='profiles', viewset=ProfileViewSet, basename='profile')
router.register(prefix='items', viewset=CartItem, basename='item')
router.register(prefix='favorites', viewset=FavoritesViewSet, basename='favorite')
router.register(prefix='reviews', viewset=ReviewViewSet, basename='review')
router.register(prefix='books', viewset=BookViewSet, basename='book')
router.register(prefix='genres', viewset=GenreViewSet, basename='genre')
router.register(prefix='authors', viewset=AuthorViewSet, basename='author')

urlpatterns = router.urls