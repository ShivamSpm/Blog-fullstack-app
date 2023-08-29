import axios from "axios";
// Hosted URL: 'https://blog-fullstack-app-backend.vercel.app/api/'

export default axios.create({
    baseURL: 'https://blog-fullstack-app-backend.vercel.app/api/',
    headers: {"Access-Control-Allow-Origin": "*"}   
});