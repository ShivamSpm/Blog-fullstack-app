import axios from "axios";
// Hosted URL: 'https://blog-fullstack-app-self.vercel.app/api/'

export default axios.create({
    baseURL: 'https://blog-fullstack-app-self.vercel.app/api/',
    headers: {"Access-Control-Allow-Origin": "*"}   
});