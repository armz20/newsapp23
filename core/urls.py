from django.urls import path, include
from django.urls import path, include
from . import views
from .views import FollowViewSet, UserViewSet, SearchUserViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('follow', FollowViewSet, basename='follow')


urlpatterns = [
    path('', include(router.urls)),
    path('searchUser/', SearchUserViewSet.as_view()),
    path('register/', views.registerPage, name="register"),
    path('signin/', views.loginPage, name="login"),
    path('updateuser/', views.profile, name="updateuser"),
    path('newsf/', views.index, name="newsf"),

    


]

