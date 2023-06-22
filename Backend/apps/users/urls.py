from django.urls import path

from apps.users.views import LoginAPIView, UserCreateAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('registration/', UserCreateAPIView.as_view(), name='registration'),
]
