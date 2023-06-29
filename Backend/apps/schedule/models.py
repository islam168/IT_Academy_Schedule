from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework.authtoken.models import Token
from apps.users.models import Group


class WeekDays(models.Model):
    name = models.CharField(verbose_name='День недели')

    class Meta:
        verbose_name = 'День недели'
        verbose_name_plural = 'Дни недели'

    def __str__(self):
        return self.name


class CancelingGroupClass(models.Model):
    date = models.DateField(verbose_name='Дата')
    group = models.ForeignKey(verbose_name='Группа',
                                 to=Group,
                                 related_name='cancels',
                                 on_delete=models.CASCADE,
                                 null=False, blank=False)

    class Meta:
        verbose_name_plural = 'Отмена занятия у группы'

    def __str__(self):
        return f'Группа: {self.group} Дата: {self.date}'


class CancelingGroupsClass(models.Model):
    date = models.DateField(verbose_name='Дата')

    class Meta:
        verbose_name_plural = 'Отмена занятий у групп'

    def __str__(self):
        return f'{self.date}'


class Auditoria(models.Model):
    name = models.CharField(verbose_name='Аудитория', max_length=10)

    class Meta:
        verbose_name = 'Аудитория'
        verbose_name_plural = 'Аудитории'

    def __str__(self):
        return self.name


class Schedule(models.Model):
    mentor_days = models.ManyToManyField(verbose_name='День недели',
                                         to='WeekDays',
                                         related_name='mentor_days')
    reviewer_days = models.ManyToManyField(verbose_name='День недели',
                                           to='WeekDays',
                                           related_name='reviewer_days')
    time_start = models.TimeField(verbose_name='Время начала занятия', auto_now=False, auto_now_add=False)
    time_end = models.TimeField(verbose_name='Время окончания занятия', auto_now=False, auto_now_add=False)
    group = models.OneToOneField(verbose_name='Группа',
                                 to=Group,
                                 related_name='schedules',
                                 on_delete=models.SET_NULL,
                                 null=True, blank=False)
    auditoria = models.ForeignKey(verbose_name='Аудитория',
                                 to=Auditoria,
                                 related_name='SET_NULL',
                                 on_delete=models.SET_NULL,
                                 null=True, blank=False)
    course_start_date = models.DateField(verbose_name='Дата начала курса', null=False, blank=False)
    course_end_date = models.DateField(verbose_name='Дата окончания курса', null=False, blank=False)

    class Meta:
        verbose_name = 'Расписание'
        verbose_name_plural = 'Расписания'

    def __str__(self):
        return f'Расписание группы: {self.group}'
