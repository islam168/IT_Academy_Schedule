from django.contrib import admin

from apps.schedule.models import Schedule, CancelingGroupClass, CancelingGroupsClass, Auditoria, WeekDays


admin.site.register(CancelingGroupClass)
admin.site.register(CancelingGroupsClass)
admin.site.register(Auditoria)
admin.site.register(WeekDays)


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['group']

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['mentor_days'].widget.attrs['style'] = 'height: calc(100% + 30px);'
        form.base_fields['reviewer_days'].widget.attrs['style'] = 'height: calc(100% + 30px);'
        return form
