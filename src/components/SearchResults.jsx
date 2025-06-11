import { useState, useEffect } from "react";
import api from "../api";
import { usePlayer } from "./PlayerContext";
import playbutton from "../assets/spotify-play-button-modified.png"

function SearchResults({ results }){
    const { playTrack } = usePlayer();
    console.log(results)

    if (!results || results.length === 0){
        return null;
    }

    const topResult = results[0];

    function formatduration(seconds){
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`
    }

    // Inner dropdown component to choose which playlist to add song into
    function PlaylistDropdown({track}) {
        const [open, setOpen] = useState(false)
        const [playlists, setPlaylists] = useState([])

        useEffect(()=>{
            const fetchplaylists = async () => {
                try{
                    const res = await api.get("/playlists/")
                    setPlaylists(res.data)
                }
                catch (error) {
                    console.error("Failed to fetch playlists", error)
                }
            };

            fetchplaylists();
        }, []);

        const handleAdd = async (playlistid) => {
            try{
                await api.post(`/playlists/${playlistid}/add/`, {
                    deezer_id: track.id,
                    title: track.title,
                    duration: track.duration,
                    preview_url: track.preview,
                    cover_url: track.album.cover_small,
                    artist: track.artist.name
                });
                setOpen(false)
                alert("Added sucessfully")
            }
            catch(error){
                console.error("Failed to add song to playlist", error)
                alert("Failed to add song")
            }
        };

        return (
        <div className="relative">
            <button
            onClick={() => setOpen(!open)}
            className="font-bold text-2xl  pb-1 h-8 rounded-full w-8 text-white"
            title="Add to Playlist"
            >
            +
            </button>
            {open && (
            <div className="absolute right-0 mt-2 bg-[#2a2a2a] border border-gray-700 text-sm rounded shadow z-50 w-40">
                {playlists.length > 0 ? (
                playlists.map((p) => (
                    <button
                    key={p.id}
                    className="w-full text-left px-4 py-2 hover:bg-[#3a3a3a] text-white"
                    onClick={() => handleAdd(p.id)}
                    >
                    {p.name}
                    </button>
                ))
                ) : (
                <div className="px-4 py-2 text-gray-400">No playlists</div>
                )}
            </div>
            )}
        </div>
        );
    }   

    return(
        <>
        <div className="px-8 text-white min-h-screen w-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-left">Top result</h2>
            <div className="bg-[#1e1e1e] p-4 rounded-xl flex items-center justify-between mb-8 max-w-lg transform transition duration-300 hover:scale-105">
                <div className="flex items-center space-x-4">
                    <img
                        src={topResult.album.cover_medium}
                        alt={topResult.title}
                        className="w-16 h-16 rounded"
                    />
                    <div>
                        <p className="text-lg font-bold">{topResult.album.title}</p>
                        <p className="text-sm text-gray-400">Song • {topResult.artist.name}</p>
                    </div>
                </div>
                {/* send details of track over to playtrack function*/}
            <button onClick={() => playTrack({
                title: topResult.album.title,
                artist: topResult.artist.name,
                preview: topResult.preview,
                cover: topResult.album.cover_medium
            })}><img src={playbutton} className="w-10 h-10"/></button>
            </div>

            <h2 className="text-2xl font-bold mb-3">Songs</h2>
            <hr></hr>
            <ul className="space-y-4 mt-3">
                {results.map((track) => (
                    <li key={track.id} className="flex items-center justify-between px-1">
                        <div className="flex items-center space-x-4">
                            <img
                                src={track.album.cover_small}
                                alt={track.album.title}
                                className="w-10 h-10 rounded"
                            />
                            <div>
                                <p className="font-medium">{track.album.title}</p>
                                <p className="text-sm text-gray-400">{track.artist.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-sm text-gray-300">{formatduration(track.duration)}</span>
                            <button onClick={() => playTrack({
                            title: track.album.title,
                            artist: track.artist.name,
                            preview: track.preview,
                            cover: track.album.cover_medium})}>    
                            <img src={playbutton} className="w-8 h-8"/>                           
                            </button>
                            <PlaylistDropdown track={track}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default SearchResults