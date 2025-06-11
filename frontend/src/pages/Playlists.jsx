import { useState } from "react"
import Navbar_Home from "../components/Navbar_Home"
import Footer from "../components/Footer"
import PlaybackBar from "../components/PlaybackBar"
import UserPlaylists from "../components/userPlaylists"

function Playlists(){

    return(
        <>
        <div className="min-h-screen bg-[#171717] flex flex-col text-white items-center pb-[30px]">
            <Navbar_Home/>
            <UserPlaylists/>
            <PlaybackBar />
        </div>
        <Footer />
        </>
    )
}

// fill up playlist content here


export default Playlists