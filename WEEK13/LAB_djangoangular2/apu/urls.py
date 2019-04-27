from django.urls import path
from apu import views

urlpatterns = [
    path('tasklist', views.TaskListList.as_view()),
    #path('tasklist/<int:xd>/tasks', views.),
    path('tasklist/<int:xd>/info', views.TaskListInfo.as_view()),
    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
