import datetime

from django.shortcuts import render, get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
# Create your views here.
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, \
    UpdateAPIView
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from recipes.models import *
from recipes.serializers import *

from recipes.paginations import FivePagination
from accounts.models import CustomUser, InteractedWith
from rest_framework import serializers


# recipes/all/

class RecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    pagination_class = FivePagination

    def get_queryset(self):
        return Recipe.objects.all().order_by('-num_likes')


def add_to_history(recipe, user):
    if recipe in user.history_list.all():
        found = InteractedWith.objects.get(user=user, recipe=recipe)
        found.last_interaction = datetime.datetime.now()
        found.save()
    else:
        user.history_list.add(recipe)


# Add new recipe
class AddRecipe(CreateAPIView):
    serializer_class = AddRecipeSerializer
    permission_classes = [IsAuthenticated]


# recipes/recipe/id/
# view a recipe
class RecipeView(RetrieveAPIView):
    serializer_class = RecipeSerializer

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        if self.request.user.is_authenticated:
            add_to_history(recipe, self.request.user)
        return recipe


# edit using PATCH / PUT request
# recipes/recipe/id/edit
class RecipeEdit(UpdateAPIView):
    serializer_class = EditRecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        user_id = self.request.user.id
        if user_id != recipe.creator.id:
            raise serializers.ValidationError('current user is not the creator of this recipe')
        add_to_history(recipe, self.request.user)
        return recipe


class RecipeDelete(ListAPIView):
    """
    recipes/recipe/id/delete/
    """
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        if user_id != recipe.creator.id:
            raise serializers.ValidationError('current user is not the creator of this recipe')
        recipe.directions.all().delete()  # directions are unique to each recipe so can delete them
        recipe.ingredients.all().delete()
        recipe.delete()
        return Recipe.objects.all()


# recipes/recipe/id/base-recipe
# view base recipe -> redirect to base recipe
class BaseRecipeView(RetrieveAPIView):
    serializer_class = RecipeSerializer

    def get_object(self):
        curr_recipe = get_object_or_404(Recipe, id=self.kwargs['id'])

        if curr_recipe.base_recipe:
            if self.request.user.is_authenticated:
                add_to_history(curr_recipe.base_recipe, self.request.user)
            return curr_recipe.base_recipe  # return null
        if self.request.user.is_authenticated:
            add_to_history(curr_recipe, self.request.user)
        return curr_recipe  # return curr recipe if no base recipe found


# recipes/recipe/id/use-base-recipe/
# use as base
class UseBaseRecipe(CreateAPIView, RetrieveAPIView):
    serializer_class = AddRecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        add_to_history(recipe, self.request.user)
        return recipe

    def get_serializer_context(self):
        return {"id": self.kwargs['id'], "request": self.request}


class EditServingSize(UpdateAPIView):
    """
    recipes/recipe/id/change-serving-size/
    """
    serializer_class = EditServingSizeSerializer

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        if self.request.user.is_authenticated:
            add_to_history(recipe, self.request.user)
        return recipe


class AddDirection(CreateAPIView):
    """
    recipes/recipe/id/add-directions/
    need to create recipe first then add directions
    """
    serializer_class = DirectionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        user_id = self.request.user.id
        if user_id != recipe.creator.id:
            raise serializers.ValidationError('current user is not the creator of this recipe')
        serializer.save()
        recipe.directions.add(serializer.data['id'])
        add_to_history(recipe, self.request.user)


class EditDirection(UpdateAPIView, RetrieveAPIView):
    """
    recipes/recipe/id/edit-directions/num/
    """
    serializer_class = DirectionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        user_id = self.request.user.id
        if user_id != recipe.creator.id:
            raise serializers.ValidationError('current user is not the creator of this recipe')
        direction = get_object_or_404(Direction, id=self.kwargs['num'])
        add_to_history(recipe, self.request.user)
        return direction

class DeleteDirection(UpdateAPIView):
    serializer_class = RecipeSerializer

    def get_object(self):
        print('recipe')
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        print('direction', self.kwargs['num'])
        direction = get_object_or_404(Direction, id=self.kwargs['num'])
        direction.delete()
        return recipe

# <str:username>/created-recipes/
# View all the created recipes by a certain creator (or the current logged-in user)
class CreatedRecipesView(ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        user = self.request.user
        valid_user = get_object_or_404(CustomUser,
                                       username=self.kwargs['username'])
        username = self.kwargs['username']
        return Recipe.objects.filter(creator__username=valid_user.username)


# Search all the recipes based off certain criteria
# Search by recipe name, ingredients, creators
# Filter by cooking time, diet, and cuisine
# Sort by overall rating or number of favourites
class SearchRecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    pagination_class = FivePagination
    queryset = Recipe.objects.all()
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    search_fields = ('name', 'ingredients__name', 'creator__username')
    filterset_fields = {'cuisine': ['exact', 'contains'],
                        'diet': ['exact', 'contains'],
                        'cooking_time': ['gt', 'lt', 'gte', 'lte', 'range'],
                        'prep_time': ['gt', 'lt', 'gte', 'lte', 'range']}
    ordering_fields = ('ave_rating', 'num_fav')


class AddCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    # Implement current logged in author as the user
    # Implement current recipe as the recipe

class ViewRecipeComment(ListAPIView):
    serializer_class = CommentSerializer
    def get_queryset(self):
        recipe_id = self.kwargs['id']
        return Comment.objects.filter(recipe=recipe_id)


class AddShoppingListView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ShoppingListSerializer

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['id'])


class RemoveShoppingListView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RemoveShopListSerializer

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['id'])


class ShoppingListView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ShopListIngSerializer

    def get_object(self):
        user = self.request.user
        valid_user = get_object_or_404(CustomUser, id=user.id)
        instance = get_object_or_404(ShoppingList, user=valid_user)
        return instance


class AddFavouriteView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddFavouritesSerializer

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        add_to_history(recipe, self.request.user)
        return recipe


class RemoveFavouriteView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DeleteFavouritesSerializer

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        add_to_history(recipe, self.request.user)
        return recipe


class AddLikeView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddLikeSerializer

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        add_to_history(recipe, self.request.user)
        return recipe


class RemoveLikeView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DeleteLikeSerializer

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        add_to_history(recipe, self.request.user)
        return recipe


class RatingView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RatingSerializer

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['id'])
        add_to_history(recipe, self.request.user)
        return recipe
