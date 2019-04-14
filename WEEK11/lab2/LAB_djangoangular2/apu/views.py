from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from apu.models import TaskList
from apu.models import Task


def TaskLists(request):
    taskLists = TaskList.objects.all()
    taskListsJson = [c.json() for c in taskLists]
    return JsonResponse(taskListsJson, safe=False)


def Tasks(request, xd):
    taskLists = TaskList.objects.get(id=xd)
    taskListTasks = taskLists.task_set.all()
    taskListTasksJson = [c.json() for c in taskListTasks]
    return JsonResponse(taskListTasksJson, safe=False)


def TaskListInfo(request, xd):
    taskLists = TaskList.objects.get(id=xd)
    taskListJson = taskLists.json()
    return JsonResponse(taskListJson, safe=False)
