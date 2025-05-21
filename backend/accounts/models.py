from dataclasses import Field

from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    phone_number = PhoneNumberField(max_length=20, blank=True)
    shopping_list = models.ManyToManyField('recipes.Recipe', related_name='shopping_list')

    favourite_list = models.ManyToManyField('recipes.Recipe', blank=True,
                                            related_name='favourites_user')
    history_list = models.ManyToManyField('recipes.Recipe', blank=True,
                                          related_name='history_user',
                                          through='InteractedWith')

    def __str__(self):
        return self.username


# New table that relates each user to recipes they have interacted with
# provides extra information for each Recipe in the history list
class InteractedWith(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    recipe = models.ForeignKey('recipes.Recipe', on_delete=models.CASCADE,
                               null=True)
    last_interaction = models.DateTimeField(auto_now_add=True)
    liked = models.BooleanField(default=False)
    rating = models.IntegerField(default=-1)

    in_favourites = models.BooleanField(default=False)
    in_shopping_list = models.BooleanField(default=False)

