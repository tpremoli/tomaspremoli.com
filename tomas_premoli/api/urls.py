from django.urls import path
from .views import GetMyData, ContactMe

urlpatterns = [
    path('my-data', GetMyData.as_view()),
    path('contact-me', ContactMe.as_view()),
]
