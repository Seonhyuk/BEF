from django.shortcuts import render, get_list_or_404, get_object_or_404

from django.contrib.auth import get_user_model
from django.views.decorators.http import require_http_methods, require_POST

from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from yaml import serialize
from .serializers import UserSerializer


from .models import User

# 팔로우
@require_POST
def follow(request, user_pk):
    pass

@api_view(['GET'])
def profile(request):
    user = User.objects.get(username=request.GET.get('username'))
    serializer = UserSerializer(user)
    return Response(serializer.data)