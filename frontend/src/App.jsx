import react from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/protectedroute"
import { PlayerProvider } from "./components/PlayerContext"
import Playlists from "./pages/Playlists"
import CreatePlaylist from "./pages/createPlaylistPage"
import Playlist from "./pages/Playlist"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return<Register />
}

// playerprovider should be added at the top level of app so that every component can access the playback state
function App() {

  return (
    <PlayerProvider>
    <BrowserRouter>
    <Routes>
      <Route 
        path="/"
        element={<ProtectedRoute><Home /></ProtectedRoute>}
      />
      <Route
        path="/playlist"
        element={<ProtectedRoute><Playlists /></ProtectedRoute>}
      />
      <Route
        path="/playlist/create"
        element={<ProtectedRoute><CreatePlaylist /></ProtectedRoute>}
      />
       <Route
        path="/playlists/:id"
        element={<ProtectedRoute><Playlist /></ProtectedRoute>}
      />
      <Route path="/login" element = {<Login />}/>
      <Route path="/logout" element = {<Logout />}/>
      <Route path="/register" element = {<RegisterAndLogout />}/>
      <Route path="*" element = {<NotFound />}/>
    </Routes>
    </BrowserRouter>
    </PlayerProvider>
  )
}

export default App
