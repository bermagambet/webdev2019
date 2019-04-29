from django.db import models
from datetime import datetime
from django.contrib.auth.models import User



class TaskListManager(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)


class TaskList(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)
    objects = TaskListManager()


    def json(self):
        return{
            'id': self.id,
            'name': self.name,
        }

    def __str__(self):
        return'The id is {} and name is {}'.format(self.pk, self.name)


class Task(models.Model):
    name = models.CharField(max_length=200)
    due_on = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE, related_name='tasks')

    def json(self):
        return{
            'id': self.id,
            'name': self.name,
            'due_on': self.due_on,
            'status': self.status,
        }

    def __str__(self):
        return'The id is {} and name is {}'.format(self.pk, self.name)

