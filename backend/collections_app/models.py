from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=200)
    name_mm = models.CharField(max_length=200, blank=True, verbose_name='Name (Myanmar)')
    slug = models.SlugField(unique=True)
    description = models.TextField()
    description_mm = models.TextField(blank=True, verbose_name='Description (Myanmar)')
    banner_image = models.ImageField(upload_to='collections/', blank=True, null=True)
    banner_image_url = models.URLField(blank=True, help_text='External URL when no upload')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def banner(self):
        if self.banner_image:
            return self.banner_image.url
        return self.banner_image_url or ''
