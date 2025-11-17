from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


def book_cover_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/users/<username>/<filename>
    
    # The filename parameter is taken directly from the uploaded file object.
    # it’s the original name of the file as provided by the user when they uploaded it.
    return "book_covers/{0}/{1}".format(instance.title, filename)

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    cover_image = models.ImageField(upload_to=book_cover_directory_path, )
    publication_date = models.DateTimeField()
    page = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(
        default=3,
        validators=[
            MinValueValidator(0, message='Rating cannot be less than 0.'),
            MaxValueValidator(5, message='Rating cannot be greater than 5.')
        ]
    )
