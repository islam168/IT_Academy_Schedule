# Generated by Django 4.2.2 on 2023-06-29 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='schedule',
            old_name='end_date',
            new_name='course_end_date',
        ),
        migrations.RenameField(
            model_name='schedule',
            old_name='start_date',
            new_name='course_start_date',
        ),
    ]
