import imp
from requests import get
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

      class Meta:
            model = get_user_model()
            fields = ('username', 'name', 'disliked_movies', 'liked_genre', 'wished_to_movies', 'watched_movies', 'profile_image', 'followers', 'followings',)
            depth = 1