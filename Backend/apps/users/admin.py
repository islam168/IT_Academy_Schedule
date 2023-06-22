from django.contrib import admin

from apps.users.models import User, Role, Group


admin.site.register(User)
admin.site.register(Role)
admin.site.register(Group)
