from dataclasses import field

from apps.alcohol.serializer import AlcoholSerializer
from .models import Ranking,Review
from rest_framework import serializers

class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking
        fields = '__all__'
        
    # serializers.Serializer 일 경우
    # def create(self, validated_data):
    #     return Rank.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.title = validated_data.get('title', instance.title)
    #     instance.content = validated_data.get('content', instance.content)
    #     instance.save()
    #     return instance
 
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model =Review
        fields='__all__'
