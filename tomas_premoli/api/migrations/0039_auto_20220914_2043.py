# Generated by Django 3.2.12 on 2022-09-14 19:43

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_auto_20220914_2041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mydata',
            name='bannerpic',
            field=models.ImageField(upload_to=api.models.MyData.rename_pic),
        ),
        migrations.AlterField(
            model_name='mydata',
            name='pic',
            field=models.ImageField(upload_to=api.models.MyData.rename_pic),
        ),
    ]