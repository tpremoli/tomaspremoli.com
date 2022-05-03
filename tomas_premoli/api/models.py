from django.db import models
from django.core.validators import FileExtensionValidator
from .storage import OverwriteStorage
import os

# Create your models here.
class MyData(models.Model):
    def rename_pic(instance, filename):
        ext = filename.split('.')[-1]
        return '{}.{}'.format("api/media/me/pic", ext)
        
    def rename_pdf(instance, filename):
        ext = filename.split('.')[-1]
        return '{}.{}'.format("api/media/me/cv", ext)

    pic = models.ImageField(upload_to=rename_pic, storage=OverwriteStorage(), max_length=None)
    fname = models.CharField(default="Tomas", max_length=255)
    lname = models.CharField(default="Premoli", max_length=255)
    aboutme = models.TextField(default="")

    cv = models.FileField(upload_to=rename_pdf,
                    validators=[FileExtensionValidator(allowed_extensions=['pdf'])],
                    storage=OverwriteStorage(), max_length=None)

    github_link = models.CharField(default="https://github.com/tpremoli", max_length=255)
    linkedin_link = models.CharField(default="https://www.linkedin.com/in/tomas-premoli-008016144/", max_length=255)

class PortfolioEntry(models.Model):
    thumbnailpic = models.ImageField()

    title = models.CharField(default="title", max_length=255)
    blurb = models.TextField(default="blurb")
    technologies_used = models.CharField(default="Javascript, HTML", max_length=255)

    date_created = models.DateField()

    github_link = models.CharField(default="", max_length=255)

class PortfolioEntryPictures(models.Model):
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)
    pic = models.ImageField()

class ContactEntry():
    name = models.CharField(default="", max_length=255)
    email = models.EmailField(default="", max_length=255)
    comment = models.EmailField(default="", max_length=255)
