from django.db import models
from django.db.models import SET_NULL
from django.utils.translation import gettext_lazy as _
from accounts.models import CustomUser
from multiselectfield import MultiSelectField
from ckeditor.fields import *


class RecipeIngredient(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=100)
    quantity = models.FloatField(default=0, blank=True, null=True)

    class Units(models.TextChoices):
        NONE = 'NONE', _('None')
        CUPS = 'CUPS', _('cup(s)')
        TSP = 'TSP', _('teaspoon(s)')
        TBSP = 'TBSP', _('tablespoon(s)')
        POUND = 'POUND', _('pound(s)')

    units = models.CharField(max_length=5, choices=Units.choices, default=Units.NONE)

    def __str__(self):
        return f'{self.quantity} {self.units} {self.name}'


class Direction(models.Model):
    objects = models.Manager()
    id = models.AutoField(primary_key=True, editable=False)
    description = models.TextField()
    file = models.FileField(upload_to='recipe_pictures/', null=True, blank=True)


# Create your models here.
class Recipe(models.Model):
    objects = models.Manager()

    class Cuisines(models.TextChoices):
        NONE = 'NONE', _('None')
        CHINESE = 'CN', _('Chinese')
        CREOLE = 'CR', _('Creole')
        FRENCH = 'FR', _('French')
        INDIAN = 'IN', _('Indian')
        ITALIAN = 'IT', _('Italian')
        JAPANESE = 'JP', _('Japanese')
        KOREAN = 'KO', _('Korean')
        MIDDLE_EAST = 'ME', _('Middle East')
        WESTERN = 'WE', _('Western')

    class Diets(models.TextChoices):
        NONE = 'NONE', _('None')
        VEGAN = 'VEGAN', _('Vegan')
        VEG = 'VEG', _('Vegeterian')
        GLUTEN_FREE = 'GLUTENF', _('Gluten free')
        LOW_CARB = 'LCARB', _('Low carb')
        KETO = 'KT', _('Keto')
        LOW_FAT = 'LF', _('Low fat')

    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200)
    cuisine = models.CharField(max_length=4, choices=Cuisines.choices, default=Cuisines.NONE)
    diet = MultiSelectField(max_length=100, choices=Diets.choices, default=Diets.NONE)
    cooking_time = models.PositiveIntegerField(default=0)
    prep_time = models.PositiveIntegerField(default=0)
    serving_size = models.PositiveIntegerField(default=1)
    base_recipe = models.ForeignKey('self', on_delete=SET_NULL, null=True, blank=True, related_name='baseRecipe') #FK to recipe
    creator = models.ForeignKey(to=CustomUser, on_delete=SET_NULL, null=True, blank=True) #FK to customer User
    ingredients = models.ManyToManyField(RecipeIngredient)
    ingredients_list = models.TextField(default='')
    directions = models.ManyToManyField(Direction)
    num_fav = models.PositiveIntegerField(default=0)
    num_likes = models.PositiveIntegerField(default=0)
    ave_rating = models.PositiveIntegerField(default=0)
    picture = models.ImageField(upload_to='recipe_pictures/', null=True, blank=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    objects = models.Manager()

    recipe = models.ForeignKey(to=Recipe, on_delete=SET_NULL, null=True, blank=True, related_name='comments')
    author = models.ForeignKey(to=CustomUser, on_delete=SET_NULL, null=True, blank=True)
    heading = models.CharField(max_length=100)
    content = RichTextField(null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    #def __str__(self):
    #    return 'Comment by {} on {}'.format(self.author.username, self.date_added.strftime("%d-%m-%Y %H:%M:%S"))

    def __str__(self):
        return 'Comment made ' + self.date_added.strftime("%d-%m-%Y %H:%M:%S")


class ShoppingList(models.Model):
    objects = models.Manager()
    user = models.ForeignKey(to=CustomUser, on_delete=SET_NULL, null=True, blank=True)
    list_ingredients = models.ManyToManyField(RecipeIngredient)

    def __str__(self):
        return f'shopping list of {self.user}'





