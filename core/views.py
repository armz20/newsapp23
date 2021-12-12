from django.http import JsonResponse
from django.contrib.auth.models import AnonymousUser, User
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from .serializers import comment_serializer, dm_serializer, follow_serializer, like_serializer, post_serializer, user_serializer
from .models import Comment, DirectMessage, Follow, Like, Post
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
from rest_framework import mixins, serializers, status, viewsets, generics, filters
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly


def registerPage(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
    
    context = {'form':form}
    return render(request, 'signup.html', context)

"""
generic Base view for all of the social media elements
"""
class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        obj = self.get_queryset().get(pk=kwargs['pk'])
        if request.user == obj.owner or request.user.is_superuser:
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        obj = self.get_queryset().get(pk=kwargs['pk'])
        if request.user == obj.owner:
            return super().update(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


class PostViewSet(BaseViewSet):
    serializer_class = post_serializer
    queryset = Post.objects.all()

    @action(detail=False,
            methods=['get'],
            name='Followed Users',
            url_path='followedusers')
    def followed_posts(self, request, *args, **kwargs):
        following = Follow.objects.filter(follower=request.user)
        self.queryset = Post.objects.none()
        for follow in following:
            self.queryset |= Post.objects.filter(owner=follow.followed)
        self.queryset |= Post.objects.filter(owner=request.user)
        self.queryset.order_by('created')
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    @action(detail=False,
            methods=['get'],
            name='User Posts',
            url_path='user/(?P<id>[^/.]+)')
    def by_post(self, request, id=None):
        self.queryset = self.queryset.filter(owner=id)
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)


class DmViewSet(BaseViewSet):
    serializer_class = dm_serializer
    queryset = DirectMessage.objects.all()

    def list(self, request, *args, **kwargs):
        if(not request.user.is_anonymous):
            self.queryset = self.queryset.filter(Q(owner=request.user) | Q(receiver=request.user))
            self.queryset = self.queryset.order_by('created')
            return super().list(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CommentViewSet(BaseViewSet):
    serializer_class = comment_serializer
    queryset = Comment.objects.all()

    # Replaces old commentsbypost, the new url is ../comments/bypost/<id>
    @action(detail=False,
            methods=['get'],
            name='Comment By Post',
            url_path='bypost/(?P<id>[^/.]+)')
    def bypost(self, request, id=None):
        comments = self.queryset.filter(comment_on=id)
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    serializer_class = user_serializer
    queryset = User.objects.all()
    @action(detail=False, methods=['get'], name='Current User')
    def currentuser(self, request):
        user = request.user
        if user == AnonymousUser:
            return Response(status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(user, many=False)
        return Response(serializer.data)


class LikeViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.DestroyModelMixin):
    serializer_class = like_serializer
    queryset = Like.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False,
            methods=['get'],
            name='Like By Post',
            url_path='bypost/(?P<id>[^/.]+)')
    def by_post(self, request, id=None):
        likes = self.queryset.filter(post=id)
        serializer = self.get_serializer(likes, many=True)
        return Response(serializer.data)

    @action(detail=False,
            methods=['get'],
            name='Like By user',
            url_path='byuser/(?P<id>[^/.]+)')
    def by_user(self, request, id=None):
        likes = self.queryset.filter(like_by=id)
        serializer = self.get_serializer(likes, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        if request.user != AnonymousUser:
            try:
                self.queryset = self.queryset.filter(like_by=request.user)
                obj = self.queryset.get(post=Post.objects.get(pid=kwargs['pk']))
                obj.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)



class FollowViewSet(viewsets.GenericViewSet,
                    mixins.CreateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin):
    serializer_class = follow_serializer
    queryset = Follow.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'], url_path='byuser/(?P<id>[^/.]+)')
    def by_user(self, request, id=None):
        likes = self.queryset.filter(follower=id)
        serializer = self.get_serializer(likes, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        if request.user != AnonymousUser:
            obj = Follow.objects.get(followed=kwargs['pk'], follower=request.user)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    def destroy(self, request, *args, **kwargs):
        if request.user != AnonymousUser:
            try:
                self.queryset = self.queryset.filter(follower=request.user)
                obj = self.queryset.get(followed=User.objects.get(pk=kwargs['pk']))
                obj.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


class SearchUserViewSet(generics.ListAPIView):
    search_fields = ['username']
    filter_backends = (filters.SearchFilter,)
    queryset = User.objects.all()
    serializer_class = user_serializer


class SearchPostViewSet(generics.ListAPIView):
    search_fields = ['caption']
    filter_backends = (filters.SearchFilter,)
    queryset = Post.objects.all()
    serializer_class = post_serializer

