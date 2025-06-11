import axios from "axios"
import { ACCESS_TOKEN } from "./constant"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // imports the http route added into .env file
})

// to ensure JWT authentication
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN); // checks for access token
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // if have token, it sets an Authorization token.
        } // so now all API calls will have authorization token and be accepted by DRF
        return config // if no token that just return normal config without authorisation header, now django knows when you make an get/post request that you are not authenticated 
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api