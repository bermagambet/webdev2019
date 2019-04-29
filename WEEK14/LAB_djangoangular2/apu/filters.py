from django_filters import rest_framework as filters
from apu.models import Task


class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Task
        fields = ('name', 'due_on', 'status')