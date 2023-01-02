from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image
from pathlib import Path
from io import BytesIO
import traceback
import sys
import os

# Create your models here
# TODO: Fix cv and pic saving


def process_image(pic, file_location, ideal_dimensions=None):
    # Opening the uploaded image
    img = Image.open(pic)
    format = img.format
    output = BytesIO()

    if ideal_dimensions:
        # Resize/modify the image
        width, height = img.size

        aspect = width / float(height)

        # Crop image into aspect ratio 3:2
        ideal_width = ideal_dimensions[0]
        ideal_height = ideal_dimensions[1]

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
    img.save(output, format=format)
    output.seek(0)

    # Set field to modified picture
    return InMemoryUploadedFile(output, 'ImageField', file_location, 'image/jpeg', sys.getsizeof(output), None)


class MyData(models.Model):
    def __str__(self):
        return "Tomas Premoli"

    def rename_pic(instance, filename):
        return Path("api/media/me/pic.{}".format(filename.split(".")[-1]))
    
    def rename_bannerpic(instance, filename):
        return Path("api/media/me/banner.{}".format(filename.split(".")[-1]))
    
    def rename_pdf(instance, filename):
        return Path("api/media/me/cv.{}".format(filename.split(".")[-1]))

    pic = models.ImageField(upload_to=rename_pic)
    bannerpic = models.ImageField(upload_to=rename_bannerpic)

    cv = models.FileField(upload_to=rename_pdf,
                          validators=[FileExtensionValidator(allowed_extensions=['pdf'])])

    def save(self, *args, **kwargs):
        # If this is the only MyData
        if self.pk is None:
            me_format = self.pic._file.image.format

            me_location = Path("api/media/me/pic.{}".format(me_format))

            self.pic = process_image(
                self.pic, me_location, (400, 400))


            banner_format = self.bannerpic._file.image.format
            banner_location = Path("api/media/me/banner.{}".format(banner_format))

            # preprocessing image
            self.bannerpic = process_image(
                self.bannerpic, banner_location)
        else:
            # If we're updating MyData
            orig = MyData.objects.get(pk=self.pk)
            # Handling new image options
            if orig.pic != self.pic:
                orig.pic.delete(save=False)

                me_format = self.pic._file.image.format

                me_location = Path("api/media/me/pic.{}".format(me_format))

                self.pic = process_image(
                    self.pic, me_location, (400, 400))
                
            if orig.bannerpic != self.bannerpic:
                orig.bannerpic.delete(save=False)
                
                banner_format = self.bannerpic._file.image.format
                banner_location = Path("api/media/me/banner.{}".format(banner_format))

                # preprocessing image
                self.bannerpic = process_image(
                    self.bannerpic, banner_location)
            
            if orig.cv  != self.cv:
                orig.cv.delete(save=False)
                
                
        super(MyData, self).save()


class PortfolioEntry(models.Model):
    def __str__(self):
        return self.title

    def rename_pic(instance, filename):
        return Path("api/media/portfolio/", instance.title, "thumb.{}".format(filename.split(".")[-1]))

    def rename_vid(instance, filename):
        return Path("api/media/portfolio/", instance.title, "video.{}".format(filename.split(".")[-1]))

    # These are used in small card display
    thumbnailpic = models.ImageField(upload_to=rename_pic)

    video = models.FileField(default="", blank=True, upload_to=rename_vid)

    title = models.CharField(default="title", max_length=255)
    blurb = models.CharField(default="blurb", max_length=255)

    description = models.TextField(default="description")

    date_created = models.DateField()

    github_link = models.CharField(default="", blank=True, max_length=255)
    link = models.CharField(default="", blank=True, max_length=255)

    # overrides image data to be compressed
    def save(self, *args, **kwargs):
        # If this is a new object we have to run everything
        if self.pk is None:
            format = self.thumbnailpic._file.image.format

            # TODO: Handle portfolio title changes (maybe just do pk)
            # Need to handle other cases i.e what if title changes??
            file_location = Path("api/media/portfolio/",
                                 self.title, "thumb.{}".format(format))

            # preprocessing image
            self.thumbnailpic = process_image(
                self.thumbnailpic, file_location, (450, 300))

        # If object already exists we update the data
        else:
            orig = PortfolioEntry.objects.get(pk=self.pk)

            # if the pic has been updated
            if orig.thumbnailpic != self.thumbnailpic:
                orig.thumbnailpic.delete(save=False)

                format = self.thumbnailpic._file.image.format

                file_location = Path("api/media/portfolio/",
                                     self.title, "thumb.{}".format(format))

                # preprocessing image
                self.thumbnailpic = process_image(
                    self.thumbnailpic, file_location, (450, 300))
                
            # if the video has been updated
            if orig.video != self.video:
                orig.video.delete(save=False)

        super(PortfolioEntry, self).save(args, kwargs)


class PortfolioEntryPictures(models.Model):
    def __str__(self):
        return self.entry.title + " img " + str(self.pic_pos)

    # TODO: come up with a better naming thing (won't be an issue if we can unique=true for pic_pos-entry combos)
    def rename_pic(instance, filename):
        return Path("api/media/portfolio/", instance.entry.title, "pic-{}.{}".format(instance.pic_pos,filename.split(".")[-1]))

#   This will determine what order images will be displayed in
    pic = models.ImageField(upload_to=rename_pic)
    pic_pos = models.IntegerField()
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)


    def save(self, *args, **kwargs):
        # If we're adding an image
        if self.pk is None:
            format = self.pic._file.image.format

            pic_location = Path("api/media/portfolio/", self.entry.title, "pic-{}.{}".format(self.pic_pos,format))

            self.pic = process_image(
                self.pic, pic_location)
        
        # If we're changing an image
        else:
            orig = PortfolioEntryPictures.objects.get(pk=self.pk)
            # Handling new image options
            if orig.pic != self.pic:
                orig.pic.delete(save=False)

                format = self.pic._file.image.format

                pic_location = Path("api/media/portfolio/", self.entry.title, "pic-{}.{}".format(self.pic_pos,format))

                self.pic = process_image(
                    self.pic, pic_location)

        super(PortfolioEntryPictures, self).save(args, kwargs)


class ContactEntry(models.Model):
    def __str__(self):
        return self.name + "-" + self.email
    name = models.CharField(default="", max_length=255)
    email = models.EmailField(default="", max_length=255)
    comment = models.TextField(default="", blank=True)


class TutoringData(models.Model):
    def rename_pic(instance, filename):
        return Path("api/media/me/tutoring.{}".format(filename.split(".")[-1]))

    blurb = models.TextField(default="", blank=True)
    skills = models.TextField(default="", blank=True)
    classes = models.TextField(default="", blank=True)

    pic = models.ImageField(upload_to=rename_pic)

    # overrides image data to be compressed
    def save(self, *args, **kwargs):
        # If this is the only TutoringData
        if self.pk is None:
            format = self.pic._file.image.format

            # Can these file_location things use rename_pic??
            file_location = Path("api/media/me/tutoring.{}".format(format))

            self.pic = process_image(
                self.pic, file_location)

        # If we're updating TutoringData
        else:
            orig = TutoringData.objects.get(pk=self.pk)
            # Handling new image options
            if orig.pic != self.pic:
                orig.pic.delete(save=False)

                format = self.pic._file.image.format

                # Can these file_location things use rename_pic??
                file_location = Path("api/media/me/tutoring.{}".format(format))

                self.pic = process_image(
                    self.pic, file_location)

        super(TutoringData, self).save(args, kwargs)


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
