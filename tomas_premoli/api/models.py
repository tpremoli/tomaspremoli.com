from django.db import models

# Create your models here.
class MyData(models.Model):
    pic = models.ImageField()
    fname = models.CharField(default="Tomas", max_length=255)
    lname = models.CharField(default="Premoli", max_length=255)
    aboutme = models.TextField(default="")

    cv = models.FileField(upload_to='pdf')

    github_link = models.CharField(default="https://github.com/tpremoli", max_length=255)
    linkedin_link = models.CharField(default="https://www.linkedin.com/in/tomas-premoli-008016144/", max_length=255)

class PortfolioEntry(models.Model):
    thumbnailpic = models.ImageField()
    title = models.CharField(default="title", max_length=255)
    blurb = models.TextField(default="blurb")
    technologies_used = models.CharField(default="Javascript, HTML", max_length=255)

    github_link = models.CharField(default="", max_length=255)

class PortfolioEntryPictures(models.Model):
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)
    pic = models.ImageField()

