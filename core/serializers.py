from django.contrib.auth.models import User
from rest_framework import fields
from rest_framework.fields import CurrentUserDefault
from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from .models import Follow


class token_serializer(serializers.ModelSerializer):

    class Meta:
        model = TokenModel
        fields = [
            'key',
        ]

class user_serializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    def get_id(self, obj):
            return obj.pk

    def get_username(self, obj):
        return obj.username

    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]



class follow_serializer(serializers.ModelSerializer):
    follower = serializers.HiddenField(default=CurrentUserDefault())
    follower_id = serializers.SerializerMethodField()
    followed_username = serializers.SerializerMethodField()

    def get_follower_id(self, obj):
        return obj.follower.id

    def get_followed_username(self, obj):
        return obj.followed.username

    class Meta:
        model = Follow
        fields = [
            'follower',
            'follower_id',
            'followed',
            'followed_username',
        ]
