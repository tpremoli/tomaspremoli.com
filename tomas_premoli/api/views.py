from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from collections import OrderedDict
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
import datetime

from .models import ContactEntry, Experience, Education, MyData, PortfolioEntry, Skills, PortfolioEntryPictures, TutoringData
from .serializers import MyDataSerializer, ContactEntrySerializer, ExperienceSerializer, EducationSerializer, SkillsSerializer, PortfolioSerializer, PortfolioPicturesSerializer, TutoringDataSerializer

# Create your views here.


class GetMyData(APIView):
    serializer_class = MyDataSerializer

    def get(self, request, format=None):
        my_data = MyData.objects.all()[0]
        data = MyDataSerializer(my_data, many=False).data
        return Response(data, status=status.HTTP_200_OK)

class GetTutoringData(APIView):
    serializer_class = TutoringDataSerializer

    def get(self, request, format=None):
        tutoring_data = TutoringData.objects.all()[0]
        data = TutoringDataSerializer(tutoring_data, many=False).data
        return Response(data, status=status.HTTP_200_OK)


class GetEES(APIView):
    def get(self, request, format=None):
        exps = Experience.objects.order_by("-start_date")
        exps_data = ExperienceSerializer(exps, many=True).data

        # Formatting for date display
        format = "%b %Y"

        # Adds duration for each experience in terms of Mos
        for exp in exps_data:
            # Adds indicator for if experience is ongoing
            if(exp["end_date"] == None):
                exp["end_date"] = "Present"

                curr_date = datetime.datetime.now()
                start_date = datetime.datetime.strptime(
                    exp["start_date"], "%Y-%m-%d")

                duration = abs(curr_date.year - start_date.year) * \
                    12 + abs(curr_date.month - start_date.month)

                if duration == 0 or duration == 1:
                    exp["duration"] = "1 mo"
                else:
                    exp["duration"] = str(duration) + " mos"

                # Formatting date for display
                exp["start_date"] = start_date.strftime(format)

            # Adds duration if not ongoing
            else:
                start_date = datetime.datetime.strptime(
                    exp["start_date"], "%Y-%m-%d")
                end_date = datetime.datetime.strptime(
                    exp["end_date"], "%Y-%m-%d")

                duration = abs(end_date.year - start_date.year) * \
                    12 + abs(end_date.month - start_date.month)

                if duration == 0 or duration == 1:
                    exp["duration"] = "1 mo"
                else:
                    exp["duration"] = str(duration) + " mos"

                # Formatting date for display
                exp["start_date"] = start_date.strftime(format)
                exp["end_date"] = end_date.strftime(format)

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

# APIView to get Portfilio entries
class GetPortfolio(APIView):
    serializer_class = PortfolioSerializer

    def get(self, request, format=None):
        queryset = PortfolioEntry.objects.order_by("-date_created")
        queryset = queryset.filter(is_visible=True)
        data = PortfolioSerializer(queryset, many=True).data
        return Response(data, status=status.HTTP_200_OK)

# APIView to get Portfilio entry pics
class GetPortfolioPics(APIView):
    serializer_class = PortfolioPicturesSerializer

    def get(self, request, format=None):
        if PortfolioEntry.objects.filter(id=self.request.query_params.get('id')).exists():
            queryset = PortfolioEntryPictures.objects.filter(
                entry__id=self.request.query_params.get('id')).order_by("pic_pos")
            data = PortfolioPicturesSerializer(queryset, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


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

            if settings.USING_AWS:
                superusers = User.objects.filter(is_superuser=True)
                subject = name + "-" + email
                message = "Message from " + name + " with email " + email + "\n\n" + comment 
                for user in superusers:
                    send_mail(
                        subject,
                        message,
                        settings.SERVER_EMAIL,
                        [user.email]
                    )

            return Response({"OK"}, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid input...'}, status=status.HTTP_400_BAD_REQUEST)
