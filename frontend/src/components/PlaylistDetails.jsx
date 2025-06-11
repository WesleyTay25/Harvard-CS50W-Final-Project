import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { usePlayer } from "./PlayerContext";
import api from "../api";
import playbutton from "../assets/spotify-play-button-modified.png"

function PlaylistDetails(){
  const { playTrack } = usePlayer();

  const { id } = useParams(); // gets the playlist ID from the URL
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);

  // api call for playlist info
    useEffect(() => {
        const fetchPlaylists = async () => {
        try {
        const response = await api.get(`/playlists/${id}/`); // Adjust the endpoint as needed
        console.log(response.data.tracks)
        setSongs(response.data.tracks);
        setPlaylist(response.data.playlist); // all data gathered
        console.log(response.data.playlist)

        // preview_url resets after a while bruh
        const outdatedsongs = response.data.tracks

        const updatedsongs = await Promise.all(
            outdatedsongs.map(async (track) => {
                try{
                    const deezerRefresh = await api.get(`/deezer/track/${track.deezer_id}/`); // api call to django then call to deezer to refresh preview_url
                    console.log("Successfully refreshed")

                    return {
                        ...track, // return everything same except for preview_url
                        preview_url: deezerRefresh.data.preview_url
                    };
                }
                catch(error){
                    console.warn(`Failed to refresh preview_url for track ${track.title}: ${track.id}`)
                    return track;
                }
            })
        );

        setSongs(updatedsongs);

        } catch (error) {
        console.error('Error fetching playlists:', error);
        }
    };

    fetchPlaylists();
    }, [id]);  

    function formatdate(rawdate) {
        const date = new Date(rawdate)
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    function formatduration(seconds){
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`
    }

    const handledelete = async (trackid) => {
        try{
            await api.delete(`/playlists/${id}/remove/${trackid}/`)
            setSongs(prev => prev.filter(track => track.id !== trackid));
            alert("Deleted succesfully!")
        }
        catch (error) {
            console.error("Failed", error)
            alert("Delete failed")
        }
    }

     if (!playlist) { // if data hasnt loaded yet, show this thing first or else it will return error
    return (
      <div className="min-h-screen bg-[#121212] text-white p-6">
        <p>Loading playlist...</p>
      </div>
    );
  }

    return(
     <div className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{playlist.name}</h1>
      <p className="text-lg font-semibold mb-4">{playlist.description}</p>
      <p className="text-gray-400 mb-4">Created at {formatdate(playlist.created_at)}</p>
      <hr className="mb-6"></hr>
            <ul className="space-y-4">
                {songs.map((track, index) => (
                    <li key={track.id} className="flex items-center justify-between px-1">
                        <div className="flex items-center space-x-4">
                            <img
                                src={track.album_cover}
                                alt={track.title}
                                className="w-10 h-10 rounded"
                            />
                            <div>
                                <p className="font-medium">{track.title}</p>
                                <p className="text-sm text-gray-400">{track.artist}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-sm text-gray-300">{formatduration(track.duration)}</span>
                            <button onClick={() => {playTrack({
                            title: track.title,
                            artist: track.artist,
                            preview: track.preview_url,
                            cover: track.album_cover}, index, songs);}}>    
                            <img src={playbutton} className="w-8 h-8" alt="play"/>                           
                            </button>
                            <button  onClick={() => handledelete(track.id)} className="text-sm bg-red-600 text-white rounded p-1 hover:bg-red-800">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
    </div>
    )
}

export default PlaylistDetails