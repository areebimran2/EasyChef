from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.views import MyRecipesView, ProfileEditView, ProfileView, \
    RegisterView, UserCreatedRecipesView, UserFavouriteRecipesView, \
    UserRecipeHistoryView, ShoppingListView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('profile/edit/', ProfileEditView.as_view()),
    path('profile/view/', ProfileView.as_view()),
    path('my-recipes/', MyRecipesView.as_view()),
    path('my-recipes/created/', UserCreatedRecipesView.as_view()),
    path('my-recipes/favourites/', UserFavouriteRecipesView.as_view()),
    path('my-recipes/history/', UserRecipeHistoryView.as_view()),
    path('profile/shopping-list/', ShoppingListView.as_view()),
]
