# Generated by Django 5.2 on 2025-06-11 06:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musicapp', '0002_playlist_description'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='playlisttrack',
            options={},
        ),
        migrations.RemoveField(
            model_name='playlisttrack',
            name='order',
        ),
    ]
