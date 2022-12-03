from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ['user_id', 'password', 'nickname', 'gender', 'birth']

# class SurveySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Survey
#         fields = '__all__'

