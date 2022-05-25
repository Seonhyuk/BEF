from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile),
    path('nickname/<str:nickname>/', views.nickname),
    path('signup_plus/<str:username>/<str:nickname>/', views.signup_plus),
    path('follow/<str:my_name>/<str:your_name>/', views.follow),
    path('profile_image/<str:username>/', views.change_profile_image),
    path('change_nickname/<str:username>/<str:new_nickname>/', views.change_nickname),
    path('delete_user/<str:username>/', views.delete_user),
    path('make_card/<str:username>/', views.make_card),
]
