from rest_framework import serializers
from .models import (
    Anime, Episode, Reading, Chapter,
    Subscription, VotePoll, VoteOption
)

# ============================
# Episode Serializer (for Anime)
# ============================
class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = ['id', 'episode_number', 'video_file']

# ============================
# Anime Serializer (with nested Episodes)
# ============================
class AnimeSerializer(serializers.ModelSerializer):
    episodes = EpisodeSerializer(many=True, read_only=True)

    class Meta:
        model = Anime
        fields = ['id', 'title', 'synopsis', 'rating', 'language', 'category', 'image', 'episodes']

# ============================
# Chapter Serializer (for Reading)
# ============================
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'chapter_number', 'chapter_file']

# ============================
# Reading Serializer (with nested Chapters)
# ============================
class ReadingSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Reading
        fields = ['id', 'title', 'synopsis', 'rating', 'category', 'image', 'chapters']

# ============================
# Subscription Serializer
# ============================
class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

# ============================
# Vote Option Serializer
# ============================
class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = ['id', 'name', 'image', 'votes']

# ============================
# Vote Poll Serializer (with nested Options)
# ============================
class VotePollSerializer(serializers.ModelSerializer):
    options = VoteOptionSerializer(many=True, read_only=True)

    class Meta:
        model = VotePoll
        fields = ['id', 'question', 'created_at', 'options']
