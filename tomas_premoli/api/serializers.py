from rest_framework import serializers
from .models import ContactEntry, MyData, Experience, Education, Skills


class MyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyData
        fields = ('pic', 'aboutme',
                  'cv', 'github_link', 'linkedin_link')


class ContactEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEntry
        fields = ('name', 'email', 'comment')

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'