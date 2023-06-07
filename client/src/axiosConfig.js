import axios from "axios";

export default axios.create({
    baseURL: 'https://blog-fullstack-app-self.vercel.app/api/',
    headers: {"Access-Control-Allow-Origin": "*"}
});