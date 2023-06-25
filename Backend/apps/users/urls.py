from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from apps.users.views import UserCreateAPIView, GroupListAPIView, RoleListAPIView, \
    MyTokenObtainPairView, GroupAPIView, LogoutView

urlpatterns = [
    path('registration/', UserCreateAPIView.as_view(), name='registration'),
    path('group_list/', GroupListAPIView.as_view(), name='group_list'),
    path('schedule/', GroupAPIView.as_view(), name='schedule'),
    path('role_list/', RoleListAPIView.as_view(), name='role_list'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout')

]
