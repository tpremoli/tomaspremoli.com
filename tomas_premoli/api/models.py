from django.db import models
from django.core.validators import FileExtensionValidator
import os

# Create your models here
# TODO: Fix cv and pic saving
class MyData(models.Model):
    def rename_pic(instance, filename):
        ext = filename.split('.')[-1]
        return '{}.{}'.format("me/pic", ext)
        
    def rename_pdf(instance, filename):
        ext = filename.split('.')[-1]
        return '{}.{}'.format("me/cv", ext)

    pic = models.ImageField(upload_to=rename_pic)
    aboutme = models.TextField(default="")

    cv = models.FileField(upload_to=rename_pdf,
                    validators=[FileExtensionValidator(allowed_extensions=['pdf'])])

    github_link = models.CharField(default="https://github.com/tpremoli", max_length=255)
    linkedin_link = models.CharField(default="https://www.linkedin.com/in/tomas-premoli-008016144/", max_length=255)
    
    def save(self, *args, **kwargs):
            try:
                this = MyData.objects.get(id=self.id)
                if this.pic != self.pic:
                    this.pic.delete()
                if this.cv != self.cv:
                    this.cv.delete()
            except: pass
            super(MyData, self).save(*args, **kwargs)


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
