# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
# from apu.models import TaskList
# from apu.serializers import TaskListSerializer2
#
# class TaskListList(generics.ListCreateAPIView):
#     permission_classes = (IsAuthenticated,)
#
#     def get_queryset(self):
#         return TaskList.objects.for_user(self.request.user)
#
#     def get_serializer_class(self):
#         return TaskListSerializer2
#
#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)
#
#
# class TaskListInfo(generics.RetrieveUpdateDestroyAPIView):
#     queryset = TaskList.objects.all()
#     lookup_field = 'pk'
#     serializer_class = TaskListSerializer2
#
from django.http import Http404
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

from apu.models import TaskList, Task
from apu.serializers import CategorySerializer2, ProductSerializer

from apu.filters import ProductFilter


class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer2
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return TaskList.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TaskList.objects.all()
    serializer_class = CategorySerializer2


class CategoryProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter,
                       filters.OrderingFilter)

    filter_class = ProductFilter

    search_fields = ('name', 'due_on', 'status')

    ordering_fields = ('name',)

    ordering = ('name',)

    def get_queryset(self):
        try:
            category = TaskList.objects.get(id=self.kwargs.get('pk'))
        except TaskList.DoesNotExist:
            raise Http404
        queryset = category.tasks.all()

        return queryset