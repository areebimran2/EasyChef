from django.contrib import admin

# Register your models here.
from recipes.models import Recipe, RecipeIngredient, Comment, Direction, ShoppingList

admin.site.register(Recipe)
admin.site.register(RecipeIngredient)
admin.site.register(Comment)
admin.site.register(Direction)
admin.site.register(ShoppingList)
