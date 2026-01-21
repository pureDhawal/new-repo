import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api"

const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
})

export default api;