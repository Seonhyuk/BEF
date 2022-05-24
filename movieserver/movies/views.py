from django.http import JsonResponse
import requests
import random
from datetime import datetime

from django.shortcuts import render, get_list_or_404, get_object_or_404

from .serializers import MovieSerializer, ReviewSerializer, GenreSerializer
from accounts.serializers import UserSerializer

from .models import Movie, Genre, Review
from accounts.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from collections import deque

from statistics import pstdev
from math import log, sqrt


# Now Playing 현재 상영중인 영화를 반환하는 함수
# tmdb로 요청을 보내고, 우리 db에 없는 영화면 db에 추가한다. 다음에 정보를 직렬화해서 vue로 보내준다.
@api_view(['GET'])
def now_playing(request):
    URL = 'https://api.themoviedb.org/3/movie/now_playing'
    
    params = {
        'api_key': '23381280d15990e32b22e9d84d79e8fb',
        'region': 'KR',
        'language': 'ko',
    }

    response = requests.get(URL, params=params).json()['results']

    result = []

    for movie in response:
        if not Movie.objects.filter(pk=movie['id']).exists():
            new = Movie()
            new.pk = movie['id']
            new.title = movie['title']
            new.release_date = movie['release_date']
            new.popularity = movie['popularity']
            new.vote_average = movie['vote_average']
            new.overview = movie['overview']
            new.poster_path = movie['poster_path']
            new.backdrop_path = movie['backdrop_path']
            new.adult = movie['adult']

            new.save()

            for g in movie['genre_ids']:
                new.genres.add(Genre.objects.get(pk=g))
    
        m = Movie.objects.get(pk=movie['id'])
        result.append(m)

        if len(result) == 10:
            break

    result.sort(key=lambda x: -x.popularity)
    
    serializer = MovieSerializer(result, many=True)

    return Response(serializer.data)


# 작년 이맘 때 한 영화
@api_view(['GET'])
def last_year_showing(request):
    today = datetime.today()
    last_year = today.year - 5
    month = today.month

    movies = list(Movie.objects.filter(release_date__year__gte=f'{last_year}', release_date__year__lte=f'{today.year - 1}', release_date__month=f'{month}').order_by('-popularity'))[:10]

    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)


# 영화 추천 함수
@api_view(['GET'])
def recommend(request, username):
    user = User.objects.get(username=username)
    genres = list(user.liked_genre.all())

    movies = []

    for genre in genres:
        genre_movies = Movie.objects.filter(genres=genre, popularity__gte=2)
        movies.append(list(genre_movies))

    movies.append(list(Movie.objects.filter(popularity__gte=2)))

    for i in range(len(movies)):
        lst_popularity = []
        lst_points = []

        for movie in movies[i]:
            lst_popularity.append(sqrt(log(movie.popularity)))
            lst_points.append(sqrt(log(movie.vote_average + 1)))

        avg_popularity = sum(lst_popularity) / len(lst_popularity)
        avg_points = sum(lst_points) / len(lst_points)

        sd_popularity = pstdev(lst_popularity)
        sd_points = pstdev(lst_points)

        movies[i].sort(key=lambda x: -(((x.popularity - avg_popularity) / sd_popularity) * 0.7 + ((x.vote_average - avg_points) / sd_points) * 0.3))

    recommend = []

    lst = deque(user.recently_recommended_movies.all())

    while len(recommend) < 12:
        for i in range(len(movies)):
            for j in range(len(movies[i])):
                m = movies[i][j]
                if user.watched_movies.filter(pk=m.pk).exists() or user.wished_to_movies.filter(pk=m.pk).exists():
                    continue
                elif user.disliked_movies.filter(pk=m.pk).exists() or user.recently_recommended_movies.filter(pk=m.pk).exists() or m in recommend:
                    continue
                else:
                    recommend.append(m)
                    user.recently_recommended_movies.add(m)
                    lst.append(m)
                    if len(lst) > 200:
                        movie = lst.popleft()
                        user.recently_recommended_movies.remove(movie)
                    break
            if len(recommend) >= 12:
                break       

    serializer = MovieSerializer(recommend, many=True)

    return Response(serializer.data)


# 월드컵 기능 중 영화 반환 함수
@api_view(['GET'])
def worldcup(request, exponent, username):
    user = User.objects.get(username=username)
    
    watched_movie = list(user.watched_movies.order_by('-popularity')[:200])
    popular_movie = list(Movie.objects.order_by('-popularity')[:300])

    movie = Movie.objects.get(title='రౌద్రం రణం రుధిరం')
    if movie in popular_movie:
        popular_movie.remove(movie)

    random.shuffle(watched_movie)
    random.shuffle(popular_movie)

    tournament = []

    flag = False
    w_idx, p_idx = 0, 0
    for i in range(2**exponent):
        if flag and w_idx < len(watched_movie):
            while watched_movie[w_idx] in tournament:
                w_idx += 1
            
            if w_idx < len(watched_movie):
                tournament.append(watched_movie[w_idx])
                w_idx += 1
            
            flag = not flag
        else:
            while popular_movie[p_idx] in tournament:
                p_idx += 1

            tournament.append(popular_movie[p_idx])
            p_idx += 1

            flag = not flag
    
    serializer = MovieSerializer(tournament, many=True)

    return Response(serializer.data)


# 월드컵 기능 중 round 순서를 결정하는 함수
@api_view(['GET'])
def match_up(request, exponent):
    shuffle_tournament = []

    for i in range(exponent, 0, -1):
        nums = list(range(2**(i-1), 2**i))
        random.shuffle(nums)
        shuffle_tournament.extend(nums)
    
    data = {
        'shuffle': shuffle_tournament
    }

    return Response(data)


# 해당하는 영화의 상세 정보를 반환하는 함수
@api_view(['GET'])
def detail(request, movie_id):
    movie = Movie.objects.get(pk=movie_id)

    serializer = MovieSerializer(movie)

    return Response(serializer.data)


# method에 따라 특정 유저가 이미 본, 찜한, 싫어하는 영화객체를 반환하는 함수
@api_view(['GET'])
def user_movie(request, method, username):
    user = User.objects.get(username=username)

    # 1일 땐 이미 본 영화, 2일 땐 찜한, 3일 땐 싫어하는 영화
    if method == 1:
        movies = user.watched_movies.all()
    elif method == 2:
        movies = user.wished_to_movies.all()
    else:
        movies = user.disliked_movies.all()

    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)


# tmdb에서 영화를 검색하는 함수
@api_view(['GET'])
def search_movie(request, query):
    URL = 'https://api.themoviedb.org/3/search/movie/'
    
    params = {
        'api_key': '23381280d15990e32b22e9d84d79e8fb',
        'region': 'KR',
        'language': 'ko',
        'query': query
    }

    response = requests.get(URL, params=params).json()['results']

    result = []

    for movie in response:
        if not Movie.objects.filter(pk=movie['id']).exists():
            new = Movie()
            new.pk = movie['id']
            new.title = movie['title']
            new.release_date = movie['release_date']
            new.popularity = movie['popularity']
            new.vote_average = movie['vote_average']
            new.overview = movie['overview']
            new.poster_path = movie['poster_path']
            new.backdrop_path = movie['backdrop_path']
            new.adult = movie['adult']

            new.save()

            for g in movie['genre_ids']:
                new.genres.add(Genre.objects.get(pk=g))
    
        m = Movie.objects.get(pk=movie['id'])
        result.append(m)

    result.sort(key=lambda x: -x.popularity)

    serializer = MovieSerializer(result, many=True)

    return Response(serializer.data)


# 특정 유저의 리뷰를 조회하는 함수
@api_view(['GET'])
def get_user_review(request, username):
    user = User.objects.get(username=username)
    reviews = Review.objects.filter(user=user)
    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data)



# 특정 영화의 리뷰를 조회하는 함수
@api_view(['GET', 'POST'])
def get_movie_review(request, movie_id):
    movie = Movie.objects.get(pk=movie_id)
    if request.method == 'GET':
        reviews = Review.objects.filter(movie=movie)
        serializer = ReviewSerializer(reviews, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        user = User.objects.get(username=request.data['username'])

        new = Review()
        new.user = user
        new.movie = movie
        new.content = request.data['content']
        new.like = request.data['like']

        new.save()

        data = {
            'data': 'success'
        }

        return Response(data, status=status.HTTP_201_CREATED)


# 리뷰를 업데이트하는 함수
@api_view(['PUT'])
def update_review(request, review_id):
    pass
    
@api_view(['GET'])
def winner(request):
    movies = Movie.objects.order_by('-vote')[:10]

    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_genres(request):
    genres = Genre.objects.all()
    serializers = GenreSerializer(genres, many=True)

    return Response(serializers.data)


@api_view(['POST'])
def like_genres(request):
    genre = Genre.objects.get(pk=request.GET.get('genre'))
    user = User.objects.get(username=request.GET.get('username'))

    if user.liked_genre.filter(pk=genre.pk).exists():
        user.liked_genre.remove(genre)
    else:
        user.liked_genre.add(genre)

    serializer = UserSerializer(user)

    return Response(serializer.data)


# 영화 좋아요, 싫어요, 이미 봤어요 추가 및 제거
@api_view(['POST'])
def select(request, movie_pk):
    user = User.objects.get(username=request.GET.get('username'))
    movie = Movie.objects.get(pk=movie_pk)

    # 1은 좋아요, 2는 싫어요, 3은 이미 봤어요
    if request.GET.get('type') == '1':
        if user.wished_to_movies.filter(pk=movie_pk).exists():
            user.wished_to_movies.remove(movie)
        elif not user.disliked_movies.filter(pk=movie_pk).exists():
            user.wished_to_movies.add(movie)

        movies = user.wished_to_movies.all()
        serializers = MovieSerializer(movies, many=True)

    elif request.GET.get('type') == '2':
        if user.disliked_movies.filter(pk=movie_pk).exists():
            user.disliked_movies.remove(movie)
        elif not user.wished_to_movies.filter(pk=movie.pk).exists():
            user.disliked_movies.add(movie)

        movies = user.disliked_movies.all()
        serializers = MovieSerializer(movies, many=True)

    else:
        if user.watched_movies.filter(pk=movie_pk).exists():
            user.watched_movies.remove(movie)
        else:
            user.watched_movies.add(movie)

        movies = user.watched_movies.all()
        serializers = MovieSerializer(movies, many=True)

    return Response(serializers.data)


@api_view(['POST'])
def add_score(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    movie.vote += 1
    movie.save()

    data = {
        'data': 'success',
    }

    return Response(data, status=status.HTTP_200_OK)