# Generated by Django 3.2.12 on 2022-09-14 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_alter_mydata_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mydata',
            name='bannerpic',
            field=models.ImageField(upload_to=''),
        ),
    ]
