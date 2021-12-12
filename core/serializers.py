from django.contrib.auth.models import User
from rest_framework import fields
from rest_framework.fields import CurrentUserDefault
from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from .models import DirectMessage, Follow, Like, Post, Comment, RecipePost


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


class dm_serializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField()
    receiver_username = serializers.SerializerMethodField()

    owner = serializers.HiddenField(default=CurrentUserDefault())

    def get_sender_username(self, obj):
        return obj.owner.username

    def get_receiver_username(self, obj):
        return obj.receiver.username

    class Meta:
        model = DirectMessage
        fields = [
            'did',
            'owner',
            'receiver',
            'message',
            'receiver_username',
            'sender_username',
            'created',
        ]


class like_serializer(serializers.ModelSerializer):
    like_by_id = serializers.SerializerMethodField()
    like_by = serializers.HiddenField(default=CurrentUserDefault())

    def get_like_by_id(self, obj):
        return obj.like_by.id

    class Meta:
        model = Like
        fields = [
            'like_by',
            'like_by_id',
            'post',
        ]


class post_serializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    poster = serializers.SerializerMethodField()
    owner = serializers.HiddenField(default=CurrentUserDefault())
    likes = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.owner.username

    def get_poster(self, obj):
        return obj.owner.id

    def get_likes(self, obj):
        post_likes = Like.objects.filter(post=obj.pid)
        return like_serializer(post_likes, many=True).data

    class Meta:
        model = Post
        fields = [
            'pid',
            'username',
            'poster',
            'caption',
            'Image',
            'likes',
            # HiddenField
            'owner',
        ]


class comment_serializer(serializers.ModelSerializer):
    commenter_username = serializers.SerializerMethodField()
    commenter = serializers.SerializerMethodField()
    owner = serializers.HiddenField(default=CurrentUserDefault())

    def get_commenter_username(self, obj):
        return obj.owner.username

    def get_commenter(self, obj):
        return obj.owner.id

    class Meta:
        model = Comment
        fields = [
            'cid',
            'text',
            'owner',
            'comment_on',
            'commenter',
            'commenter_username',
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


class recipe_post_serializer(post_serializer):
    class Meta:
        model = RecipePost
        fields = '__all__'
