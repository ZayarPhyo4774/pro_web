from django.contrib import admin

from .models import Inquiry, NewsletterSubscriber


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'product', 'is_resolved', 'created_at')
    list_filter = ('is_resolved',)


@admin.register(NewsletterSubscriber)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'subscribed_at')
    list_filter = ('is_active',)
