import axios from "axios";
// Hosted URL: 'https://blog-fullstack-app-backend.vercel.app/api/'
//http://localhost:4000/api/
export default axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {"Access-Control-Allow-Origin": "*"}   
});