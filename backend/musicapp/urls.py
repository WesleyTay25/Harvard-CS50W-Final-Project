from django.urls import path
from .views import PlaylistListCreateView, AddTrackToPlaylistView, RemoveTrackFromPlaylistView, HomePageView, PlaylistView, SearchSongView, PlaylistDeleteView, RefreshPreviewView

urlpatterns = [
    path('', HomePageView.as_view()),
    path('search/', SearchSongView.as_view()),
    path('playlists/', PlaylistListCreateView.as_view()), # get all playlists
    path('playlists/<int:playlist_id>/', PlaylistView.as_view()), # enter a specific playlist
    path('playlists/remove/<int:playlist_id>/', PlaylistDeleteView.as_view()), # delete specific playlist
    path('playlists/<int:playlist_id>/add/', AddTrackToPlaylistView.as_view()), # add songs to playlist
    path('playlists/<int:playlist_id>/remove/<int:track_id>/', RemoveTrackFromPlaylistView.as_view()), # remove song from playlist
    path('deezer/track/<int:track_id>/', RefreshPreviewView.as_view()), # refresh preview_url when opening up playlist
]