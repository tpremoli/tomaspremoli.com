from django.urls import path
from .views import ContactMe, GetEES, GetPortfolio, GetPortfolioPics

urlpatterns = [
    path('contact-me', ContactMe.as_view()),
    path('get-ees', GetEES.as_view()),
    path('portfolio-entries', GetPortfolio.as_view()),
    path('portfolio-pictures', GetPortfolioPics.as_view()),
]
