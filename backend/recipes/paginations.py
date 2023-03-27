from rest_framework import pagination


# reference: https://www.sankalpjonna.com/learn-django/pagination-made-easy-with-django-rest-framework
class FivePagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'p'


class CreatedRecipePagination(FivePagination):
    page_query_param = 'created_p'


class FavouriteRecipePagination(FivePagination):
    page_query_param = 'favourite_p'


class HistoryRecipePagination(FivePagination):
    page_query_param = 'history_p'
