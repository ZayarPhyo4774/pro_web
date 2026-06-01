from django.db import models

from collections_app.models import Collection


class Category(models.Model):
    name = models.CharField(max_length=120)
    name_mm = models.CharField(max_length=120, blank=True, verbose_name='Name (Myanmar)')
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    name_mm = models.CharField(max_length=200, blank=True, verbose_name='Name (Myanmar)')
    slug = models.SlugField(unique=True)
    description = models.TextField()
    description_mm = models.TextField(blank=True, verbose_name='Description (Myanmar)')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    collection = models.ForeignKey(
        Collection, on_delete=models.SET_NULL, null=True, related_name='products'
    )
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products'
    )
    specifications = models.JSONField(default=dict, blank=True)
    specifications_mm = models.JSONField(default=dict, blank=True, verbose_name='Specifications (Myanmar)')
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    image_url = models.URLField(blank=True)
    alt_text = models.CharField(max_length=200, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    @property
    def url(self):
        if self.image:
            return self.image.url
        return self.image_url
