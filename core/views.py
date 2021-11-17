from django.http import JsonResponse
from django.contrib.auth.models import AnonymousUser, User
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import mixins, serializers, status, viewsets, generics, filters
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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