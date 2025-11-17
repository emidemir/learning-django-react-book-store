from rest_framework import serializers

from .models import Book
from .models import Genre
from .models import Author

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    author = AuthorSerializer()
    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'genres', 'description', 
            'price', 'cover_image', 'publication_date', 'page', 'rating'
        ]


