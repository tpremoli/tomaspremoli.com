from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from collections import OrderedDict
import datetime

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
        exps = Experience.objects.order_by("-start_date")
        exps_data = ExperienceSerializer(exps, many=True).data

        # Adds duration for each experience in terms of Mos
        for exp in exps_data:
            # Adds indicator for if experience is ongoing
            if(exp["end_date"] == None):
                exp["end_date"] = "Present"

                curr_date = datetime.datetime.now()
                start_date = datetime.datetime.strptime(exp["start_date"], "%Y-%m-%d")

                duration = abs(curr_date.year - start_date.year) * 12 + abs(curr_date.month - start_date.month)

                if duration == 0 or duration == 1:
                    exp["duration"] = "1 mo"
                else:
                    exp["duration"] = str(duration) + " mos"
            
            # Adds duration if not ongoing
            else:
                start_date = datetime.datetime.strptime(exp["start_date"], "%Y-%m-%d")
                end_date = datetime.datetime.strptime(exp["end_date"], "%Y-%m-%d")

                duration = abs(end_date.year - start_date.year) * 12 + abs(end_date.month - start_date.month)

                if duration == 0 or duration == 1:
                    exp["duration"] = "1 mo"
                else:
                    exp["duration"] = str(duration) + " mos"

        edcs = Education.objects.order_by("-start_year")
        edcs_data = EducationSerializer(edcs, many=True).data

        skills = Skills.objects.order_by()
        skills_data = SkillsSerializer(skills, many=True).data

        # combining all 3 into one makes it much easier to deal with
        data = OrderedDict({
            'experiences': exps_data,
            'education': edcs_data,
            'skills': skills_data
            })

        return Response(data, status=status.HTTP_200_OK)



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
