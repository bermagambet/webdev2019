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
    name = serializers.CharField(required=True)
    due_on = serializers.CharField(required=True)
    status = serializers.CharField(required=True)


    class Meta:
        model = Task
        fields = ('id', 'name', 'due_on', 'status', 'task_list')

    # def create(self, validated_data):
    #     tasks = validated_data.pop('task_list')
    #     xd = TaskList.objects.get(id=tasks)
    #     task1 = TaskList.objects.create(validated_data.pop('name'), xd)
    #     return task1


class CategorySerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    created_by = UserSerializer(read_only=True)
    tasks = ProductSerializer2(many=True)

    class Meta:
        model = TaskList
        fields = ('id', 'name', 'created_by', 'tasks')

    def create(self, validated_data):
        tasks = validated_data.pop('tasks')
        task1 = TaskList.objects.create(**validated_data)
        for task in tasks:
            Task.objects.create(category=task1, **task)
        return task1

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance