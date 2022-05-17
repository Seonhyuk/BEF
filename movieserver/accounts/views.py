from django.shortcuts import render, get_list_or_404, get_object_or_404

from django.contrib.auth import get_user_model
from django.views.decorators.http import require_http_methods, require_POST

from django.http import JsonResponse


# 팔로우
@require_POST
def follow(request, user_pk):
    pass