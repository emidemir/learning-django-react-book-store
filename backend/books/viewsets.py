from rest_framework import viewsets

from .models import Book
from .models import Genre
from .models import Author

from .serializers import BookSerializer
from .serializers import GenreSerializer
from .serializers import AuthorSerializer

from .paginations import CustomPagination

class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = CustomPagination

class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

 
