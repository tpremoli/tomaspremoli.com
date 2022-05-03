from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics

from .models import MyData
from .serializers import MyDataSerializer

# Create your views here.
class MyDataView(generics.ListAPIView):
    queryset = MyData.objects.all()
    serializer_class = MyDataSerializer