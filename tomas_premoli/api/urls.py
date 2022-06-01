from django.urls import path
from .views import GetMyData, ContactMe, GetEES, GetPortfolio

urlpatterns = [
    path('my-data', GetMyData.as_view()),
    path('contact-me', ContactMe.as_view()),
    path('get-ees', GetEES  .as_view()),
    path('portfolio-entries', GetPortfolio.as_view()),
]
