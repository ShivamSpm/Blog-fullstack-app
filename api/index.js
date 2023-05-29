import express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client's origin
    credentials: true
  }))

app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(8800, ()=>{
    console.log("Connected");
})