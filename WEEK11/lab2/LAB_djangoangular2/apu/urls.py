from django.urls import path
from apu import views

urlpatterns = [
    path('tasklist', views.TaskLists),
    path('tasklist/<int:xd>/tasks', views.Tasks),
    path('tasklist/<int:xd>/info', views.TaskListInfo)
]
