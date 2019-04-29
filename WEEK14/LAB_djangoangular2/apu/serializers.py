from rest_framework import serializers
from apu.models import TaskList, Task
from django.contrib.auth.models import User


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        # {'name': 'new category 3'}
        # name='new category 3'
        category = TaskList(**validated_data)
        category.save()
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tasklist_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Task
        fields = ('id', 'name', 'due_on', 'tasklist_id')


class ProductSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'name', 'due_on', 'status', 'task_list')


class CategorySerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    created_by = UserSerializer(read_only=True)
    tasks = ProductSerializer2(many=True)

    # products = serializers.StringRelatedField(many=True)
    # products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = TaskList
        fields = ('id', 'name', 'created_by', 'tasks')

    def create(self, validated_data):
        tasks = validated_data.pop('tasks')
        task1 = TaskList.objects.create(**validated_data)
        for task in tasks:
            Task.objects.create(category=task1, **task)

        # arr = [Product(category=category, **product) for product in products]
        # Product.objects.bulk_create(arr)

        # for i in range(0, len(arr), 100):
        #     # 0 100 200 300 400
        #     Product.objects.bulk_create(arr[i:i+100])

        return category