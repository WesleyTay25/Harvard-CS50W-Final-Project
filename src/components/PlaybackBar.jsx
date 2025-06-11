// interactive music player
import pausebutton from "../assets/pause-button-png-29655-modified.png"
import playbutton from "../assets/spotify-play-button-modified.png"
import prevbutton from "../assets/Audiomusicsong-04-512.webp"
import nextbutton from "../assets/next2-512.webp"
import unloopbutton from "../assets/unloop_button-removebg-preview.png"
import loopbutton from "../assets/loop_button-removebg-preview.png"
import restartbutton from "../assets/restart_button-removebg-preview.png"
import { usePlayer } from "./PlayerContext"; // using the custom hook to get values from global context
import { useState, useRef, useEffect } from "react";

function PlaybackBar() {
    const { currentTrack, isPlaying, togglePlay, restart, loop, looping, currentIndex, setCurrentIndex, handleNext, handlePrev} = usePlayer(); // grabbing values

    // skip song/previous song not working

    if (!currentTrack){
        return null; // do not render playbar if no song is playing
    }

    return (
        <>

        <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] text-white px-6 py-3 flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-4">
                <img src={currentTrack.cover} alt="cover" className="h-12 w-12 rounded" />
                <div>
                    <p className="font-semibold">{currentTrack.title}</p>
                    <p className="text-sm">{currentTrack.artist}</p>
                </div>
            </div>

            {/* Playback Controls & Progress */}
            <div className="flex flex-col items-center w-full max-w-xl mx-4">
            {/* Controls */}
            <div className="flex gap-10 items-center mb-1">
                <button onClick={handlePrev}><img src={prevbutton} className="w-9 h-9 rounded"/></button> 
                <button onClick={togglePlay}>
                    {isPlaying ? (<img src={pausebutton} className="w-10 h-10 rounded" />) : (<img src={playbutton} className="w-10 h-10 rounded" />)}
                </button>
                <button onClick={handleNext}><img src={nextbutton} className="w-10 h-10 rounded"/></button> 
            </div>
        </div>

            {/* add restart button and add the loop song option*/}
            <div className="flex space-x-4 items-center">
                <button className ="mr-5 rounded w-7 h-7" onClick={restart}><img src={restartbutton} /></button>
                <button onClick={loop}>
                    {looping ? (<img src={unloopbutton} className="w-10 h-10 rounded" />) : (<img src={loopbutton} className="w-10 h-10 rounded" />)}
                </button>
            </div>
        </div>
        </>
    )
}

export default PlaybackBar

