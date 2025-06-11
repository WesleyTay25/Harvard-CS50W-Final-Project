import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import Navbar from "./Navbar";

// function accepts API route as <route> and method (login/register)
function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login"? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (method === "register" && password !== confirmpassword){
            alert("Passwords do not match");
            setLoading(false);
            return
        }

        try{
            const res = await api.post(route, {username, password}) // API call at <route> giving username and password
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access) // gets back access token given by endpoint and saves it
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh) // same for refresh
                navigate("/") // directs user straight to home page
            }
            else{
                navigate("/login") // if user method is register, it will call in the CreateUserView function then redirect him to login page
            }
        }
        catch (error){
            alert(error.response?.data?.detail || "An error occurred")
        } 
        finally{
            setLoading(false)
        }
    }

    return(
        <main>
            <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-[#171717] text-white">       
        <div className="bg-[#189c47] shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl p-8 w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">{name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            <input className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            {method === "register" && (<input className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            type="password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} placeholder="Confirm Password"/>)}
            <button className="form-w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transform transition-transform hover:scale-105" 
            type="submit">{name}</button>
        </form>
        </div>
    </div>
    </main>
    )
}

export default Form