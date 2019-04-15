from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from apu.models import TaskList
import json
from apu.models import Task
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def TaskLists(request):
    if request.method == 'GET':
        taskLists = TaskList.objects.all()
        taskListsJson = [c.json() for c in taskLists]
        return JsonResponse(taskListsJson, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        #list.objects.create()
        list = list()
        list.name = data.get('name', '')
        list.save()
        data = json.loads(request.body)
        #list.name = data.get('name', list.name)
        #list.save()
        #print(data)
        #print(data['name'])
        return JsonResponse(list.json())
    return JsonResponse({'error': 'DAMN BOI HE NOT GET'})


@csrf_exempt
def Tasks(request, xd):
    taskLists = TaskList.objects.get(id=xd)
    taskListTasks = taskLists.task_set.all()
    taskListTasksJson = [c.json() for c in taskListTasks]
    return JsonResponse(taskListTasksJson, safe=False)


@csrf_exempt
def TaskListInfo(request, xd):
    if request.method == 'GET':
        taskLists = TaskList.objects.get(id=xd)
        taskListJson = taskLists.json()
        return JsonResponse(taskListJson, safe=False)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        list.name = data.get('name', list.name)
        list.save()
        print(data)
        return JsonResponse({'update':True})
    elif request.method == 'DELETE':
        return JsonResponse({'delete':True})


