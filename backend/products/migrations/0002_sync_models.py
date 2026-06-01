import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collections_app', '0002_collection_fields'),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField(unique=True)),
            ],
            options={
                'verbose_name_plural': 'categories',
                'ordering': ['name'],
            },
        ),
        migrations.AddField(
            model_name='product',
            name='specifications',
            field=models.JSONField(blank=True, default=dict),
        ),
        migrations.AddField(
            model_name='product',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='products',
                to='products.category',
            ),
        ),
        migrations.AlterField(
            model_name='product',
            name='collection',
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='products',
                to='collections_app.collection',
            ),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=12),
        ),
        migrations.RenameField(
            model_name='productimage',
            old_name='order',
            new_name='sort_order',
        ),
        migrations.RenameField(
            model_name='productimage',
            old_name='image',
            new_name='image_url',
        ),
        migrations.AddField(
            model_name='productimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='products/'),
        ),
        migrations.AddField(
            model_name='productimage',
            name='alt_text',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterModelOptions(
            name='productimage',
            options={'ordering': ['sort_order', 'id']},
        ),
        migrations.DeleteModel(
            name='Specification',
        ),
    ]
