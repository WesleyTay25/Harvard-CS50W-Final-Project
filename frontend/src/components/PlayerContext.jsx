// Instead of managing playback in every component create a centralized place — called a React Context — to handle: 1. Currently playing track 2. Whether Track is playing 3. Actual HTML5 Audio

import { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext(); // creates context which will shared with entire app

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null); // stores the HTML5 audio element created in JS (new Audio(...))
  const [looping, setLooping] = useState(false); // loop
  const [currentIndex, setCurrentIndex] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);




  const loopingref = useRef(looping)

  const playTrack = async (track, index=null, playlist=null) => { // takes track as input
    if (audio) {
        audio.pause(); // if another song is already playing, pause it first before switching 
        audio.src = '';
    }

    // if playing new song
    const newAudio = new Audio(track.preview); // creates HTML5 audio object using the preview URL
    setAudio(newAudio); // stores newAudio
    setCurrentTrack(track); 
    setIsPlaying(true);
    loopingref.current = false;
    setLooping(false);
    setCurrentIndex(index)
    newAudio.play(); // starts playing newAudio immediately

    if (playlist){
        setPlaylistSongs(playlist)
    }

    await newAudio.play()

    newAudio.onended = () => {
        if (!loopingref.current){
            setIsPlaying(false);
        }
        else {
            newAudio.currentTime = 0;
            newAudio.play()
        }
     } // when song ends then playing set to false, can add repeat conditional 
  };

  // for pause/resume button
  const togglePlay = () => {
    if (!audio) {
        return; // no audio --> nothing to pause/resume 
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false); // if playing --> pause
    }
    else {
      audio.play();
      setIsPlaying(true); // if pause --> playing
    }
  };
  
  // restart song
  const restart = () => {
    if (audio) {
      audio.currentTime = 0; // reset audio to the beginning 
      audio.play();
    }
  };

  const loop = () => {
    if (!audio) {
        return;
    }
    if (looping){
        setLooping(false);
        loopingref.current = false;
        console.log(loopingref.current);
    }
    else{
        setLooping(true);
        loopingref.current = true;
        console.log(loopingref.current);
    }
  };

    const handleNext = () => {
        if (currentIndex === null || playlistSongs.length === 0) return;
        const nextIndex = (currentIndex + 1) % playlistSongs.length;
        const nextTrack = playlistSongs[nextIndex]

        const formattedTrack = {
            title: nextTrack.title,
            artist: nextTrack.artist,
            preview: nextTrack.preview_url,
            cover: nextTrack.album_cover
        }
        playTrack(formattedTrack, nextIndex, playlistSongs)
    };

    const handlePrev = () => {
        if (currentIndex === null || playlistSongs.length === 0) return;
        const prevIndex = (currentIndex - 1 + playlistSongs.length) % playlistSongs.length
        const prevTrack = playlistSongs[prevIndex]

        const formattedTrack = {
            title: prevTrack.title,
            artist: prevTrack.artist,
            preview: prevTrack.preview_url,
            cover: prevTrack.album_cover
        }

        playTrack(formattedTrack, prevIndex, playlistSongs)
    }

  // wraps app and shares playback state with all components giving them access to all info in this component
  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay, restart, loop, looping, currentIndex, setCurrentIndex, handleNext,handlePrev }}> 
      {children}
    </PlayerContext.Provider>
  );
}

// create custom hook shortcut so any component can access and play songs
export function usePlayer() { 
  return useContext(PlayerContext);
}