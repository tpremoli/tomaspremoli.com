from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView

from .models import MyData
from .serializers import MyDataSerializer

# Create your views here.
class GetMyData(APIView):
    serializer_class = MyDataSerializer

    def get(self, request, format=None):
        queryset = MyData.objects.all()
        data = MyDataSerializer(queryset[0]).data
        print(data)
        return Response(data, status=status.HTTP_200_OK)