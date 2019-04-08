from django.urls import path
from apu import views

urlpatterns = [
    path('', views.tasks),
    path('tasklist/<int:xd>/tasks', views.task),
    path('tasklist/<int:xd>/info', views.tasklistinfo)
]
