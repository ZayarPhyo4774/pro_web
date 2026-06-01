from django.contrib import admin

from .models import Collection


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'name_mm', 'slug')
    fieldsets = (
        ('English', {
            'fields': ('name', 'slug', 'description', 'banner_image', 'banner_image_url'),
        }),
        ('Myanmar', {
            'fields': ('name_mm', 'description_mm'),
            'description': 'Optional. Shown when visitors choose MM on the website.',
        }),
    )
