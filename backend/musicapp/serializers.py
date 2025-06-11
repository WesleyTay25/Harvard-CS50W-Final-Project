from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Track, Playlist, PlaylistTrack


"""Serializers are used to convert complext django models into simple JSON format for backend data to be called to the frontend"""



# serializing user info
# once the user registers and sends over his username and password in JSON format, brings it here to deserialize
class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User # tells DRF this serializer is based on Django's built in User model
        fields = ["id", "username", "password"] # tells DRF only expose these three fields when sending or receiving data 
        extra_kwargs = {"password": {"write_only": True}} # Prevents the password from being included in API responses so password doesnt get sent back as JSON but still allows for input

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # hashes data
        return user
    
class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'deezer_id', 'title', 'artist','duration','preview_url', 'album_cover']

class PlaylistTrackSerializer(serializers.ModelSerializer):
    track = TrackSerializer()

    class Meta:
        model = PlaylistTrack
        fields = ['track', 'added_at']

class PlaylistSerializer(serializers.ModelSerializer):
    tracks = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'created_at', 'tracks', 'description']

    def get_tracks(self, obj):
        playlist_tracks = PlaylistTrack.objects.filter(playlist=obj)
        return PlaylistTrackSerializer(playlist_tracks, many=True).data