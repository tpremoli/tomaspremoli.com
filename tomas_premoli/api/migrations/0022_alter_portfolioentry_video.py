# Generated by Django 3.2.12 on 2022-06-12 16:37

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_auto_20220612_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolioentry',
            name='video',
            field=models.FileField(blank=True, default='', upload_to=api.models.PortfolioEntry.rename_vid),
        ),
    ]
