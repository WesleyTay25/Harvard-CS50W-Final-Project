import Footer from "../components/Footer";
import CreatePlaylistForm from "../components/CreatePlaylistForm";
import Navbar_Home from "../components/Navbar_Home";
import PlaybackBar from "../components/PlaybackBar";

function CreatePlaylist () {
    return (
        <>
        <Navbar_Home />
        <CreatePlaylistForm />
        <PlaybackBar />
        <Footer />
        </>
    )
}

export default CreatePlaylist