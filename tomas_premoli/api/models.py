from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image
from io import BytesIO
import sys
import os

# Create your models here
# TODO: Fix cv and pic saving

class PortfolioEntry(models.Model):
    def __str__(self):
        return self.title

    def rename_pic(instance, filename):
        dir = os.path.join("api/media/portfolio/", instance.title)
        return os.path.join(dir, filename)

    def rename_vid(instance, filename):
        ext = filename.split('.')[-1].lower()
        dir = os.path.join("api/media/portfolio/", instance.title)
        return os.path.join(dir, "video." + ext)

    # These are used in small card display
    thumbnailpic = models.ImageField(upload_to=rename_pic)

    title = models.CharField(default="title", max_length=255)
    blurb = models.CharField(default="blurb", max_length=255)

    # These are used in detailed display
    video = models.FileField(default="", blank=True, upload_to=rename_vid)

    description = models.TextField(default="description")

    date_created = models.DateField()

    github_link = models.CharField(default="", blank=True, max_length=255)
    link = models.CharField(default="", blank=True, max_length=255)

    __original_pic = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_pic = self.thumbnailpic

    # overrides image data to be compressed
    def save(self, *args, **kwargs):
        if self.thumbnailpic != self.__original_pic:
            try:
                # Opening the uploaded image
                img = Image.open(self.thumbnailpic)
                output = BytesIO()
                # Resize/modify the image
                width, height = img.size

                aspect = width / float(height)

                # Crop image into aspect ratio 3:2
                ideal_width = 450
                ideal_height = 300

                ideal_aspect = ideal_width / float(ideal_height)

                if aspect > ideal_aspect:
                    # Then crop the left and right edges:
                    new_width = int(ideal_aspect * height)
                    offset = (width - new_width) / 2
                    resize = (offset, 0, width - offset, height)
                else:
                    # ... crop the top and bottom:
                    new_height = int(width / ideal_aspect)
                    offset = (height - new_height) / 2
                    resize = (0, offset, width, height - offset)

                img = img.crop(resize).resize(
                    (ideal_width, ideal_height), Image.ANTIALIAS)

                img = img.convert('RGB')
                # after modifications, save it to the output
                img.save(output, format='JPEG')
                output.seek(0)

                filename = "thumb.jpg"

                # Set field to modified picture
                self.thumbnailpic = InMemoryUploadedFile(output, 'ImageField', filename,
                                                         'image/jpeg', sys.getsizeof(output), None)

                if os.path.exists(os.path.join("api/media/portfolio/", self.title, "thumb.jpg")):
                    os.remove(os.path.join(
                        "api/media/portfolio/", self.title, "thumb.jpg"))

                self.__original_pic = self.thumbnailpic
            except Exception as e:
                print(e)

        # print(self.thumbnailpic.name)
        super(PortfolioEntry, self).save(args, kwargs)
        # print(self.thumbnailpic.name)


class PortfolioEntryPictures(models.Model):
    def __str__(self):
        return self.entry.title + " img " + str(self.pic_pos)

    def rename_pic(instance, filename):
        dir = os.path.join("api/media/portfolio/", instance.entry.title)
        return os.path.join(dir, filename)

#   This will determine what order images will be displayed in
    pic_pos = models.IntegerField()
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)
    pic = models.ImageField(upload_to=rename_pic)

    __original_pic = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_pic = self.pic

    # overrides image data to be compressed
    def save(self, *args, **kwargs):
        if self.pic != self.__original_pic:
            try:
                # Opening the uploaded image
                img = Image.open(self.pic)
                output = BytesIO()
                # Resize/modify the image
                img = img.convert('RGB')
                # after modifications, save it to the output
                img.save(output, format='JPEG')
                output.seek(0)

                filename = "pic-" + \
                    os.path.splitext(str(self.pic.name))[0] + ".jpg"

                # Set field to modified picture
                self.pic = InMemoryUploadedFile(output, 'ImageField', filename,
                                                'image/jpeg', sys.getsizeof(output), None)

                print(self.pic)

                self.__original_pic = self.pic
            except Exception as e:
                print(e)

        super(PortfolioEntryPictures, self).save(args, kwargs)


class ContactEntry(models.Model):
    def __str__(self):
        return self.name + "-" + self.email
    name = models.CharField(default="", max_length=255)
    email = models.EmailField(default="", max_length=255)
    comment = models.TextField(default="", blank=True)


class Experience(models.Model):
    def __str__(self):
        return self.name + "-" + str(self.start_date)

    name = models.CharField(default="", max_length=255)
    title = models.CharField(default="", max_length=255)
    description = models.TextField(default="", blank=True)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    location = models.CharField(default="", max_length=255)


class Education(models.Model):
    def __str__(self):
        return self.name + "-" + str(self.start_year)

    name = models.CharField(default="", max_length=255)
    title = models.CharField(default="", max_length=255)
    description = models.TextField(default="", blank=True)

    start_year = models.IntegerField()
    end_year = models.IntegerField()

    location = models.CharField(default="", max_length=255)


class Skills(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(default="", max_length=255)
    description = models.TextField(default="", blank=True)
