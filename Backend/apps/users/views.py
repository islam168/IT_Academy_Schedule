from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from apps.schedule.serializers import GroupSerializer
from apps.users.serializers import UserCreateSerializer, RoleSerializer, MyTokenObtainPairSerializer
from apps.users.models import User, Group, Role
from rest_framework import response, status
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        roles = request.data.get('role')
        group = request.data.get('group')

        if User.objects.filter(email=email).exists():
            return Response('пользователь с такой почтой уже существует', status=status.HTTP_400_BAD_REQUEST)

        else:
            role_list = []
            for role in roles:
                user_role = Role.objects.get(id=role)
                role_list.append(str(user_role))
            if 'Ментор' in role_list:
                if User.objects.filter(group_id=group, role__name='Ментор').exists():
                    return Response('У этой группы уже есть ментор', status=status.HTTP_400_BAD_REQUEST)
            if 'Ревьюер' in role_list:
                if User.objects.filter(group_id=group, role__name='Ревьюер').exists():
                    return Response('У этой группы уже есть ревьюер', status=status.HTTP_400_BAD_REQUEST)
            if 'Студент' in role_list and len(role_list) > 1:
                return Response('Студент', status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response('user was successfully created', status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupListAPIView(ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class RoleListAPIView(ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
