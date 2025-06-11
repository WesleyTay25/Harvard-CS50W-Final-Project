from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, TrackSerializer, PlaylistSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Track, Playlist, PlaylistTrack
from rest_framework.views import APIView
from rest_framework.response import Response
import requests



# Create user account. 
class CreateUserView(generics.CreateAPIView): # generics.CreateAPIView auto handles POST requests. It accepts incoming JSON data, validates it using serializer class, saves the data as a model instance and returns a 201 response status
    # when a user registers, he puts in his username and password
    # BUT it is in JSON format haha so now it needs to be deserialised
    queryset = User.objects.all() 
    serializer_class = UserSerializer # Tells DRF how to convert the incoming JSON into a User instance
    permission_classes = [AllowAny] # anyone can use this function 
# auto saves data into django model

# rmb to serialize and add into url.py
#--------------------------------------------------------------------------------------------------------------
# Homepage shows all Playlists and username 
class HomePageView(APIView):
    permission_classes = [IsAuthenticated]
    
    # need to define get/post request
    def get(self, request):
        username = request.user.username

        playlists = Playlist.objects.filter(user=request.user)
        serializer = PlaylistSerializer(playlists, many=True)
        return Response({
            "username": username,
            "playlists": serializer.data
        })

# search for songs
class SearchSongView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        query = request.query_params.get('q')
        if not query:
            return Response({"error": "Enter search query"}, status=400)
        
        url = f"https://api.deezer.com/search?q={query}"
        try:
            response = requests.get(url) # get raw JSON string data unreadable
            data = response.json() # parse the JSON repsonse into something that is actually readable
            return Response(data)
        except requests.exceptions.RequestException as error:
            return Response({"error": str(error)}, status=500)

# get tracks from a playlist
class PlaylistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, playlist_id):
        tracks = PlaylistTrack.objects.filter(playlist_id=playlist_id, playlist__user=request.user)
        playlist = Playlist.objects.get(id=playlist_id, user=request.user)
        track_serializer = TrackSerializer([pt.track for pt in tracks], many=True)
        playlist_serializer = PlaylistSerializer(playlist)
        return Response({
            "playlist": playlist_serializer.data,
            "tracks": track_serializer.data
        })
    
# create playlist function
class PlaylistListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        playlists = Playlist.objects.filter(user=request.user)
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        name = request.data.get('name')
        description = request.data.get('description')
        if not name:
            return Response({'error': 'Enter Name'}, status=400)
        playlist = Playlist.objects.create(user=request.user, name=name, description=description)
        return Response({'id': playlist.id, 'name': playlist.name}, status=201)
    
# remove playlist
class PlaylistDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, playlist_id):
        try:
            playlist = Playlist.objects.get(id=playlist_id, user=request.user)
            playlist.delete()
            return Response({"message": "Playlist removed successfully."}, status=201)
        except Playlist.DoesNotExist:
            return Response({"error": "Playlist not found"}, status=404)


# add track to playlist
class AddTrackToPlaylistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, playlist_id): # doesnt require serializer as all input is handled manually
        data = request.data
        try:
            playlist = Playlist.objects.get(id=playlist_id, user=request.user)
        except Playlist.DoesNotExist:
            return Response({"error": "playlist not found"}, status=404)

        # checks if track is already in, if in then get, if not in then create
        track, created = Track.objects.get_or_create(
            deezer_id=data['deezer_id'],
            defaults={
                'title': data['title'],
                'artist': data['artist'],
                'duration': data['duration'],
                'preview_url': data['preview_url'],
                'album_cover': data['cover_url'] # can accept blanks the rest cannot
            }
        )

        _, pt_created = PlaylistTrack.objects.get_or_create(playlist=playlist, track=track)

        if not pt_created:
            return Response({"message": "Track already in playlist"}, status=200)

        return Response({'message': 'Track Added'}, status=201)
    
# remove track from playlist
class RemoveTrackFromPlaylistView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, playlist_id, track_id):
        try:
            playlist = Playlist.objects.get(user=request.user, id=playlist_id)
            track = Track.objects.get(id = track_id)
            playlist_track = PlaylistTrack.objects.get(playlist=playlist, track=track)
            playlist_track.delete()
            return Response({'message': 'Track Removed'}, status=200)
        except PlaylistTrack.DoesNotExist:
            return Response({'error': 'Track not found'}, status=404)
        except Playlist.DoesNotExist:
            return Response({'error': 'Playlist not found.'}, status=404)
        except Track.DoesNotExist:
            return Response({'error': 'Track not found.'}, status=404)

# refresh preview_url from deezer :(
class RefreshPreviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, track_id):    # 2nd positional argument must always be "request", any other URL parameters come after
        url = f"https://api.deezer.com/track/{track_id}"
        try:
            r = requests.get(url)
            r.raise_for_status()
            data = r.json()
            preview_url = data.get("preview")
            return Response({"preview_url": preview_url})
        except:
            return Response({"error": "Failed to fetch from Deezer"}, status=500)
          
