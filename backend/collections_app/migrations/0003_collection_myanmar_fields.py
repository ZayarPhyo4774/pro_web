from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collections_app', '0002_collection_fields'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='name_mm',
            field=models.CharField(blank=True, max_length=200, verbose_name='Name (Myanmar)'),
        ),
        migrations.AddField(
            model_name='collection',
            name='description_mm',
            field=models.TextField(blank=True, verbose_name='Description (Myanmar)'),
        ),
    ]
