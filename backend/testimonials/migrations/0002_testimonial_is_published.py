from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testimonials', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='testimonial',
            name='is_published',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='testimonial',
            name='name',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='testimonial',
            name='position',
            field=models.CharField(max_length=120),
        ),
    ]
