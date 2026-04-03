import axios from "axios";
import useAuthStore from "../store/AuthStore";
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
 const API_URL = isLocal ? "http://localhost:4000/api" : "https://personal-finance-track-exercise-4-node-js.onrender.com"
const api = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json' 
    }
})


// adding interptors axios 

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


export default api 