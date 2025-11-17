from django.contrib import admin
from .models import HomeSection

@admin.register(HomeSection)
class HomeSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'section_type', 'created_at')
