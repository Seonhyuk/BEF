from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile),
    path('nickname/<str:nickname>/', views.nickname),
    path('signup_plus/<str:username>/<str:nickname>/', views.signup_plus),
    path('follow/<str:my_name>/<str:your_name>/', views.follow),
]
