from django.contrib import admin

from .models import ContactEntry, Experience, PortfolioEntry, PortfolioEntryPictures, Skills, Education

# Register your models here.
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Skills)

admin.site.register(PortfolioEntry)
admin.site.register(PortfolioEntryPictures)

admin.site.register(ContactEntry)

