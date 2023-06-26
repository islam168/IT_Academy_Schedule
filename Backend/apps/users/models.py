from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save
from apps.users.managers import UserManager


class Group(models.Model):
    name = models.CharField(verbose_name='Группа', max_length=64)

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(verbose_name='Роль', max_length=64)

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(verbose_name='ФИО', max_length=128)
    email = models.EmailField(verbose_name='Почта', unique=True)
    group = models.ForeignKey(verbose_name='Группа',
                              to='Group',
                              related_name='users',
                              on_delete=models.SET_NULL,
                              null=True, blank=False)
    role = models.ManyToManyField(verbose_name='Роль',
                                  to='Role',
                                  related_name='users')
    is_active = models.BooleanField(verbose_name='Активный', default=True)
    is_staff = models.BooleanField(verbose_name='Сотрудник', default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return f'{self.email}'
