import requests
import random
from datetime import datetime

from django.shortcuts import render, get_list_or_404, get_object_or_404

from .serializers import MovieSerializer, ReviewSerializer

from .models import Movie, Genre, Review
from accounts.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from collections import deque


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
    
    serializer = MovieSerializer(result, many=True)

    return Response(serializer.data)


# 작년 이맘 때 한 영화
@api_view(['GET'])
def last_year_showing(request):
    today = datetime.today()
    last_year = today.year - 1
    month = today.month

    movies = list(Movie.objects.filter(release_date__year=f'{last_year}', release_date__month=f'{month}'))[:20]

    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)


# 영화 추천 함수
@api_view(['GET'])
def recommend(request, username):
    user = User.objects.get(username=username)
    genres = list(user.liked_genre.all())

    movies = []

    for genre in genres:
        genre_movies = Movie.objects.filter(genres=genre).order_by('-vote_average')
        movies.append(list(genre_movies))

    if not movies:
        movies = list(Movie.objects.order_by('vote_average'))
    
    recommend = []

    while len(recommend) < 20:
        if len(genres) > 0:
            for i in range(len(genres)):
                for j in range(len(movies[i])):
                    m = movies[i][j]
                    if m.popularity < 2:
                        continue

                    if user.watched_movies.filter(pk=m.pk).exist() or user.wished_to_movies.filter(pk=m.pk).exists() or user.disliked_movies.filter(pk=m.pk).exists() or m.pk in user.recently_recommended_movies or m in recommend:
                        continue
                    else:
                        recommend.append(m)
                        user.recently_recommended_movies.append(m.pk)
                        if len(user.recently_recommended_movies) > 200:
                            user.recently_recommended_movies.popleft()
                        break
        else:
            for i in range(movies):
                m = movies[i]
                if m.popularity < 2:
                    continue

                if user.watched_movies.filter(pk=m.pk).exists() or user.wished_to_movies.filter(pk=m.pk).exists() or user.disliked_movies.filter(pk=m.pk).exists() or m.pk in user.recently_recommended_movies or m in recommend:
                    continue
                else:
                    recommend.append(m)
                    user.recently_recommended_movies.append(m.pk)
                    if len(user.recently_recommended_movies) > 200:
                        user.recently_recommended_movies.popleft()

                if len(recommend) == 20:
                    break
    
    serializer = MovieSerializer(recommend, many=True)

    return Response(serializer.data)


# 월드컵 기능 중 영화 반환 함수
@api_view(['GET'])
def worldcup(request, exponent, username):
    user = User.objects.get(username=username)
    
    watched_movie = list(user.watched_movies.order_by('-popularity')[:200])
    popular_movie = list(Movie.objects.filter(popularity__gte=20, vote_average__gte=7).order_by('-popularity')[:200])

    movie = Movie.objects.get(title='రౌద్రం రణం రుధిరం')
    popular_movie.remove(movie)

    random.shuffle(watched_movie)
    random.shuffle(popular_movie)

    tournament = []

    switch = False
    w_idx, p_idx = 0, 0
    for i in range(2**exponent):
        if switch and w_idx < len(watched_movie):
            while watched_movie[w_idx] in tournament:
                w_idx += 1
            
            if w_idx < len(watched_movie):
                tournament.append(watched_movie[w_idx])
                w_idx += 1
            
            switch = not switch
        else:
            while popular_movie[p_idx] in tournament:
                p_idx += 1

            tournament.append(popular_movie[p_idx])
            p_idx += 1

            switch = not switch
    
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

    response = request.get(URL, params=params).json()['results']

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

    m.sort(lambda x: -x['popularity'])

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
@api_view(['GET'])
def get_movie_review(request, movie_id):
    movie = Movie.objects.get(pk=movie_id)
    reviews = Review.objects.filter(movie=movie)
    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data)


# 리뷰를 추가하는 함수
@api_view(['POST'])
def add_review(request, username, movie_id):
    pass


# 리뷰를 업데이트하는 함수
@api_view(['PUT'])
def update_review(request, review_id):
    pass