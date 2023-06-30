from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.schedule.models import CancelingGroupsClass
from apps.schedule.serializers import GroupSerializer, CancelingGroupsClassSerializer
from apps.users.models import Group


class ScheduleAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_group = Group.objects.filter(users=user).first()  # Получение группы пользователя
        other_groups = Group.objects.exclude(users=user)  # Получние остальных групп
        user_group_serializer = GroupSerializer(user_group)
        other_group_serializer = GroupSerializer(other_groups, many=True)
        cancels = CancelingGroupsClass.objects.all()
        canceling_groups_class_serializer = CancelingGroupsClassSerializer\
            (cancels, many=True)  # Дни когда занятия отменены у всех групп

        return Response({
            "user_group": user_group_serializer.data,
            "other_groups": other_group_serializer.data,
            "canceling_groups_class": canceling_groups_class_serializer.data
        })
