from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} created by {self.user.username} at {self.created_at}"

class Track(models.Model):
    deezer_id = models.CharField(max_length=100, unique=True)  # e.g. "3135556"
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    duration = models.DecimalField(max_digits=6, decimal_places=2)
    preview_url = models.URLField()  # Deezer's 30s preview
    album_cover = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} - {self.artist}"
    
class PlaylistTrack(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('playlist', 'track')

    def __str__(self):
        return f"{self.playlist.name} → {self.track.title}"
    