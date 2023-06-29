# Generated by Django 4.2.2 on 2023-06-28 23:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '__first__'),
        ('schedule', '0011_alter_schedule_course_end_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CancelingGroupsClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Дата')),
            ],
        ),
        migrations.AlterField(
            model_name='schedule',
            name='course_end_date',
            field=models.DateField(verbose_name='Дата окончания курса'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='course_start_date',
            field=models.DateField(verbose_name='Дата начала курса'),
        ),
        migrations.CreateModel(
            name='CancelingGroupClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Дата')),
                ('group', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='cancels', to='users.group', verbose_name='Группа')),
            ],
        ),
    ]