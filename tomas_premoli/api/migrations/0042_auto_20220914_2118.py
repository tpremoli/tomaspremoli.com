# Generated by Django 3.2.12 on 2022-09-14 20:18

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0041_alter_mydata_cv'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mydata',
            name='aboutme',
        ),
        migrations.RemoveField(
            model_name='mydata',
            name='github_link',
        ),
        migrations.RemoveField(
            model_name='mydata',
            name='linkedin_link',
        ),
        migrations.AlterField(
            model_name='mydata',
            name='cv',
            field=models.FileField(upload_to='api/media/me/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])]),
        ),
    ]
