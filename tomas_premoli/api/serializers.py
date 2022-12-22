from rest_framework import serializers
from .models import MyData, ContactEntry, Experience, Education, Skills, PortfolioEntry, PortfolioEntryPictures, TutoringData


class MyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyData
        fields = '__all__'
        
class TutoringDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutoringData
        fields = '__all__'


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


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioEntry
        fields = '__all__'


class PortfolioPicturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioEntryPictures
        fields = '__all__'
