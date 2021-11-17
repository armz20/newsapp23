from django.core import validators
from django.db import models
from django.contrib.auth.models import User
from django.utils.html import mark_safe
from rest_framework.exceptions import ValidationError

class OwnedModel(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract=True