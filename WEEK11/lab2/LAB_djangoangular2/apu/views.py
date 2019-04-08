from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from apu.models import TaskList
from apu.models import Task


def tasks(request):
    tasklists = TaskList.objects.all()
    json_tasklists = [c.json() for c in tasklists]
    data = {
        'tasklists': json_tasklists
    }
    return JsonResponse(data, safe=False)


def task(request, xd):
    taskss = TaskList.objects.get(id=xd)
    tasksss = taskss.task_set.all()
    json_tasks = [c.json() for c in tasksss]
    return JsonResponse(json_tasks, safe=False)


def tasklistinfo(request, xd):
    taskss = TaskList.objects.get(id=xd)
    json_tasks = taskss.json()
    return JsonResponse(json_tasks, safe=False)
