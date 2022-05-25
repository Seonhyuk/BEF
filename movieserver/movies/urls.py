from django.urls import path
from . import views

urlpatterns = [
    path('now_playing/', views.now_playing),
    path('last_year/', views.last_year_showing),
    path('winner/', views.winner),
    path('recommend/<str:username>/', views.recommend),
    path('worldcup/<int:exponent>/<str:username>/', views.worldcup),
    path('matchup/<int:exponent>/', views.match_up),
    path('search/<str:query>/', views.search_movie),
    path('<int:movie_id>/', views.detail),
    path('<int:movie_id>/reviews/', views.get_movie_review),
    path('genres/', views.get_genres),
    path('like_genre/', views.like_genres),
    path('select/<int:movie_pk>/', views.select),
    path('add_vote/<int:movie_pk>/', views.add_score),
    path('delete_review/<int:review_id>/', views.delete_review),
]
