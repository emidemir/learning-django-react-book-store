from rest_framework import serializers

from .models import Review

class ReviewReadSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'created_at', 'book', 'author']

    def get_author(self, obj):
        return obj.user.username

class ReviewWriteSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Review
        fields = ['rating', 'comment', 'author'] 

    def get_author(self, obj):
        return obj.user.username