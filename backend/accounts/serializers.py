from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import pagination, serializers

from accounts.models import CustomUser
from recipes.paginations import CreatedRecipePagination, \
    FavouriteRecipePagination, FivePagination, HistoryRecipePagination
from recipes.serializers import RecipeSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    first_name = serializers.CharField(default='')
    last_name = serializers.CharField(default='')
    email = serializers.EmailField(default='')
    phone_number = PhoneNumberField(default='')
    avatar = serializers.ImageField(default='')

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'password2', 'first_name',
                  'last_name', 'email', 'avatar', 'phone_number']

    def validate_password(self, data):
        """
        source: https://www.youtube.com/watch?v=BvvhtExW6tA
        """
        try:
            validate_password(data)
        except ValidationError as err:
            raise serializers.ValidationError(err.messages)
        return data

    def validate_password2(self, data):
        password = self.initial_data.get('password')
        if password != data:
            raise serializers.ValidationError(
                'The two password fields didn\'t match')
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            password=make_password(validated_data['password']),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            avatar=validated_data['avatar']
        )
        return user


class CustomUserEditSerializer(CustomUserSerializer):
    password = serializers.CharField(write_only=True, required=False,
                                     allow_blank=True)
    password2 = serializers.CharField(write_only=True, required=False,
                                      allow_blank=True)

    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    phone_number = PhoneNumberField(required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = ['password', 'password2', 'first_name',
                  'last_name', 'email', 'avatar', 'phone_number']

    def create(self, validated_data):
        """
        Reset create to default
        """
        return serializers.ModelSerializer.create(self, validated_data)

    def validate_password(self, data):
        if self.initial_data.get('password2') is None:
            raise serializers.ValidationError(
                'Confirmation required for password change')
        if data:
            return super(CustomUserEditSerializer, self).validate_password(data)
        return data

    def validate_password2(self, data):
        if self.initial_data.get('password') is None:
            raise serializers.ValidationError(
                'Original password field must be filled in')
        return super(CustomUserEditSerializer, self).validate_password2(data)

    def update(self, instance, validated_data):
        if validated_data.get('password'):
            instance.password = make_password(validated_data['password'])

        if validated_data.get('avatar'):
            instance.avatar = validated_data['avatar']

        if validated_data.get('first_name') is not None:
            instance.first_name = validated_data['first_name']

        if validated_data.get('last_name') is not None:
            instance.last_name = validated_data['last_name']

        if validated_data.get('email') is not None:
            instance.email = validated_data['email']

        if validated_data.get('phone_number') is not None:
            instance.phone_number = validated_data['phone_number']

        instance.save()

        return instance


class MyRecipeSerializer(serializers.ModelSerializer):
    created_list = serializers.SerializerMethodField()
    favourite_list = serializers.SerializerMethodField()
    history_list = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['created_list', 'favourite_list', 'history_list']

    def get_created_list(self, obj):
        value = self.context['created_list']
        paginator = CreatedRecipePagination()
        page = paginator.paginate_queryset(value, self.context['request'])
        serializer = RecipeSerializer(page, many=True)
        return serializer.data

    def get_favourite_list(self, obj):
        value = obj.favourite_list.all().order_by('-num_fav')
        paginator = FavouriteRecipePagination()
        page = paginator.paginate_queryset(value, self.context['request'])
        serializer = RecipeSerializer(page, many=True)
        return serializer.data

    def get_history_list(self, obj):
        value = obj.history_list.all().order_by('-interactedwith__last_interaction')
        paginator = HistoryRecipePagination()
        page = paginator.paginate_queryset(value, self.context['request'])
        serializer = RecipeSerializer(page, many=True)
        return serializer.data
