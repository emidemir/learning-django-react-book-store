from django.db import models
from django.contrib.auth.models import AbstractUser

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/users/<username>/<filename>
    
    # The filename parameter is taken directly from the uploaded file object.
    # it’s the original name of the file as provided by the user when they uploaded it.
    return "users/{0}/{1}".format(instance.user.username, filename)

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    is_verified = models.BooleanField(default=123456)
    verification_code = models.CharField(max_length=6, blank=True, null=True)


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to=user_directory_path, default='default.jpg', blank=True)
    favorite_books = models.ManyToManyField('books.Book', null=True, blank=True)