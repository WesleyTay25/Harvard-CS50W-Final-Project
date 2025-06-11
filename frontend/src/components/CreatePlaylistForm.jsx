import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";


function CreatePlaylistForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlaylist = {
      name,
      description
   };
   
   try{
    if (name === ""){
        alert("Enter Name")
        return
    }
    else{
        const res = await api.post(`/playlists/`, newPlaylist);
        navigate("/playlist");
        console.log("Success!")
    }
   }
   catch (error){
    console.error("Error creating playlist", error);
   }
}

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit}
        className="bg-[#1e1e1e] p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold">Create a New Playlist</h2>

        <div>
          <label className="block text-sm mb-1">Playlist Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded bg-[#2a2a2a] focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            className="w-full px-3 py-2 rounded bg-[#2a2a2a] focus:outline-none resize-none"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
        >
          Create Playlist
        </button>
      </form>
    </div>
  );
}

export default CreatePlaylistForm;
