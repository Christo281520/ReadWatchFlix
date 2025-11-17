from django.urls import path
from .views import HomeSectionListCreateView, HomeSectionDetailView

urlpatterns = [
    path('home-sections/', HomeSectionListCreateView.as_view(), name='home-section-list-create'),
    path('home-sections/', HomeSectionListCreateView.as_view(), name='home-section-list-create'),
    path('home-sections/<int:pk>/', HomeSectionDetailView.as_view(), name='home-section-detail'),
]
