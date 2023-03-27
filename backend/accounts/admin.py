from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from accounts.models import CustomUser, InteractedWith

# Register your models here.
UserAdmin.fieldsets += ('Additional User Fields', {'fields': ('avatar', 'phone_number', 'shopping_list')}),
admin.site.register(CustomUser, UserAdmin)
admin.site.register(InteractedWith)
