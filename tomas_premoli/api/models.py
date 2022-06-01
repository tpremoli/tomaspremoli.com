from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image
from io import BytesIO
import sys
import os

# Create your models here
# TODO: Fix cv and pic saving


class MyData(models.Model):
    def rename_pic(instance, filename):
        return os.path.join("api/media/me/", filename)

    def rename_pdf(instance, filename):
        ext = filename.split('.')[-1].lower()
        return os.path.join("api/media/me/", ("cv."+ext))

    pic = models.ImageField(upload_to=rename_pic)
    aboutme = models.TextField(default="")

    cv = models.FileField(upload_to=rename_pdf,
                          validators=[FileExtensionValidator(allowed_extensions=['pdf'])])

    github_link = models.CharField(
        default="https://github.com/tpremoli", max_length=255)
    linkedin_link = models.CharField(
        default="https://www.linkedin.com/in/tomas-premoli-008016144/", max_length=255)

    # overrides image data to be compressed
    def save(self, *args, **kwargs):
        try:
            # Opening the uploaded image
            img = Image.open(self.pic)
            output = BytesIO()
            # Resize/modify the image
            width, height = img.size

            offset = int(abs(height-width)/2)

            # This crops the image into a square depending if portrait or landscape
            if width == height:
                pass
            elif width > height:
                img = img.crop([offset, 0, width-offset, height])
            else:
                img = img.crop([0, offset, width, height-offset])

            img = img.resize((400, 400))

            img = img.convert('RGB')
            # after modifications, save it to the output
            img.save(output, format='JPEG')
            output.seek(0)

            # Set field to modified picture
            self.pic = InMemoryUploadedFile(output, 'ImageField', "pic.jpg",
                                            'image/jpeg', sys.getsizeof(output), None)
        except Exception as e:
            print(e)
        print(self.pic.name)
        super(MyData, self).save(*args, **kwargs)
        print(self.pic.name)


class PortfolioEntry(models.Model):
    thumbnailpic = models.ImageField()

    title = models.CharField(default="title", max_length=255)
    blurb = models.TextField(default="blurb")
    technologies_used = models.CharField(
        default="Javascript, HTML", max_length=255)

    date_created = models.DateField()

    github_link = models.CharField(default="", max_length=255)


class PortfolioEntryPictures(models.Model):
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)
    pic = models.ImageField()


class ContactEntry(models.Model):
    name = models.CharField(default="", max_length=255)
    email = models.EmailField(default="", max_length=255)
    comment = models.TextField(default="", blank=True)


class Experience(models.Model):
    name = models.CharField(default="", max_length=255)
    title = models.CharField(default="", max_length=255)
    description = models.TextField(default="", blank=True)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    location = models.CharField(default="", max_length=255)


class Education(models.Model):
    name = models.CharField(default="", max_length=255)
    title = models.CharField(default="", max_length=255)
    description = models.TextField(default="", blank=True)

    start_year = models.IntegerField()
    end_year = models.IntegerField()

    location = models.CharField(default="", max_length=255)


class Skills(models.Model):
    name = models.CharField(default="", max_length=255)
    description = models.TextField(default="", blank=True)
