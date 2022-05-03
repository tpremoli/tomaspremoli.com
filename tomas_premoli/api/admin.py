from django.contrib import admin

from .models import ContactEntry, MyData, PortfolioEntry, PortfolioEntryPictures

# Register your models here.
admin.site.register(MyData)
admin.site.register(PortfolioEntry)
admin.site.register(PortfolioEntryPictures)
# admin.site.register(ContactEntry)
