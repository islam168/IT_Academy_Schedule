# Generated by Django 4.2.2 on 2023-06-28 23:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '__first__'),
        ('schedule', '0013_alter_cancelinggroupclass_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cancelinggroupclass',
            name='group',
        ),
        migrations.AddField(
            model_name='cancelinggroupclass',
            name='group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='cancels', to='users.group', verbose_name='Группа'),
            preserve_default=False,
        ),
    ]