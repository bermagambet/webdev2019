from django_filters import rest_framework as filters
from apu.models import Task, TaskList


class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Task
        fields = ('id', 'name', 'due_on', 'status', )


class CategoryFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = TaskList
        fields = ('id', 'name', 'created_by', 'tasks')
