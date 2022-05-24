from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Comment


User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username', 'profile_image', 'name')

    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('pk', 'user', 'content', 'article', 'created_at')
        read_only_fields = ('article', )
        depth = 1



class ArticleSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username', 'name', 'profile_image')

    comments = CommentSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    like_users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Article
        fields = ('pk', 'user', 'title', 'content', 'comments', 'like_users', 'created_at', 'shared_poster')



class ArticleListSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    user = UserSerializer(read_only=True)
    
    comment_count = serializers.IntegerField()
    like_count = serializers.IntegerField()

    class Meta:
        model = Article
        fields = ('pk', 'user', 'title', 'comment_count', 'like_count', 'content')




