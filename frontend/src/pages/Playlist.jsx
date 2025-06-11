import PlaylistDetails from "../components/PlaylistDetails"
import Navbar_Home from "../components/Navbar_Home"
import Footer from "../components/Footer"
import PlaybackBar from "../components/PlaybackBar"


function Playlist(){
    return(
     <>
     <Navbar_Home/>
     <PlaylistDetails />
     <PlaybackBar />
     <Footer/>
     </>
    )
}

export default Playlist