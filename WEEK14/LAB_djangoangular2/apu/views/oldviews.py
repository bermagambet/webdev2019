from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from apu.models import TaskList
import json
from apu.models import Task
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from apu.serializers import TaskListSerializer
from apu.serializers import TaskSerializer
@csrf_exempt
def TaskLists(request):
    if request.method == 'GET':
        taskLists = TaskList.objects.all()
        serializer = TaskListSerializer(taskLists, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = TaskListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    return JsonResponse({'error': 'DAMN BOI HE NOT GET'})


@csrf_exempt
def Tasks(request, xd):
    try:
        taskLists = TaskList.objects.get(id=xd)
    except TaskList.DoesNotExit as e:
        return JsonResponse({'error':str(e)})

    taskListTasks = taskLists.task_set.all()
    serializer = TaskSerializer(taskListTasks, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def TaskListInfo(request, xd):
    try:
        TaskList1 = TaskList.objects.get(id=xd)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error':str(e)})

    if request.method == 'GET':
        serializer = TaskListSerializer(TaskList1)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskListSerializer(instance=TaskList1, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        TaskList1.delete()
        return JsonResponse({})
    return JsonResponse({'error':'wrong request'})

