from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collections_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collection',
            old_name='banner_image',
            new_name='banner_image_url',
        ),
        migrations.AddField(
            model_name='collection',
            name='banner_image',
            field=models.ImageField(blank=True, null=True, upload_to='collections/'),
        ),
        migrations.AddField(
            model_name='collection',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AlterField(
            model_name='collection',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]
