from django.db import models
from django.conf import settings


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200, null=True)
    backdrop_path = models.CharField(max_length=200, null=True)
    adult = models.BooleanField()

    genres = models.ManyToManyField(Genre)

    # 월드컵 1위한 횟수를 저장할 필드
    vote = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.title


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    like = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return '${self.movie} : ${self.title}}'