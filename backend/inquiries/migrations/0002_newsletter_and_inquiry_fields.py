import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_sync_models'),
        ('inquiries', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewsletterSubscriber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('subscribed_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['-subscribed_at'],
            },
        ),
        migrations.AddField(
            model_name='inquiry',
            name='is_resolved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='inquiry',
            name='product',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to='products.product',
            ),
        ),
        migrations.AlterField(
            model_name='inquiry',
            name='name',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='inquiry',
            name='phone',
            field=models.CharField(blank=True, max_length=40),
        ),
    ]
