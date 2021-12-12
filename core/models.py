from django.core import validators
from django.db import models
from django.contrib.auth.models import User
from django.utils.html import mark_safe
from rest_framework.exceptions import ValidationError

'''
Abstract class for Social Media objects
'''
class OwnedModel(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract=True


class DirectMessage(OwnedModel):
    did = models.AutoField(primary_key=True)
    receiver = models.ForeignKey(User, related_name='receiver', on_delete=models.CASCADE)
    message = models.CharField(max_length=1000)

    def __str__(self):
        return self.message


class Post(OwnedModel):
    pid = models.AutoField(primary_key=True)
    caption = models.TextField()
    Image = models.ImageField(upload_to='post_images', null=True, default=None)

    def __str__(self):
        return self.caption


class Comment(OwnedModel):
    cid = models.AutoField(primary_key=True)
    text = models.CharField(max_length=1000)
    comment_on = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return self.text


class RecipePost(Post):
    instuctions = models.TextField()


class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=200)
    calorie_density = models.FloatField()

    def __str__(self):
        return self.ingredient_name

'''
Tracks how much of a given ingredient is used in a recipe
'''
class IngredientUsed(models.Model):
    used_in = models.ForeignKey(RecipePost, on_delete=models.CASCADE)
    used = models.FloatField()
    label = models.TextField(null=True)
    Ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)


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


class Like(models.Model):
    like_by = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='post', on_delete=models.CASCADE)

    class Meta:
        unique_together = (('like_by', 'post'),)
