from django.contrib import admin
from .models import (
    Anime, Episode, Reading, Chapter,
    Profile, Subscription,
    VotePoll, VoteOption
)
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# ============================
# Inline Admins for Related Models
# ============================

class EpisodeInline(admin.TabularInline):
    model = Episode
    extra = 1

class AnimeAdmin(admin.ModelAdmin):
    inlines = [EpisodeInline]

class ChapterInline(admin.TabularInline):
    model = Chapter
    extra = 1

class ReadingAdmin(admin.ModelAdmin):
    inlines = [ChapterInline]

class VoteOptionInline(admin.TabularInline):
    model = VoteOption
    extra = 4  # Default 4 options

class VotePollAdmin(admin.ModelAdmin):
    inlines = [VoteOptionInline]
    list_display = ('question', 'created_at')
    search_fields = ('question',)

# ============================
# Profile & Subscription Admins
# ============================

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_subscribed', 'subscription_plan', 'subscribed_on')
    list_filter = ('is_subscribed', 'subscription_plan')

class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'status', 'purchased_on', 'expires_on')
    list_filter = ('plan', 'status')

# ============================
# Custom User Admin
# ============================

class CustomUserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_superuser', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'date_joined')
    ordering = ('-date_joined',)

# ============================
# Admin Registrations
# ============================

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Anime, AnimeAdmin)
admin.site.register(Reading, ReadingAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(VotePoll, VotePollAdmin)
