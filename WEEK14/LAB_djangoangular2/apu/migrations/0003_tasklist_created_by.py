# Generated by Django 2.2 on 2019-04-27 14:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('apu', '0002_remove_task_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasklist',
            name='created_by',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
