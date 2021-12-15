from django.http import JsonResponse
from django.contrib.auth.models import AnonymousUser, User
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
from .serializers import follow_serializer, user_serializer
from .models import Follow
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm, UpdateUserForm
from rest_framework import mixins, serializers, status, viewsets, generics, filters
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from localStoragePy import localStoragePy
from django.contrib.auth.decorators import login_required



def registerPage(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, "Account was created for " + user)
    
    context = {'form':form}
    return render(request, 'signup.html', context)

def loginPage(request):
            
    context = {}
    return render(request, 'signin.html', context)


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

@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UpdateUserForm(request.POST, instance=request.user)

        if user_form.is_valid():
            user_form.save()
            messages.success(request, 'Your profile is updated successfully')
            return redirect(to='/profile')
    else:
        user_form = UpdateUserForm(instance=request.user)

    return render(request, 'updateuser.html', {'user_form': user_form,})