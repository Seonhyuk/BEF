from django.urls import path
from . import views

urlpatterns = [
    path('now_playing/', views.now_playing),
    path('last_year/', views.last_year_showing),
    path('recommend/<str:username>/', views.recommend),
    path('worldcup/<int:exponent>/<str:username>/', views.worldcup),
    path('matchup/<int:exponent>/', views.match_up),
    
]
