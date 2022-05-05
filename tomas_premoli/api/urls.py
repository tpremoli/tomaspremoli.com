from django.urls import path
from .views import GetMyData

urlpatterns = [
    path('my-data', GetMyData.as_view()),
]
