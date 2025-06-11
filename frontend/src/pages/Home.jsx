import { useState } from "react"
import Navbar_Home from "../components/Navbar_Home"
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/searchResults"
import Footer from "../components/Footer"
import PlaybackBar from "../components/PlaybackBar"



function Home(){

    const [results, setResults] = useState([]) // State will be shared to searchbar and searchresults this is useful for transferring result from one component to another component
    
    return(
        <>
        <div className="min-h-screen bg-[#171717] flex flex-col items-center pb-[30px]">
            <Navbar_Home/>
            <SearchBar setResults={setResults}/>
            <SearchResults results={results}/>
            <PlaybackBar />
        </div>
        <Footer />
        </>
    )
}

export default Home