import base64

import pprint

from django.shortcuts import render, get_list_or_404, get_object_or_404

from django.contrib.auth import get_user_model
from django.views.decorators.http import require_http_methods, require_POST

from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer


from .models import User

# 팔로우
@api_view(['POST'])
def follow(request, my_name, your_name):
    user = get_object_or_404(User, username=my_name)
    you = get_object_or_404(User, username=your_name)

    if user != you:
        if user.followings.filter(username=your_name).exists():
            user.followings.remove(you)
        else:
            user.followings.add(you)

    data = {
        'data': 'success',
    }
    
    return Response(data, status=status.HTTP_200_OK)
    

@api_view(['GET'])
def profile(request):
    user = User.objects.get(username=request.GET.get('username'))
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def nickname(request, nickname):
    if User.objects.filter(name=nickname).exists():
        data = {
            'data': True
        }
    else:
        data = {
            'data': False
        }
    
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def signup_plus(request, username, nickname):
    user = User.objects.get(username=username)
    user.name = nickname
    user.profile_image = request.data['image']
    user.save()

    data = {
        'user': 'created'
    }
    return Response(data, status=status.HTTP_201_CREATED)
