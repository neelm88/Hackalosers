# Generated by Django 2.2.6 on 2019-11-03 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0002_userdata'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClubData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default='', max_length=100)),
                ('mission', models.CharField(blank=True, default='', max_length=1024)),
                ('affiliations', models.CharField(blank=True, default='', max_length=255)),
                ('link', models.CharField(blank=True, default='', max_length=100)),
                ('img_url', models.CharField(blank=True, default='', max_length=255)),
                ('location', models.CharField(blank=True, default='', max_length=100)),
                ('other', models.CharField(blank=True, default='', max_length=100)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
    ]
