from rest_framework import serializers
from .models import HomeSection

class HomeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeSection
        fields = '__all__'
