from django.urls import path
from apu import views

urlpatterns = [
    path('tasklist/', views.CategoryList.as_view()),
    path('tasklist/<int:pk>/tasks/', views.CategoryProductList.as_view()),
    path('tasklist/<int:pk>/tasks/<int:pk2>/info', views.TaskDetail.as_view()),
    path('tasklist/<int:pk>/info/', views.CategoryDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
