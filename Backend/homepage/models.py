
from django.db import models

class HomeSection(models.Model):
    SECTION_CHOICES = [
        ('upcoming_anime', 'Upcoming Anime'),
        ('upcoming_reading', 'Upcoming Reading'),
        ('trending_movie', 'Trending Movie'),
        ('trending_series', 'Trending Series'),
        ('trending_manga', 'Trending Manga'),
        ('trending_manhua', 'Trending Manhua'),
        ('trending_manhwa', 'Trending Manhwa'),
        ('most_popular', 'Most Popular'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    section_type = models.CharField(max_length=50, choices=SECTION_CHOICES)
    image = models.ImageField(upload_to='home_images/')
    video = models.FileField(upload_to='home_videos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.get_section_type_display()})"
