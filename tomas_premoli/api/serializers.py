from rest_framework import serializers
from .models import MyData, ContactEntry


class MyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyData
        fields = ('pic', 'aboutme',
                  'cv', 'github_link', 'linkedin_link')


class ContactEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEntry
        fields = ('name', 'email', 'comment')
