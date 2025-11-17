from rest_framework import serializers

from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'created_at', 'book', 'author']

    def get_author(self, obj):
        return obj.user.username
