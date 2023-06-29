from rest_framework import serializers
from apps.schedule.models import Schedule, CancelingGroupsClass, CancelingGroupClass, Auditoria
from apps.users.models import Group
from apps.users.serializers import UserSerializer


class AuditoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auditoria
        fields = ['name']


class ScheduleSerializer(serializers.ModelSerializer):
    auditoria = AuditoriaSerializer(many=False, read_only=True)
    class Meta:
        model = Schedule
        fields = ['mentor_days', 'reviewer_days', 'auditoria', 'time_start', 'time_end', 'course_start_date', 'course_end_date']


class CancelingGroupsClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = CancelingGroupsClass
        fields = ['date']


class CancelingGroupClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = CancelingGroupClass
        fields = ['date', 'group']


class GroupSerializer(serializers.ModelSerializer):
    mentor = serializers.SerializerMethodField()
    reviewer = serializers.SerializerMethodField()
    schedule = serializers.SerializerMethodField()
    canceling_group_class = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ['id', 'name', 'mentor', 'reviewer', 'schedule', 'canceling_group_class']

    def get_mentor(self, obj):
        users = obj.users.all()  # Получить всех пользователей связанных с группой
        for user in users:
            if 'Ментор' in user.role.values_list('name', flat=True) and user.group == obj:
                return UserSerializer(user).data
        return None

    def get_reviewer(self, obj):
        users = obj.users.all()  # Получить всех пользователей связанных с группой
        for user in users:
            if 'Ревьювер' in user.role.values_list('name', flat=True) and user.group == obj:
                return UserSerializer(user).data
        return None

    def get_schedule(self, obj):
        schedule = Schedule.objects.filter(group=obj.id).last()
        return ScheduleSerializer(schedule).data or None

    def get_canceling_group_class(self, obj):
        groups = CancelingGroupClass.objects.filter(group=obj.id)
        dates = []
        for group in groups:
            dates.append(group.date)
        return dates
