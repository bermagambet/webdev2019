from django.urls import path
from apu import views

urlpatterns = [
    path('tasklist/', views.TaskListList.as_view()),
    #path('tasklist/<int:pk>/tasks', views.),
    path('tasklist/<int:pk>/info', views.TaskListInfo.as_view()),
    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
