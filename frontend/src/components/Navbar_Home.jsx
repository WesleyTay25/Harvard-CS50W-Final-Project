import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api'; 
import React from 'react';


function Navbar_Home(route){

const [username, setUsername] = useState(""); 

// use call API function to get user's username
useEffect(() => {
  const fetchUsername = async () => {
    try {
      const response = await api.get("/"); // Adjust the endpoint as needed
      setUsername(response.data.username); // Assuming the response contains a 'username' field
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  fetchUsername();
}, []);   // Empty dependency array to run only once on component mount


// logout function
function handleLogout() {
  localStorage.clear(); // Clear local storage to log out
}

return (
    <nav className="bg-[#189c47] text-white p-4 px-10 flex justify-between items-center shadow-lg w-full">
      <div className="text-2xl text text-black flex">
        <Link className="font-bold" to="/">StreamSphere</Link>
      </div>
      <div className="flex items-center">
        <div className="font-bold text-black mr-6">Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}</div>
        <Link className="font-bold text-black mr-14" to="/playlist">Playlists</Link>
        <div onClick={handleLogout}><Link to="/login" className="hover:text-gray-800 transition text-black">Logout</Link></div>
      </div>
    </nav>
  );
}

export default Navbar_Home