from rest_framework import serializers
from .models import MyData

class MyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyData
        fields = ('pic', 'fname', 'lname', 'aboutme',
                  'cv', 'github_link', 'linkedin_link')
