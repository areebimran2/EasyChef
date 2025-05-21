import datetime

from django.db.models import Q
from rest_framework import serializers, fields
from recipes.models import Recipe, RecipeIngredient, Direction, Comment, ShoppingList
from accounts.models import CustomUser, InteractedWith
from django.shortcuts import get_object_or_404


def add_to_history(recipe, user):
    if recipe in user.history_list.all():
        found = InteractedWith.objects.get(user=user, recipe=recipe)
        found.last_interaction = datetime.datetime.now()
        found.save()
    else:
        user.history_list.add(recipe)


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ['quantity', 'units', 'name']


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ['id', 'description', 'file']


# view recipe
class RecipeSerializer(serializers.ModelSerializer):
    creator = serializers.CharField()
    ingredients = IngredientSerializer(many=True)
    directions = DirectionSerializer(many=True)
    # base_recipe = serializers.CharField()

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'cuisine', 'diet', 'cooking_time', 'prep_time', 'serving_size', 'directions', 'ingredients', 'ingredients_list',
                  'base_recipe', 'creator', 'num_fav', "num_likes", "ave_rating", "picture"]


class AddRecipeSerializer(serializers.ModelSerializer):
    diet = fields.MultipleChoiceField(choices=Recipe.Diets)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'cuisine', 'diet', 'cooking_time', 'prep_time', 'serving_size', 'ingredients_list',
                  'base_recipe', 'creator', 'picture', 'num_likes', 'num_fav', 'ave_rating']

    def create(self, validated_data):
        """
        input from textfield = "1 cup flour\n1 cup milk\n2 large eggs"
        ingredient_list = ["1 cup flour", "1 cup milk", "2 large eggs"]
        ingredient = ["1", "cup", "flour"]

        precondition:
            units = [cup, cups, tbsp, tsp, pound, pounds]
            quantity = float (no fractions)

        """
        if validated_data.get('name') is None:
            raise serializers.ValidationError('name is required')
        recipe = Recipe.objects.create(
            name=validated_data['name'],
            diet=validated_data['diet'],
        )
        if validated_data.get('ingredients_list') is None:
            raise serializers.ValidationError('list of ingredients is required')
        else:
            recipe.ingredients_list = validated_data['ingredients_list']
            ingredients_list = validated_data['ingredients_list'].split('\n')
            create_ingredient_objects(recipe, ingredients_list)

        if validated_data.get('cuisine'):
            recipe.cuisine = validated_data['cuisine']

        if validated_data.get('cooking_time'):
            recipe.cooking_time = validated_data['cooking_time']

        if validated_data.get('prep_time'):
            recipe.prep_time = validated_data['prep_time']

        if validated_data.get('picture'):
            recipe.picture = validated_data['picture']

        if validated_data.get('serving_size'):
            recipe.serving_size = validated_data['serving_size']

        curr_user = self.context['request'].user
        recipe.creator = get_object_or_404(CustomUser, id=curr_user.id)
        if 'id' in self.context:  # for use as base recipe
            recipe.base_recipe = get_object_or_404(Recipe, id=self.context['id'])
        recipe.save()
        add_to_history(recipe, self.context['request'].user)

        return recipe


class EditRecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'cuisine', 'diet', 'cooking_time','prep_time',
                  'serving_size', 'ingredients', 'ingredients_list', 'picture']

    def update(self, instance, validated_data):
        if validated_data.get('name'):
            instance.name = validated_data['name']

        if validated_data.get('cuisine'):
            instance.cuisine = validated_data['cuisine']

        if validated_data.get('diet'):
            instance.diet = validated_data['diet']

        if validated_data.get('cooking_time'):
            instance.cooking_time = validated_data['cooking_time']

        if validated_data.get('prep_time'):
            instance.prep_time = validated_data['prep_time']

        if validated_data.get('picture'):
            instance.picture = validated_data['picture']

        if validated_data.get('serving_size'):
            instance.serving_size = validated_data['serving_size']

        if validated_data.get('ingredients_list'):
            instance.ingredients_list = validated_data['ingredients_list']
            instance.ingredients.clear()
            ing_list = validated_data['ingredients_list'].split('\n')
            create_ingredient_objects(instance, ing_list)
        instance.save()
        return instance


def is_float(string):
    if string.replace(".", "").isnumeric():
        return True
    else:
        return False


def create_ingredient_objects(recipe, ingredients_list):
    """
    ingredients_list = ["1 cup flour", "1 cup milk", "2 large eggs"]
    """
    for ingredient in ingredients_list:
        ingredient = ingredient.split()
        name = ''
        unit = ''
        quantity = ingredient[0]
        if is_float(ingredient[0]) is False:
            name = ' '.join(ingredient)
            unit = ''
            quantity = None
        elif ingredient[1].lower() not in ['cup', 'cups', 'tbsp', 'tsp', 'pound', 'pounds']:
            name = ' '.join(ingredient[1:])
            unit = ''
        else:
            name = ' '.join(ingredient[2:])
            if ingredient[1].upper() in ['CUPS', 'CUP']:
                unit = 'CUPS'
            elif ingredient[1].upper() in ['POUND', 'POUNDS']:
                unit = 'POUND'
            else:
                unit = ingredient[1].upper()

        recipe.ingredients.create(
            name=name,
            quantity=quantity,
            units=unit
        )


class EditServingSizeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'serving_size', 'ingredients']

    def update(self, instance, validated_data):
        if 'serving_size' in validated_data:
            num = validated_data['serving_size']
            if instance.serving_size > 0:
                num = num / instance.serving_size
            for ingredient in instance.ingredients.all():
                if ingredient.quantity: # some ingredients don't have a quantity
                    ingredient.quantity = round(num * ingredient.quantity, 2)
                    ingredient.save()
            instance.serving_size = validated_data['serving_size']
            instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    author = None

    # recipe = None

    class Meta:
        model = Comment
        fields = ['heading', 'content', 'date_added', 'file']

    def create(self, validated_data):
        recipe_id = self.context.get('view').kwargs.get('id')
        author = self.context['request'].user
        recipe = get_object_or_404(Recipe, id=recipe_id)

        if not validated_data.get('heading'):
            raise serializers.ValidationError('A heading is required.')
        if not validated_data.get('content'):
            raise serializers.ValidationError('Comment body is required.')
        
        comment = Comment.objects.create(
            recipe=recipe,
            author=author,
            heading=validated_data['heading'],
            content=validated_data['content'],
        )
        if validated_data.get('file'):
            print('img----------------******')
            comment.file = validated_data['file']
            comment.save()
            
        add_to_history(recipe, self.context['request'].user)
        return comment


class ShoppingListSerializer(serializers.ModelSerializer):
    # shopping_list = RecipeSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id']

    def update(self, instance, validated_data):
        if instance in self.context['request'].user.shopping_list.all():
            raise serializers.ValidationError({'details': 'This recipe is already in the shopping list.'})
        self.context['request'].user.shopping_list.add(instance)

        add_to_history(instance, self.context['request'].user)
        found = InteractedWith.objects.get(user=self.context['request'].user, recipe=instance)
        found.in_shopping_list = True
        found.save()

        shoppinglist = None
        try:
            shoppinglist = ShoppingList.objects.get(user=self.context['request'].user)
        except ShoppingList.DoesNotExist:
            shoppinglist = ShoppingList.objects.create(
                user=self.context['request'].user
            )
            shoppinglist.save()
        for ingredient in instance.ingredients.all():
            s_list = shoppinglist.list_ingredients.all().values_list('name')
            exist = False
            for i, name in enumerate(s_list):
                if name[0] == ingredient.name:
                    exist = True
                    break

            if exist:
                existing_ing = shoppinglist.list_ingredients.all().get(name=ingredient.name)
                existing_ing.quantity = ingredient.quantity + existing_ing.quantity
                existing_ing.save()
            else:
                shoppinglist.list_ingredients.add(
                    RecipeIngredient.objects.create(
                        name=ingredient.name,
                        quantity=ingredient.quantity,
                        units=ingredient.units
                    )
                )

        return instance


class RemoveShopListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id']

    def update(self, instance, validated_data):
        if instance not in self.context['request'].user.shopping_list.all():
            raise serializers.ValidationError({'detail': 'This recipe has not been added to shopping list.'})
        self.context['request'].user.shopping_list.remove(instance)

        add_to_history(instance, self.context['request'].user)
        found = InteractedWith.objects.get(user=self.context['request'].user, recipe=instance)
        found.in_shopping_list = False
        found.save()

        shoppinglist = ShoppingList.objects.get(user=self.context['request'].user)
        for ingredient in instance.ingredients.all():
            existing_ing = shoppinglist.list_ingredients.all().get(name=ingredient.name)
            existing_ing.quantity -= ingredient.quantity
            existing_ing.save()
            if existing_ing.quantity == 0:
                shoppinglist.list_ingredients.remove(existing_ing)
                existing_ing.delete()
        return instance


class ShopListIngSerializer(serializers.ModelSerializer):
    list_ingredients = IngredientSerializer(many=True)

    class Meta:
        model = ShoppingList
        fields = ['list_ingredients']


class AddFavouritesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ['num_fav']

    def update(self, instance, validated_data):
        add_to_history(instance, self.context['request'].user)
        found = InteractedWith.objects.get(user=self.context['request'].user, recipe=instance)

        if found and found.in_favourites:
            raise serializers.ValidationError({'detail': 'This recipe has already been added to favourites.'})

        found.in_favourites = True
        instance.num_fav += 1
        instance.save()
        found.save()
        self.context['request'].user.favourite_list.add(instance)

        return instance


class DeleteFavouritesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ['num_fav']

    def update(self, instance, validated_data):
        add_to_history(instance, self.context['request'].user)
        found = InteractedWith.objects.get(user=self.context['request'].user, recipe=instance)

        if not found or not found.in_favourites:
            raise serializers.ValidationError({'detail': 'This recipe has not been added to favourites.'})

        found.in_favourites = False
        instance.num_fav -= 1
        instance.save()
        found.save()
        self.context['request'].user.favourite_list.remove(instance)

        return instance


class AddLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ['num_likes']

    def update(self, instance, validated_data):
        add_to_history(instance, self.context['request'].user)
        found = InteractedWith.objects.get(user=self.context['request'].user, recipe=instance)

        if found and found.liked:
            raise serializers.ValidationError({'detail': 'This recipe has already been liked.'})

        found.liked = True
        instance.num_likes += 1
        instance.save()
        found.save()

        return instance


class DeleteLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['num_likes']

    def update(self, instance, validated_data):
        add_to_history(instance, self.context['request'].user)
        found = InteractedWith.objects.get(user=self.context['request'].user, recipe=instance)

        if not found or not found.liked:
            raise serializers.ValidationError({'detail': 'This recipe has not been liked.'})

        found.liked = False
        instance.num_likes -= 1
        instance.save()
        found.save()

        return instance


class RatingSerializer(serializers.ModelSerializer):
    ave_rating = serializers.IntegerField(required=True)

    class Meta:
        model = Recipe
        fields = ['ave_rating']

    def validate_ave_rating(self, data):
        if data < 1 or data > 5:
            raise serializers.ValidationError('Rating must be an integer between 1 and 5 (inclusive).')
        return data

    def update(self, instance, validated_data):
        add_to_history(instance, self.context['request'].user)
        found = InteractedWith.objects.get(user=self.context['request'].user, recipe=instance)

        instance.ave_rating = 0
        found.rating = validated_data['ave_rating']
        found.save()
        recipes = InteractedWith.objects.filter(~Q(rating=-1), recipe=instance)

        for recipe in recipes:
            instance.ave_rating += recipe.rating

        instance.ave_rating = round(instance.ave_rating / recipes.count())
        instance.save()

        return instance

class RecipeInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteractedWith
        fields = ['last_interaction', 'liked', 'rating', 'in_favourites', 'in_shopping_list']