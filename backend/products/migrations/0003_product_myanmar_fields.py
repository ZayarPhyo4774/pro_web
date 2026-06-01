from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_sync_models'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='name_mm',
            field=models.CharField(blank=True, max_length=200, verbose_name='Name (Myanmar)'),
        ),
        migrations.AddField(
            model_name='product',
            name='description_mm',
            field=models.TextField(blank=True, verbose_name='Description (Myanmar)'),
        ),
        migrations.AddField(
            model_name='product',
            name='specifications_mm',
            field=models.JSONField(blank=True, default=dict, verbose_name='Specifications (Myanmar)'),
        ),
        migrations.AddField(
            model_name='category',
            name='name_mm',
            field=models.CharField(blank=True, max_length=120, verbose_name='Name (Myanmar)'),
        ),
    ]
