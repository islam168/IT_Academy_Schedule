from rest_framework import serializers
from rest_framework.fields import EmailField, CharField


class UserLoginSerializer(serializers.Serializer):
    email = EmailField()
    password = CharField(max_length=128, min_length=8)
