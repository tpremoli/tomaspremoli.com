from rest_framework import serializers
from .models import ContactEntry, Experience, Education, Skills, PortfolioEntry, PortfolioEntryPictures



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