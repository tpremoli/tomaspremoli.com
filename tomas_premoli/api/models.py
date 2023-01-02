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

    def rename_pic():
        pass

    def rename_pdf():
        pass

    pic = models.ImageField(upload_to="api/media/me/")
    bannerpic = models.ImageField(upload_to="api/media/me/")

    cv = models.FileField(upload_to="api/media/me/",
                          validators=[FileExtensionValidator(allowed_extensions=['pdf'])])

    # overrides image data to be compressed
    def save(self, *args, **kwargs):

        if self.pic == self._django_cleanup_original_cache["pic"]:
            print("pic is identical")
        else:
            print("pic is not identical. Updating files")
            # FIRST: self.pic
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

            if os.path.exists("api/media/me/pic.jpg"):
                os.remove("api/media/me/pic.jpg")

        if self.bannerpic == self._django_cleanup_original_cache["bannerpic"]:
            print("Bannerpic is identical")
        else:
            print("Bannerpic is not identical. Updating files")
            # THEN: self.bannerpic
            bannerimg = Image.open(self.bannerpic)
            banneroutput = BytesIO()

            bannerimg = bannerimg.convert('RGB')
            bannerimg.save(banneroutput, format='JPEG')
            banneroutput.seek(0)

            self.bannerpic = InMemoryUploadedFile(banneroutput, 'ImageField', "banner.jpg",
                                                  'image/jpeg', sys.getsizeof(banneroutput), None)

            if os.path.exists("api/media/me/banner.jpg"):
                os.remove("api/media/me/banner.jpg")

        if self.cv == self._django_cleanup_original_cache["cv"]:
            print("CV is identical")
        else:
            print("CV is not identical. Updating files")
            self.cv.name = "cv.pdf"
            if os.path.exists("api/media/me/cv.pdf"):
                os.remove("api/media/me/cv.pdf")

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
        # Need to handle other cases i.e what if title changes??
        # TODO: Handle portfolio title changes (maybe just do pk)
        if self.pk is not None:
            orig = PortfolioEntry.objects.get(pk=self.pk)

            # Handling new image options
            if orig.thumbnailpic != self.thumbnailpic:
                orig.thumbnailpic.delete(save=False)

                format = self.thumbnailpic._file.image.format

                file_location = Path("api/media/portfolio/",
                                     self.title, "thumb.{}".format(format))

                # preprocessing image
                self.thumbnailpic = process_image(
                    self.thumbnailpic, file_location, (450, 300))

        super(PortfolioEntry, self).save(args, kwargs)


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
                format = img.format
                output = BytesIO()
                # Resize/modify the image
                img = img.convert('RGB')
                # after modifications, save it to the output
                img.save(output, format=format)
                output.seek(0)

                filename = "pic-" + \
                    os.path.splitext(str(self.pic.name))[0] + "." + format

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


class TutoringData(models.Model):
    blurb = models.TextField(default="", blank=True)
    skills = models.TextField(default="", blank=True)
    classes = models.TextField(default="", blank=True)

    pic = models.ImageField(upload_to="api/media/me")

    # overrides image data to be compressed
    def save(self, *args, **kwargs):

        if self.pic == self._django_cleanup_original_cache["pic"]:
            print("pic is identical")
        else:
            print("pic is not identical. Updating files")
            # FIRST: self.pic
            # Opening the uploaded image
            img = Image.open(self.pic)
            output = BytesIO()

            img = img.convert('RGB')
            # after modifications, save it to the output
            img.save(output, format='JPEG')
            output.seek(0)

            # Set field to modified picture
            self.pic = InMemoryUploadedFile(output, 'ImageField', "tutoring.jpg",
                                            'image/jpeg', sys.getsizeof(output), None)

            if os.path.exists("api/media/me/tutoring.jpg"):
                os.remove("api/media/me/tutoring.jpg")

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
