from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Genre, Movie

from collections import deque

class User(AbstractUser):
    # 유저 이름 저장
    name = models.CharField(max_length=10, null=False)

    # 좋아하는 장르 정보
    liked_genre = models.ManyToManyField(Genre)

    # 이미 본 영화 정보
    watched_movies = models.ManyToManyField(Movie, related_name='seen_user')
    # 찜한 영화 정보
    wished_to_movies = models.ManyToManyField(Movie, related_name='wished_user')
    # 불호하는 영화 정보
    disliked_movies = models.ManyToManyField(Movie, related_name='disliked_user')

    # 유저간 팔로우 정보
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    
    # 이 사람에게 최근 추천된 영화
    recently_recommended_movies = deque()

    def __str__(self) -> str:
        return self.name