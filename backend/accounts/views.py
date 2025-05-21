from django.db.models import Subquery
from django.shortcuts import get_object_or_404, render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, \
    UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import CustomUser
from accounts.serializers import CustomUserEditSerializer, CustomUserSerializer, \
    MyRecipeSerializer
from recipes.models import Recipe
from recipes.paginations import FivePagination
from recipes.serializers import RecipeSerializer


# Create your views here.
class RegisterView(CreateAPIView):
    serializer_class = CustomUserSerializer


class ProfileEditView(RetrieveAPIView, UpdateAPIView):
    serializer_class = CustomUserEditSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProfileView(RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserCreatedRecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = FivePagination
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    search_fields = ('name', 'ingredients__name', 'creator__username')
    filterset_fields = {'cuisine': ['exact', 'contains'],
                        'diet': ['exact', 'contains'],
                        'cooking_time': ['gt', 'lt', 'gte', 'lte', 'range']}
    ordering_fields = ('ave_rating', 'num_fav')

    def get_queryset(self):
        return Recipe.objects.filter(creator=self.request.user.id).order_by(
            'creator_id')


class UserFavouriteRecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = FivePagination
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    search_fields = ('name', 'ingredients__name', 'creator__username')
    filterset_fields = {'cuisine': ['exact', 'contains'],
                        'diet': ['exact', 'contains'],
                        'cooking_time': ['gt', 'lt', 'gte', 'lte', 'range']}
    ordering_fields = ('ave_rating', 'num_fav')

    def get_queryset(self):
        return self.request.user.favourite_list.all().order_by('-num_fav')


class UserRecipeHistoryView(ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = FivePagination
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    search_fields = ('name', 'ingredients__name', 'creator__username')
    filterset_fields = {'cuisine': ['exact', 'contains'],
                        'diet': ['exact', 'contains'],
                        'cooking_time': ['gt', 'lt', 'gte', 'lte', 'range']}
    ordering_fields = ('ave_rating', 'num_fav',  'interactedwith__last_interaction')

    def get_queryset(self):
        return self.request.user.history_list.all().order_by('-interactedwith__last_interaction')


class MyRecipesView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MyRecipeSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self):
        context = super(MyRecipesView, self).get_serializer_context()
        created_list = Recipe.objects.filter(
            creator=self.request.user.id).order_by('creator_id')
        context.update({'created_list': created_list})
        return context


class ShoppingListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RecipeSerializer
    pagination_class = FivePagination

    def get_queryset(self):
        return self.request.user.shopping_list.all().order_by('-num_fav')

