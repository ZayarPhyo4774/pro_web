from django.contrib import admin

from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        (None, {'fields': ('name', 'name_mm', 'slug')}),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'price', 'collection', 'featured', 'created_at')
    list_filter = ('featured', 'collection', 'category')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]
    search_fields = ('name', 'name_mm', 'slug')
    fieldsets = (
        ('English', {
            'fields': ('name', 'slug', 'description', 'specifications'),
        }),
        ('Myanmar', {
            'fields': ('name_mm', 'description_mm', 'specifications_mm'),
            'description': 'Optional. Shown when visitors choose MM on the website.',
        }),
        ('Catalogue', {
            'fields': ('price', 'collection', 'category', 'featured'),
        }),
    )
