from django.db import models
from django.contrib.auth.models import User

# ========================
# Anime / Video Models
# ========================
class Anime(models.Model):
    CATEGORY_CHOICES = [
        ('Series', 'Series'),
        ('Movie', 'Movie')
    ]
    title = models.CharField(max_length=255)
    synopsis = models.TextField()
    rating = models.FloatField()
    language = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='Series')
    image = models.ImageField(upload_to='anime_images/', null=True, blank=True)

    def __str__(self):
        return self.title

class Episode(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='episodes')
    episode_number = models.IntegerField()
    video_file = models.FileField(upload_to='videos/', null=True, blank=True)

    def __str__(self):
        return f"{self.anime.title} - Episode {self.episode_number}"

# ========================
# Reading Models
# ========================
class Reading(models.Model):
    TYPE_CHOICES = [
        ('manga', 'Manga'),
        ('manhwa', 'Manhwa'),
        ('manhua', 'Manhua')
    ]
    title = models.CharField(max_length=255)
    synopsis = models.TextField()
    rating = models.FloatField()
    category = models.CharField(max_length=10, choices=TYPE_CHOICES, default='manga')
    image = models.ImageField(upload_to='reading_images/', null=True, blank=True)

    def __str__(self):
        return self.title

class Chapter(models.Model):
    reading = models.ForeignKey(Reading, on_delete=models.CASCADE, related_name='chapters')
    chapter_number = models.IntegerField()
    chapter_file = models.FileField(upload_to='chapters/', null=True, blank=True)

    def __str__(self):
        return f"{self.reading.title} - Chapter {self.chapter_number}"

# ========================
# User Profile & Subscription
# ========================
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_subscribed = models.BooleanField(default=False)
    subscription_plan = models.CharField(max_length=50, default='Free')
    subscribed_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

class Subscription(models.Model):
    PLAN_CHOICES = [
        ('1 Month', '1 Month'),
        ('3 Months', '3 Months'),
        ('6 Months', '6 Months'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan = models.CharField(max_length=20, choices=PLAN_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='Active')
    purchased_on = models.DateTimeField(auto_now_add=True)
    expires_on = models.DateTimeField()

    def __str__(self):
        return f"{self.user.username} - {self.plan} - {self.status}"

# ========================
# Voting System
# ========================
class VotePoll(models.Model):
    question = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

class VoteOption(models.Model):
    poll = models.ForeignKey(VotePoll, on_delete=models.CASCADE, related_name='options')
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='vote_images/')
    votes = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.poll.question})"
