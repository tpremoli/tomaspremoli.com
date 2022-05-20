from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView

from .models import ContactEntry, MyData, Experience, Education, Skills
from .serializers import MyDataSerializer, ContactEntrySerializer, ExperienceSerializer, EducationSerializer, SkillsSerializer

# Create your views here.


class GetMyData(APIView):
    serializer_class = MyDataSerializer

    def get(self, request, format=None):
        queryset = MyData.objects.all()
        data = MyDataSerializer(queryset[0]).data
        print(data)
        return Response(data, status=status.HTTP_200_OK)


class GetEES(APIView):
    def get(self, request, format=None):
        exps = Experience.objects.all()
        exps_data = ExperienceSerializer(exps, many=True).data

        edcs = Education.objects.all()
        edcs_data = EducationSerializer(edcs, many=True).data

        skills = Skills.objects.all()
        skills_data = SkillsSerializer(skills, many=True).data

        print(exps_data)
        print(edcs_data)
        print(skills_data)

        return Response(exps_data, status=status.HTTP_200_OK)


class ContactMe(APIView):
    serializer_class = ContactEntrySerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get("name")
            email = serializer.data.get("email")
            comment = serializer.data.get("comment")

            contact_entry = ContactEntry(
                name=name, email=email, comment=comment)

            contact_entry.save()

            print(contact_entry)

            return Response({"OK"}, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid input...'}, status=status.HTTP_400_BAD_REQUEST)
