# Generated by Django 3.2.12 on 2022-06-10 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_portfolioentry_thumbnailpic'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolioentry',
            name='link',
            field=models.CharField(default='', max_length=255),
        ),
    ]