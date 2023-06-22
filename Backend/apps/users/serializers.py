from rest_framework import serializers
from rest_framework.fields import EmailField, CharField
from apps.users.models import User, Group, Role


class UserCreateSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), many=True)

    class Meta:
        model = User
        fields = ('name', 'email', 'group', 'role', 'password')

    def create(self, validated_data):
        group_data = validated_data.pop('group', None)
        role_data = validated_data.pop('role', [])

        user = User.objects.create_user(**validated_data)

        if group_data:
            user.group_id = group_data
            # print('Данные отправлены')

        for role_item in role_data:
            user.role.add(role_item)

        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):#111
    email = EmailField()
    password = CharField(max_length=128, min_length=8)
