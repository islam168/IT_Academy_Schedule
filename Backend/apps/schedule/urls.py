from django.urls import path

from apps.schedule.views import ScheduleAPIView

urlpatterns = [
    path('schedule/', ScheduleAPIView.as_view(), name='schedule'),

]
