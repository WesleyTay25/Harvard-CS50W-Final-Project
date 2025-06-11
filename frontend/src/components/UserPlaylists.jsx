import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import api from "../api";


function UserPlaylists() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
        try {
        const response = await api.get("/playlists/"); // Adjust the endpoint as needed
        setPlaylists(response.data); // all data gathered
        } catch (error) {
        console.error('Error fetching playlists:', error);
        }
    };

    fetchPlaylists();
    }, []);  

    function formatdate(rawdate) {
        const date = new Date(rawdate)
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    const handleDelete = async (id) => {
        try{
            const res = await api.delete(`/playlists/remove/${id}/`)
            setPlaylists(prev => prev.filter(playlist => playlist.id !== id));
            alert("Deleted succesfully!")
        }
        catch (error) {
            console.error("Failed to delete playlist", error)
            alert("Failed to remove playlist")
        }
    }

 return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-10 w-full">
      <h1 className="text-3xl font-bold mb-8">Your Playlists</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-[#1e1e1e] relative flex items-center text-center h-52 flex-col justify-center hover:bg-[#2a2a2a] p-4 rounded-xl shadow-md transition-all"
          >
            <button onClick={() => handleDelete(playlist.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600" title="Delete Playlist">
                ✕
            </button>

            <Link to={`/playlists/${playlist.id}`} className="w-full flex-1 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-center">{playlist.name}</p>
                <p className="text-sm text-gray-400">Created at {formatdate(playlist.created_at)}</p>
            </Link>      

          </div>
        ))}

        {/* Create New Playlist Card */}
        <Link
          to="/playlist/create"
          className="flex items-center justify-center bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white text-lg font-semibold rounded-xl h-52 shadow-md transition-all"
        >
          + Create New Playlist
        </Link>
      </div>
    </div>
  );
}

export default UserPlaylists