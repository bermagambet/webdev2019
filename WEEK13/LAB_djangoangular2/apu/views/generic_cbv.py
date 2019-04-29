from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apu.models import TaskList
from apu.serializers import TaskListSerializer2

class TaskListList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return TaskList.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return TaskListSerializer2

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskListInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = TaskList.objects.all()
    lookup_field = 'pk'
    serializer_class = TaskListSerializer2

