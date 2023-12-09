from django.contrib import admin

from .models import ContactEntry, Experience, MyData, PortfolioEntry, PortfolioEntryPictures, Skills, Education, TutoringData,PDF

# Register your models here.
admin.site.register(MyData)

admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Skills)
admin.site.register(TutoringData)

admin.site.register(PortfolioEntry)
admin.site.register(PortfolioEntryPictures)

admin.site.register(ContactEntry)

admin.site.register(PDF)

