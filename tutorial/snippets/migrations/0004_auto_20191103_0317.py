# Generated by Django 2.2.6 on 2019-11-03 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0003_clubdata'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clubdata',
            name='img_url',
            field=models.CharField(blank=True, default='', max_length=1024),
        ),
        migrations.AlterField(
            model_name='clubdata',
            name='link',
            field=models.CharField(blank=True, default='', max_length=1024),
        ),
        migrations.AlterField(
            model_name='clubdata',
            name='location',
            field=models.CharField(blank=True, default='', max_length=1024),
        ),
        migrations.AlterField(
            model_name='clubdata',
            name='name',
            field=models.CharField(blank=True, default='', max_length=1024),
        ),
        migrations.AlterField(
            model_name='clubdata',
            name='other',
            field=models.CharField(blank=True, default='', max_length=1024),
        ),
    ]
