from rest_framework import serializers
from apps.schedule.models import Schedule, CancelingGroupsClass, CancelingGroupClass, Auditoria, WeekDays
from apps.users.models import Group
from apps.users.serializers import UserSerializer
from apps.schedule.services import week_days


class AuditoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auditoria
        fields = ['name']


class ScheduleSerializer(serializers.ModelSerializer):
    mentor_days = serializers.SerializerMethodField()
    reviewer_days = serializers.SerializerMethodField()
    auditoria = AuditoriaSerializer(many=False, read_only=True)

    class Meta:
        model = Schedule
        fields = ['mentor_days', 'reviewer_days', 'auditoria', 'time_start',
                  'time_end', 'course_start_date', 'course_end_date']


    # Добавление номеров дней когда преподает ментор, в зависимости от их названия
    def get_mentor_days(self, obj):
        mentor_days = obj.mentor_days.all()
        return week_days(obj, mentor_days)

    # Добавление номеров дней когда преподает ревьюер, в зависимости от их названия
    def get_reviewer_days(self, obj):
        reviewer_days = obj.reviewer_days.all()
        return week_days(obj, reviewer_days)


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

    # Получение ментора группы
    def get_mentor(self, obj):
        users = obj.users.all()  # Получить всех пользователей связанных с группой
        for user in users:
            if 'Ментор' in user.role.values_list('name', flat=True) and user.group == obj:
                return UserSerializer(user).data
        return None

    # Получение ревьюера группы
    def get_reviewer(self, obj):
        users = obj.users.all()  # Получить всех пользователей связанных с группой
        for user in users:
            if 'Ревьюер' in user.role.values_list('name', flat=True) and user.group == obj:
                return UserSerializer(user).data
        return None

    # Получение расписания группы
    def get_schedule(self, obj):
        schedule = Schedule.objects.filter(group=obj.id).last()
        return ScheduleSerializer(schedule).data or None

    # Получение дней отменнех занятий у группы
    def get_canceling_group_class(self, obj):
        groups = CancelingGroupClass.objects.filter(group=obj.id)
        dates = []
        for group in groups:
            dates.append(group.date)
        return dates
