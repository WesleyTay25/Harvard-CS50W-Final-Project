import { useState } from "react";
import api from "../api";
import searchInterfaceSymbol from "../assets/search-interface-symbol.png";

function SearchBar({setResults}){

    const [query, setQuery] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await api.get(`/search/?q=${query}`);
            setResults(res.data.data)
        }
        catch(error){
            console.log(error)
        }
    };

    return (
        <>
        <div className="w-full bg-[#171717] px-4 py-4 shad0w-md">
            <div className="max-w-2xl mx-auto relative">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What songs do you want to listen to?"
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-[#2A2A2A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <img src={searchInterfaceSymbol} className="w-5 h-5"/>
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}


export default SearchBar