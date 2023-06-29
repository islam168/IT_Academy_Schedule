
from django.db import migrations, models
import django.db.models.deletion



class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),

    ]

    operations = [
        migrations.CreateModel(
            name='Auditoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10, verbose_name='Аудитория')),
            ],
            options={
                'verbose_name': 'Аудитория',
                'verbose_name_plural': 'Аудитории',
            },
        ),
        migrations.CreateModel(
            name='CancelingGroupsClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Дата')),
            ],
            options={
                'verbose_name_plural': 'Отмена занятий у групп',
            },
        ),
        migrations.CreateModel(

                ('start_date', models.DateField(verbose_name='Дата начала курса')),
                ('end_date', models.DateField(verbose_name='Дата окончания курса')),
                ('auditoria', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='SET_NULL', to='schedule.auditoria', verbose_name='Аудитория')),
                ('group', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='schedules', to='users.group', verbose_name='Группа')),

        migrations.CreateModel(
            name='CancelingGroupClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Дата')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cancels', to='users.group', verbose_name='Группа')),
            ],
            options={
                'verbose_name_plural': 'Отмена занятия у группы',
            },
        ),

    ]
