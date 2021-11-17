from django.contrib.auth.models import User
from rest_framework import fields
from rest_framework.fields import CurrentUserDefault
from rest_framework import serializers
from dj_rest_auth.models import TokenModel

class token_serializer(serializers.ModelSerializer):

    class Meta:
        model = TokenModel
        fields = [
            'key',
        ]