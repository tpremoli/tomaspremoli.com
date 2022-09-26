import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.conf import settings


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not User.objects.filter(username=settings.DEFAULT_SUPERUSER_NAME).exists():
            User.objects.create_superuser(
                settings.DEFAULT_SUPERUSER_NAME,
                settings.DEFAULT_SUPERUSER_EMAIL,
                'temp_password')
