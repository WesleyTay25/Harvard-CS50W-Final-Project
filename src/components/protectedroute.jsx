import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant"
import { useState, useEffect } from "react"

// this is all basically to ensure that only if you are logged in can you access some pages

function ProtectedRoute({children}) {
    const [isAuthorized, SetIsAuthorized] = useState(null) 

    useEffect(() => {
        auth().catch(() => SetIsAuthorized(false)) // once loaded, calls the auth function and auto sets authorized to false IF SOMETHING GOES WRONG
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN) // gets refresh token
        try{
            const res = await api.post("/api/token/refresh/", {refresh: refreshToken}); // sends refresh token to this route 
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access); // if gets back response then set the response.access token as new access token
                SetIsAuthorized(true);
            }
            else{
                SetIsAuthorized(false);
            }
        }
        catch (error) {
            console.log(error)
            SetIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN) // gets access token
        if (!token) { 
            SetIsAuthorized(false); // if no token then not authorized
            return;
        }
        const decoded = jwtDecode(token); // decodes token
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // checks expiry date of token

        if (tokenExpiration < now) {
            await refreshToken(); // if access token in expired, call refresh token fucntion
        }
        else{
            SetIsAuthorized(true); // if token is not expired, then is authorized
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div> // loading screen while decoding your token
    }

    return isAuthorized ? children : <Navigate to ="/login" />
}

export default ProtectedRoute