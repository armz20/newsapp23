from django.urls import path, include
from django.urls import path, include
from . import views
from .views import CommentViewSet, FollowViewSet, LikeViewSet, PostViewSet, DmViewSet, SearchPostViewSet, UserViewSet, SearchUserViewSet

from .views import CommentViewSet, PostViewSet, DmViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('posts', PostViewSet, basename='posts')
router.register('messages', DmViewSet, basename='messages')
router.register('comments', CommentViewSet, basename='comments')
router.register('users', UserViewSet, basename='users')
router.register('like', LikeViewSet, basename='like')
router.register('follow', FollowViewSet, basename='follow')


urlpatterns = [
    path('', include(router.urls)),
    path('searchUser/', SearchUserViewSet.as_view()),
    path('searchPost/', SearchPostViewSet.as_view()),
    path('register/', views.registerPage, name="register"),
]

