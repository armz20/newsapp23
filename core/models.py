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


class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)
    followed = models.ForeignKey(User, related_name='followed', on_delete=models.CASCADE)

    def clean(self):
        if self.followed == self.follower:
            raise ValidationError('User cannot follow themselves')

    def save(self, *args, **kwargs):
        self.clean()
        return super().save(*args, **kwargs)

    class Meta:
        unique_together = (('follower', 'followed'),)
