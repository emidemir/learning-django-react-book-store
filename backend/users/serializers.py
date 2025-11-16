from rest_framework import serializers

from .models import Profile, CustomUser

class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', required=False)
    email = serializers.EmailField(source='user.email', required=False)
    first_name = serializers.CharField(source='user.first_name', required=False, max_length=20)
    last_name = serializers.CharField(source='user.last_name', required=False, max_length=20)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    img_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'user_id', 'username', 'email', 'first_name', 'last_name', 'bio', 'avatar', 'img_url','favorite_books']

    def get_img_url(self, obj):
        return obj.avatar.url

    def validate_username(self, value):
        user = self.instance.user if self.instance else None
        if user and CustomUser.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value
    
    def validate_email(self, value):
        user = self.instance.user if self.instance else None
        if user and CustomUser.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        
        # Update user fields
        for attr, value in user_data.items():
            if value:
                setattr(instance.user, attr, value)
        instance.user.save()
        
        # Update profile fields (including avatar if provided)
        for attr, value in validated_data.items():
            if value:
                setattr(instance, attr, value)
        instance.save()
        
        return instance