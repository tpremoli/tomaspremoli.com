from django.urls import path
from .views import MyDataView

urlpatterns = [
    path('home', MyDataView.as_view())
]
