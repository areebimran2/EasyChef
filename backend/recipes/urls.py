from django.urls import path

from recipes.views import *



urlpatterns = [
    path('all/', RecipesView.as_view()),
    path('add/', AddRecipe.as_view()),
    path('recipe/<int:id>/', RecipeView.as_view()),
    path('recipe/<int:id>/base-recipe/', BaseRecipeView.as_view()),
    path('recipe/<int:id>/edit/', RecipeEdit.as_view()),
    path('recipe/<int:id>/use-base-recipe/', UseBaseRecipe.as_view()),
    path('<str:username>/created-recipes/', CreatedRecipesView.as_view()),
    path('search/', SearchRecipesView.as_view()),
    path('recipe/<int:id>/delete/', RecipeDelete.as_view()),
    path('recipe/<int:id>/edit-serving-size/', EditServingSize.as_view()),
    path('recipe/<int:id>/add-directions/', AddDirection.as_view()),
    path('recipe/<int:id>/edit-directions/<int:num>/', EditDirection.as_view()),
    path('recipe/<int:id>/add-comment/', AddCommentView.as_view()),
    path('recipe/<int:id>/shopping-list/add/', AddShoppingListView.as_view()),
    path('recipe/<int:id>/shopping-list/remove/', RemoveShoppingListView.as_view()),
    path('shoppinglist/', ShoppingListView.as_view()),
    path('recipe/<int:id>/add-favourite/', AddFavouriteView.as_view()),
    path('recipe/<int:id>/remove-favourite/', RemoveFavouriteView.as_view()),
    path('recipe/<int:id>/add-like/', AddLikeView.as_view()),
    path('recipe/<int:id>/remove-like/', RemoveLikeView.as_view()),
    path('recipe/<int:id>/rate/', RatingView.as_view()),
    path('recipe/<int:id>/comments/', ViewRecipeComment.as_view())
]
