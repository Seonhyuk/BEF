import imp
from requests import get
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
      
      followings_number = serializers.IntegerField(source='followings.count', read_only=True)
      followers_number = serializers.IntegerField(source='followers.count', read_only=True)

      class Meta:
            model = get_user_model()
            fields = ('username', 'name', 'disliked_movies', 'liked_genre', 'wished_to_movies', 'watched_movies', 'followings_number', 'followers_number', 'profile_image', )
            depth = 1