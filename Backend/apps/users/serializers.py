from rest_framework import serializers
from apps.users.models import User, Group, Role
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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

        for role_item in role_data:
            user.role.add(role_item)

        user.save()
        return user


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']


class GroupSerializer(serializers.ModelSerializer):
    mentor = serializers.SerializerMethodField()
    reviewer = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ['id', 'name', 'mentor', 'reviewer']

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

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        token['email'] = user.email
        # ...

        return token


