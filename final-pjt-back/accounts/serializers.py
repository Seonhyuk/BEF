from requests import get
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomCard


class UserSerializer(serializers.ModelSerializer):

      class Meta:
            model = get_user_model()
            fields = ('pk', 'username', 'name', 'disliked_movies', 'liked_genre', 'wished_to_movies', 'watched_movies', 'profile_image', 'followers', 'followings', 'articles', 'cards',)
            depth = 1


class CustomCardSerializer(serializers.ModelSerializer):

      class Meta:
            model = CustomCard
            fields = '__all__'