# Generated by Django 3.2.12 on 2022-05-06 22:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_mydata_lname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mydata',
            name='lname',
        ),
    ]
