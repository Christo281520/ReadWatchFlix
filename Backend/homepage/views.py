from rest_framework import generics
from .models import HomeSection
from .serializers import HomeSectionSerializer

class HomeSectionListCreateView(generics.ListCreateAPIView):
    queryset = HomeSection.objects.all()
    serializer_class = HomeSectionSerializer

class HomeSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HomeSection.objects.all()
    serializer_class = HomeSectionSerializer
