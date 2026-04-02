import axios from "axios";
import useAuthStore from "../store/AuthStore";
 const API_URL = 'http://localhost:4000/api'
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