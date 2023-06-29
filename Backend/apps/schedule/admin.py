from django.contrib import admin
from apps.schedule.models import WeekDays, Schedule, CancelingGroupClass, CancelingGroupsClass, Auditoria


admin.site.register(WeekDays)
admin.site.register(Schedule)
admin.site.register(Auditoria)
admin.site.register(CancelingGroupClass)
admin.site.register(CancelingGroupsClass)
