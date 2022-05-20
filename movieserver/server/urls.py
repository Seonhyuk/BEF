from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/movies/', include('movies.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/community/', include('community.urls')),
    # 로그인 경로
    path('api/accounts/', include('dj_rest_auth.urls')),
    # 가입 경로
    path('api/accounts/signup/', include('dj_rest_auth.registration.urls')),
]
