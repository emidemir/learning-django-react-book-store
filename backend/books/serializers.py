from rest_framework import serializers

from .models import Book
from .models import Genre
from .models import Author

class BookSerializer(serializers.ModelSerializer):
    model = Book
    fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    model = Genre
    fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    model = Author
    fields = '__all__'
